//*************
//***ENTITIES**
//*************
@genType.as("Id")
type id = string

@genType
type contractRegistrations = {
  // TODO: only add contracts we've registered for the event in the config
  addMultiTokenERC20: (Address.t) => unit,
}

@genType
type entityLoaderContext<'entity, 'indexedFieldOperations> = {
  get: id => promise<option<'entity>>,
  getWhere: 'indexedFieldOperations,
}

@genType
type loaderContext = {
  log: Logs.userLogger,
  @as("MultiTokenERC20_OwnershipTransferred") multiTokenERC20_OwnershipTransferred: entityLoaderContext<Entities.MultiTokenERC20_OwnershipTransferred.t, Entities.MultiTokenERC20_OwnershipTransferred.indexedFieldOperations>,
  @as("MultiTokenERC20_TokenCreated") multiTokenERC20_TokenCreated: entityLoaderContext<Entities.MultiTokenERC20_TokenCreated.t, Entities.MultiTokenERC20_TokenCreated.indexedFieldOperations>,
  @as("MultiTokenERC20_TokensBurned") multiTokenERC20_TokensBurned: entityLoaderContext<Entities.MultiTokenERC20_TokensBurned.t, Entities.MultiTokenERC20_TokensBurned.indexedFieldOperations>,
  @as("MultiTokenERC20_TokensMinted") multiTokenERC20_TokensMinted: entityLoaderContext<Entities.MultiTokenERC20_TokensMinted.t, Entities.MultiTokenERC20_TokensMinted.indexedFieldOperations>,
}

@genType
type entityHandlerContext<'entity> = {
  get: id => promise<option<'entity>>,
  set: 'entity => unit,
  deleteUnsafe: id => unit,
}


@genType
type handlerContext = {
  log: Logs.userLogger,
  @as("MultiTokenERC20_OwnershipTransferred") multiTokenERC20_OwnershipTransferred: entityHandlerContext<Entities.MultiTokenERC20_OwnershipTransferred.t>,
  @as("MultiTokenERC20_TokenCreated") multiTokenERC20_TokenCreated: entityHandlerContext<Entities.MultiTokenERC20_TokenCreated.t>,
  @as("MultiTokenERC20_TokensBurned") multiTokenERC20_TokensBurned: entityHandlerContext<Entities.MultiTokenERC20_TokensBurned.t>,
  @as("MultiTokenERC20_TokensMinted") multiTokenERC20_TokensMinted: entityHandlerContext<Entities.MultiTokenERC20_TokensMinted.t>,
}

//Re-exporting types for backwards compatability
@genType.as("MultiTokenERC20_OwnershipTransferred")
type multiTokenERC20_OwnershipTransferred = Entities.MultiTokenERC20_OwnershipTransferred.t
@genType.as("MultiTokenERC20_TokenCreated")
type multiTokenERC20_TokenCreated = Entities.MultiTokenERC20_TokenCreated.t
@genType.as("MultiTokenERC20_TokensBurned")
type multiTokenERC20_TokensBurned = Entities.MultiTokenERC20_TokensBurned.t
@genType.as("MultiTokenERC20_TokensMinted")
type multiTokenERC20_TokensMinted = Entities.MultiTokenERC20_TokensMinted.t

type eventIdentifier = {
  chainId: int,
  blockTimestamp: int,
  blockNumber: int,
  logIndex: int,
}

type entityUpdateAction<'entityType> =
  | Set('entityType)
  | Delete

type entityUpdate<'entityType> = {
  eventIdentifier: eventIdentifier,
  shouldSaveHistory: bool,
  entityId: id,
  entityUpdateAction: entityUpdateAction<'entityType>,
}

let mkEntityUpdate = (~shouldSaveHistory=true, ~eventIdentifier, ~entityId, entityUpdateAction) => {
  entityId,
  shouldSaveHistory,
  eventIdentifier,
  entityUpdateAction,
}

type entityValueAtStartOfBatch<'entityType> =
  | NotSet // The entity isn't in the DB yet
  | AlreadySet('entityType)

type existingValueInDb<'entityType> =
  | Retrieved(entityValueAtStartOfBatch<'entityType>)
  // NOTE: We use an postgres function solve the issue of this entities previous value not being known.
  | Unknown

type updatedValue<'entityType> = {
  // Initial value within a batch
  initial: existingValueInDb<'entityType>,
  latest: entityUpdate<'entityType>,
  history: array<entityUpdate<'entityType>>,
}
@genType
type inMemoryStoreRowEntity<'entityType> =
  | Updated(updatedValue<'entityType>)
  | InitialReadFromDb(entityValueAtStartOfBatch<'entityType>) // This means there is no change from the db.

//*************
//**CONTRACTS**
//*************

module Log = {
  type t = {
    address: Address.t,
    data: string,
    topics: array<Ethers.EventFilter.topic>,
    logIndex: int,
  }

  let fieldNames = ["address", "data", "topics", "logIndex"]
}

module Transaction = {
  @genType
  type t = {
  }

  let schema: S.schema<t> = S.object((_s): t => {
  })

  let querySelection: array<HyperSyncClient.QueryTypes.transactionField> = [
  ]

  let nonOptionalFieldNames: array<string> = [
  ]
}

module Block = {
  type selectableFields = {
  }

  let schema: S.schema<selectableFields> = S.object((_s): selectableFields => {
  })

  @genType
  type t = {
    number: int,
    timestamp: int,
    hash: string,
    ...selectableFields,
  }

  let getSelectableFields = ({
    }: t): selectableFields => {
    }

  let querySelection: array<HyperSyncClient.QueryTypes.blockField> = [
    Number,
    Timestamp,
    Hash,
  ]

  let nonOptionalFieldNames: array<string> = [
    "number",
    "timestamp",
    "hash",
  ]
}

@genType.as("EventLog")
type eventLog<'a> = {
  params: 'a,
  chainId: int,
  srcAddress: Address.t,
  logIndex: int,
  transaction: Transaction.t,
  block: Block.t,
}

module HandlerTypes = {
  @genType
  type args<'eventArgs, 'context> = {
    event: eventLog<'eventArgs>,
    context: 'context,
  }

  @genType
  type contractRegisterArgs<'eventArgs> = args<'eventArgs, contractRegistrations>
  @genType
  type contractRegister<'eventArgs> = contractRegisterArgs<'eventArgs> => unit

  @genType
  type loaderArgs<'eventArgs> = args<'eventArgs, loaderContext>
  @genType
  type loader<'eventArgs, 'loaderReturn> = loaderArgs<'eventArgs> => promise<'loaderReturn>

  @genType
  type handlerArgs<'eventArgs, 'loaderReturn> = {
    event: eventLog<'eventArgs>,
    context: handlerContext,
    loaderReturn: 'loaderReturn,
  }

  @genType
  type handler<'eventArgs, 'loaderReturn> = handlerArgs<'eventArgs, 'loaderReturn> => promise<unit>

  @genType
  type loaderHandler<'eventArgs, 'loaderReturn> = {
    loader: loader<'eventArgs, 'loaderReturn>,
    handler: handler<'eventArgs, 'loaderReturn>,
  }

  type eventOptions = {
    wildcard: bool,
    topicSelections: array<LogSelection.topicSelection>,
  }

  let getDefaultEventOptions = (~topic0) => {
    wildcard: false,
    topicSelections: [LogSelection.makeTopicSelection(~topic0=[topic0])->Utils.unwrapResultExn],
  }

  type registeredEvent<'eventArgs, 'loaderReturn> = {
    loaderHandler?: loaderHandler<'eventArgs, 'loaderReturn>,
    contractRegister?: contractRegister<'eventArgs>,
    eventOptions: eventOptions,
  }

  module Register: {
    type t<'eventArgs>
    let make: (~topic0: string, ~contractName: string, ~eventName: string) => t<'eventArgs>
    let setLoaderHandler: (
      t<'eventArgs>,
      loaderHandler<'eventArgs, 'loaderReturn>,
      ~eventOptions: option<eventOptions>,
      ~logger: Pino.t=?,
    ) => unit
    let setContractRegister: (
      t<'eventArgs>,
      contractRegister<'eventArgs>,
      ~eventOptions: option<eventOptions>,
      ~logger: Pino.t=?,
    ) => unit
    let getLoaderHandler: t<'eventArgs> => option<loaderHandler<'eventArgs, 'loaderReturn>>
    let getContractRegister: t<'eventArgs> => option<contractRegister<'eventArgs>>
    let getEventOptions: t<'eventArgs> => eventOptions
    let hasRegistration: t<'eventArgs> => bool
  } = {
    type loaderReturn

    type t<'eventArgs> = {
      contractName: string,
      eventName: string,
      topic0: string,
      mutable loaderHandler: option<loaderHandler<'eventArgs, loaderReturn>>,
      mutable contractRegister: option<contractRegister<'eventArgs>>,
      mutable eventOptions: option<eventOptions>,
    }

    let getLoaderHandler = (t: t<'eventArgs>): option<loaderHandler<'eventArgs, 'loaderReturn>> =>
      t.loaderHandler->(
        Utils.magic: option<loaderHandler<'eventArgs, loaderReturn>> => option<
          loaderHandler<'eventArgs, 'loaderReturn>,
        >
      )

    let getContractRegister = (t: t<'eventArgs>): option<contractRegister<'eventArgs>> =>
      t.contractRegister

    let getEventOptions = ({eventOptions, topic0}: t<'eventArgs>): eventOptions =>
      switch eventOptions {
      | Some(eventOptions) => eventOptions
      | None => getDefaultEventOptions(~topic0)
      }

    let hasRegistration = ({loaderHandler, contractRegister}) =>
      loaderHandler->Belt.Option.isSome || contractRegister->Belt.Option.isSome

    let make = (~topic0, ~contractName, ~eventName) => {
      contractName,
      eventName,
      topic0,
      loaderHandler: None,
      contractRegister: None,
      eventOptions: None,
    }

    type eventNamespace = {contractName: string, eventName: string}
    exception DuplicateEventRegistration(eventNamespace)

    let setEventOptions = (t: t<'eventArgs>, value: eventOptions, ~logger=Logging.logger) => {
      switch t.eventOptions {
      | None => t.eventOptions = Some(value)
      | Some(_) =>
        let eventNamespace = {contractName: t.contractName, eventName: t.eventName}
        DuplicateEventRegistration(eventNamespace)->ErrorHandling.mkLogAndRaise(
          ~logger=Logging.createChildFrom(~logger, ~params=eventNamespace),
          ~msg="Duplicate eventOptions in handlers not allowed",
        )
      }
    }

    let setLoaderHandler = (
      t: t<'eventArgs>,
      value: loaderHandler<'eventArgs, 'loaderReturn>,
      ~eventOptions,
      ~logger=Logging.logger,
    ) => {
      switch t.loaderHandler {
      | None =>
        t.loaderHandler =
          value
          ->(Utils.magic: loaderHandler<'eventArgs, 'loaderReturn> => loaderHandler<
            'eventArgs,
            loaderReturn,
          >)
          ->Some
      | Some(_) =>
        let eventNamespace = {contractName: t.contractName, eventName: t.eventName}
        DuplicateEventRegistration(eventNamespace)->ErrorHandling.mkLogAndRaise(
          ~logger=Logging.createChildFrom(~logger, ~params=eventNamespace),
          ~msg="Duplicate registration of event handlers not allowed",
        )
      }

      switch eventOptions {
      | Some(eventOptions) => t->setEventOptions(eventOptions, ~logger)
      | None => ()
      }
    }

    let setContractRegister = (
      t: t<'eventArgs>,
      value: contractRegister<'eventArgs>,
      ~eventOptions,
      ~logger=Logging.logger,
    ) => {
      switch t.contractRegister {
      | None => t.contractRegister = Some(value)
      | Some(_) =>
        let eventNamespace = {contractName: t.contractName, eventName: t.eventName}
        DuplicateEventRegistration(eventNamespace)->ErrorHandling.mkLogAndRaise(
          ~logger=Logging.createChildFrom(~logger, ~params=eventNamespace),
          ~msg="Duplicate contractRegister handlers not allowed",
        )
      }
      switch eventOptions {
      | Some(eventOptions) => t->setEventOptions(eventOptions, ~logger)
      | None => ()
      }
    }
  }
}

type internalEventArgs

module type Event = {
  let sighash: string // topic0 for Evm and rb for Fuel receipts
  let name: string
  let contractName: string
  let chains: array<ChainMap.Chain.t>

  type eventArgs
  let eventArgsSchema: S.schema<eventArgs>
  let convertHyperSyncEventArgs: HyperSyncClient.Decoder.decodedEvent => eventArgs
  let decodeHyperFuelData: string => eventArgs
  let handlerRegister: HandlerTypes.Register.t<eventArgs>
}
module type InternalEvent = Event with type eventArgs = internalEventArgs

external eventToInternal: eventLog<'a> => eventLog<internalEventArgs> = "%identity"
external eventModToInternal: module(Event with type eventArgs = 'a) => module(InternalEvent) = "%identity"
external eventModWithoutArgTypeToInternal: module(Event) => module(InternalEvent) = "%identity"

module MakeRegister = (Event: Event) => {
  let handler = handler =>
    Event.handlerRegister->HandlerTypes.Register.setLoaderHandler(
      {
        loader: _ => Promise.resolve(),
        handler,
      },
      ~eventOptions=None,
    )

  let contractRegister: HandlerTypes.contractRegister<Event.eventArgs> => unit = contractRegister =>
    Event.handlerRegister->HandlerTypes.Register.setContractRegister(
      contractRegister,
      ~eventOptions=None,
    )

  let handlerWithLoader: HandlerTypes.loaderHandler<Event.eventArgs, 'loaderReturn> => unit = args =>
    Event.handlerRegister->HandlerTypes.Register.setLoaderHandler(args, ~eventOptions=None)
}

module MultiTokenERC20 = {
let abi = Ethers.makeAbi((%raw(`[{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true},{"name":"newOwner","type":"address","indexed":true}],"anonymous":false},{"type":"event","name":"TokenCreated","inputs":[{"name":"name","type":"string","indexed":true},{"name":"tokenAddress","type":"address","indexed":true}],"anonymous":false},{"type":"event","name":"TokensBurned","inputs":[{"name":"name","type":"string","indexed":false},{"name":"from","type":"address","indexed":false},{"name":"amount","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TokensMinted","inputs":[{"name":"name","type":"string","indexed":false},{"name":"to","type":"address","indexed":false},{"name":"amount","type":"uint256","indexed":false}],"anonymous":false}]`): Js.Json.t))
let eventSignatures = ["OwnershipTransferred(address indexed previousOwner, address indexed newOwner)", "TokenCreated(string indexed name, address indexed tokenAddress)", "TokensBurned(string name, address from, uint256 amount)", "TokensMinted(string name, address to, uint256 amount)"]
  let contractName = "MultiTokenERC20"
  let chains = [
  31,
  296,
  2810,
  88882,
  ]->Belt.Array.map(chainId => ChainMap.Chain.makeUnsafe(~chainId))
  module OwnershipTransferred = {
    let sighash = "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
    let name = "OwnershipTransferred"
    let contractName = contractName
    let chains = chains

    @genType
    type eventArgs = {previousOwner: Address.t, newOwner: Address.t}
    let eventArgsSchema = S.object(s => {previousOwner: s.field("previousOwner", Address.schema), newOwner: s.field("newOwner", Address.schema)})
    let convertHyperSyncEventArgs = (decodedEvent: HyperSyncClient.Decoder.decodedEvent): eventArgs => {
      {
        previousOwner: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
        newOwner: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
      }
    }
    let decodeHyperFuelData = (_) => Js.Exn.raiseError("HyperFuel decoder not implemented")

    let handlerRegister: HandlerTypes.Register.t<eventArgs> = HandlerTypes.Register.make(
      ~topic0=sighash,
      ~contractName,
      ~eventName=name,
    )

  }
  module TokenCreated = {
    let sighash = "0xfdc90d498a1602314464a0907c52c51090745809fb1655b49df42e9333129f70"
    let name = "TokenCreated"
    let contractName = contractName
    let chains = chains

    @genType
    type eventArgs = {name: string, tokenAddress: Address.t}
    let eventArgsSchema = S.object(s => {name: s.field("name", S.string), tokenAddress: s.field("tokenAddress", Address.schema)})
    let convertHyperSyncEventArgs = (decodedEvent: HyperSyncClient.Decoder.decodedEvent): eventArgs => {
      {
        name: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
        tokenAddress: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
      }
    }
    let decodeHyperFuelData = (_) => Js.Exn.raiseError("HyperFuel decoder not implemented")

    let handlerRegister: HandlerTypes.Register.t<eventArgs> = HandlerTypes.Register.make(
      ~topic0=sighash,
      ~contractName,
      ~eventName=name,
    )

  }
  module TokensBurned = {
    let sighash = "0xb4ed7d22338308478e19143a97829ebd4d2121943ec22fe5bc9142d3fe3811f8"
    let name = "TokensBurned"
    let contractName = contractName
    let chains = chains

    @genType
    type eventArgs = {name: string, from: Address.t, amount: bigint}
    let eventArgsSchema = S.object(s => {name: s.field("name", S.string), from: s.field("from", Address.schema), amount: s.field("amount", BigInt.schema)})
    let convertHyperSyncEventArgs = (decodedEvent: HyperSyncClient.Decoder.decodedEvent): eventArgs => {
      {
        name: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
        from: decodedEvent.body->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
        amount: decodedEvent.body->Js.Array2.unsafe_get(2)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
      }
    }
    let decodeHyperFuelData = (_) => Js.Exn.raiseError("HyperFuel decoder not implemented")

    let handlerRegister: HandlerTypes.Register.t<eventArgs> = HandlerTypes.Register.make(
      ~topic0=sighash,
      ~contractName,
      ~eventName=name,
    )

  }
  module TokensMinted = {
    let sighash = "0x4506728dbc4ce36dc8444a8417251cc076c49a64b563cfb19aa2d01831e95c96"
    let name = "TokensMinted"
    let contractName = contractName
    let chains = chains

    @genType
    type eventArgs = {name: string, to: Address.t, amount: bigint}
    let eventArgsSchema = S.object(s => {name: s.field("name", S.string), to: s.field("to", Address.schema), amount: s.field("amount", BigInt.schema)})
    let convertHyperSyncEventArgs = (decodedEvent: HyperSyncClient.Decoder.decodedEvent): eventArgs => {
      {
        name: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
        to: decodedEvent.body->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
        amount: decodedEvent.body->Js.Array2.unsafe_get(2)->HyperSyncClient.Decoder.toUnderlying->Utils.magic,
      }
    }
    let decodeHyperFuelData = (_) => Js.Exn.raiseError("HyperFuel decoder not implemented")

    let handlerRegister: HandlerTypes.Register.t<eventArgs> = HandlerTypes.Register.make(
      ~topic0=sighash,
      ~contractName,
      ~eventName=name,
    )

  }
}

@genType
type chainId = int

type eventBatchQueueItem = {
  timestamp: int,
  chain: ChainMap.Chain.t,
  blockNumber: int,
  logIndex: int,
  event: eventLog<internalEventArgs>,
  eventMod: module(InternalEvent),
  //Default to false, if an event needs to
  //be reprocessed after it has loaded dynamic contracts
  //This gets set to true and does not try and reload events
  hasRegisteredDynamicContracts?: bool,
}
