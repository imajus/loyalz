/***** TAKE NOTE ******
This is a hack to get genType to work!

In order for genType to produce recursive types, it needs to be at the 
root module of a file. If it's defined in a nested module it does not 
work. So all the MockDb types and internal functions are defined in TestHelpers_MockDb
and only public functions are recreated and exported from this module.

the following module:
```rescript
module MyModule = {
  @genType
  type rec a = {fieldB: b}
  @genType and b = {fieldA: a}
}
```

produces the following in ts:
```ts
// tslint:disable-next-line:interface-over-type-literal
export type MyModule_a = { readonly fieldB: b };

// tslint:disable-next-line:interface-over-type-literal
export type MyModule_b = { readonly fieldA: MyModule_a };
```

fieldB references type b which doesn't exist because it's defined
as MyModule_b
*/

module MockDb = {
  @genType
  let createMockDb = TestHelpers_MockDb.createMockDb
}

@genType
module Addresses = {
  include TestHelpers_MockAddresses
}

module EventFunctions = {
  //Note these are made into a record to make operate in the same way
  //for Res, JS and TS.

  /**
  The arguements that get passed to a "processEvent" helper function
  */
  @genType
  type eventProcessorArgs<'eventArgs> = {
    event: Types.eventLog<'eventArgs>,
    mockDb: TestHelpers_MockDb.t,
    chainId?: int,
  }

  /**
  A function composer to help create individual processEvent functions
  */
  let makeEventProcessor = (~eventMod: module(Types.Event with type eventArgs = 'eventArgs)) => {
    async args => {
      let eventMod = eventMod->Types.eventModToInternal
      let {event, mockDb, ?chainId} =
        args->(
          Utils.magic: eventProcessorArgs<'eventArgs> => eventProcessorArgs<Types.internalEventArgs>
        )
      let module(Event) = eventMod
      let config = RegisterHandlers.getConfig()

      // The user can specify a chainId of an event or leave it off
      // and it will default to the first chain in the config
      let chain = switch chainId {
      | Some(chainId) => config->Config.getChain(~chainId)
      | None =>
        switch config.defaultChain {
        | Some(chainConfig) => chainConfig.chain
        | None =>
          Js.Exn.raiseError(
            "No default chain Id found, please add at least 1 chain to your config.yaml",
          )
        }
      }

      //Create an individual logging context for traceability
      let logger = Logging.createChild(
        ~params={
          "Context": `Test Processor for "${Event.name}" event on contract "${Event.contractName}"`,
          "Chain ID": chain->ChainMap.Chain.toChainId,
          "event": event,
        },
      )

      //Deep copy the data in mockDb, mutate the clone and return the clone
      //So no side effects occur here and state can be compared between process
      //steps
      let mockDbClone = mockDb->TestHelpers_MockDb.cloneMockDb

      if !(Event.handlerRegister->Types.HandlerTypes.Register.hasRegistration) {
        Not_found->ErrorHandling.mkLogAndRaise(
          ~logger,
          ~msg=`No registered handler found for "${Event.name}" on contract "${Event.contractName}"`,
        )
      }
      //Construct a new instance of an in memory store to run for the given event
      let inMemoryStore = InMemoryStore.make()
      let loadLayer = LoadLayer.make(
        ~loadEntitiesByIds=TestHelpers_MockDb.makeLoadEntitiesByIds(mockDbClone),
        ~makeLoadEntitiesByField=(~entityMod) =>
          TestHelpers_MockDb.makeLoadEntitiesByField(mockDbClone, ~entityMod),
      )

      //No need to check contract is registered or return anything.
      //The only purpose is to test the registerContract function and to
      //add the entity to the in memory store for asserting registrations

      switch Event.handlerRegister->Types.HandlerTypes.Register.getContractRegister {
      | Some(contractRegister) =>
        switch contractRegister->EventProcessing.runEventContractRegister(
          ~logger,
          ~event,
          ~eventBatchQueueItem={
            event,
            eventMod,
            chain,
            logIndex: event.logIndex,
            timestamp: event.block.timestamp,
            blockNumber: event.block.number,
          },
          ~checkContractIsRegistered=(~chain as _, ~contractAddress as _, ~contractName as _) =>
            false,
          ~dynamicContractRegistrations=None,
          ~inMemoryStore,
        ) {
        | Ok(_) => ()
        | Error(e) => e->ErrorHandling.logAndRaise
        }
      | None => () //No need to run contract registration
      }

      let latestProcessedBlocks = EventProcessing.EventsProcessed.makeEmpty(~config)

      switch Event.handlerRegister->Types.HandlerTypes.Register.getLoaderHandler {
      | Some(loaderHandler) =>
        switch await event->EventProcessing.runEventHandler(
          ~inMemoryStore,
          ~loadLayer,
          ~loaderHandler,
          ~eventMod,
          ~chain,
          ~logger,
          ~latestProcessedBlocks,
          ~config,
        ) {
        | Ok(_) => ()
        | Error(e) => e->ErrorHandling.logAndRaise
        }
      | None => () //No need to run handler
      }

      //In mem store can still contatin raw events and dynamic contracts for the
      //testing framework in cases where either contract register or loaderHandler
      //is None
      mockDbClone->TestHelpers_MockDb.writeFromMemoryStore(~inMemoryStore)
      mockDbClone
    }
  }

  module MockBlock = {
    open Belt
    type t = {
      number?: int,
      timestamp?: int,
      hash?: string,
    }

    let toBlock = (mock: t): Types.Block.t => {
      number: mock.number->Option.getWithDefault(0),
      timestamp: mock.timestamp->Option.getWithDefault(0),
      hash: mock.hash->Option.getWithDefault("foo"),
    }
  }

  module MockTransaction = {
    type t = {
    }

    let toTransaction = (_mock: t): Types.Transaction.t => {
    }
  }

  @genType
  type mockEventData = {
    chainId?: int,
    srcAddress?: Address.t,
    logIndex?: int,
    block?: MockBlock.t,
    transaction?: MockTransaction.t,
  }

  /**
  Applies optional paramters with defaults for all common eventLog field
  */
  let makeEventMocker = (
    ~params: 'eventParams,
    ~mockEventData: option<mockEventData>,
  ): Types.eventLog<'eventParams> => {
    let {?block, ?transaction, ?srcAddress, ?chainId, ?logIndex} =
      mockEventData->Belt.Option.getWithDefault({})
    let block = block->Belt.Option.getWithDefault({})->MockBlock.toBlock
    let transaction = transaction->Belt.Option.getWithDefault({})->MockTransaction.toTransaction
    {
      params,
      transaction,
      chainId: chainId->Belt.Option.getWithDefault(1),
      block,
      srcAddress: srcAddress->Belt.Option.getWithDefault(Addresses.defaultAddress),
      logIndex: logIndex->Belt.Option.getWithDefault(0),
    }
  }
}


module MultiTokenERC20 = {
  module OwnershipTransferred = {
    @genType
    let processEvent = EventFunctions.makeEventProcessor(
      ~eventMod=module(Types.MultiTokenERC20.OwnershipTransferred),
    )

    @genType
    type createMockArgs = {
      @as("previousOwner")
      previousOwner?: Address.t,
      @as("newOwner")
      newOwner?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?previousOwner,
        ?newOwner,
        ?mockEventData,
      } = args

      let params: Types.MultiTokenERC20.OwnershipTransferred.eventArgs = 
      {
       previousOwner: previousOwner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newOwner: newOwner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }

      EventFunctions.makeEventMocker(~params, ~mockEventData)
    }
  }

  module TokenCreated = {
    @genType
    let processEvent = EventFunctions.makeEventProcessor(
      ~eventMod=module(Types.MultiTokenERC20.TokenCreated),
    )

    @genType
    type createMockArgs = {
      @as("name")
      name?: string,
      @as("tokenAddress")
      tokenAddress?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?name,
        ?tokenAddress,
        ?mockEventData,
      } = args

      let params: Types.MultiTokenERC20.TokenCreated.eventArgs = 
      {
       name: name->Belt.Option.getWithDefault("foo"),
       tokenAddress: tokenAddress->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }

      EventFunctions.makeEventMocker(~params, ~mockEventData)
    }
  }

  module TokensBurned = {
    @genType
    let processEvent = EventFunctions.makeEventProcessor(
      ~eventMod=module(Types.MultiTokenERC20.TokensBurned),
    )

    @genType
    type createMockArgs = {
      @as("name")
      name?: string,
      @as("from")
      from?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?name,
        ?from,
        ?amount,
        ?mockEventData,
      } = args

      let params: Types.MultiTokenERC20.TokensBurned.eventArgs = 
      {
       name: name->Belt.Option.getWithDefault("foo"),
       from: from->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }

      EventFunctions.makeEventMocker(~params, ~mockEventData)
    }
  }

  module TokensMinted = {
    @genType
    let processEvent = EventFunctions.makeEventProcessor(
      ~eventMod=module(Types.MultiTokenERC20.TokensMinted),
    )

    @genType
    type createMockArgs = {
      @as("name")
      name?: string,
      @as("to")
      to?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?name,
        ?to,
        ?amount,
        ?mockEventData,
      } = args

      let params: Types.MultiTokenERC20.TokensMinted.eventArgs = 
      {
       name: name->Belt.Option.getWithDefault("foo"),
       to: to->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }

      EventFunctions.makeEventMocker(~params, ~mockEventData)
    }
  }

}

