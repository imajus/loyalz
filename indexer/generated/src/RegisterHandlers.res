@val external require: string => unit = "require"

let registerContractHandlers = (
  ~contractName,
  ~handlerPathRelativeToRoot,
  ~handlerPathRelativeToConfig,
) => {
  try {
    require("root/" ++ handlerPathRelativeToRoot)
  } catch {
  | exn =>
    let params = {
      "Contract Name": contractName,
      "Expected Handler Path": handlerPathRelativeToConfig,
      "Code": "EE500",
    }
    let logger = Logging.createChild(~params)

    let errHandler = exn->ErrorHandling.make(~msg="Failed to import handler file", ~logger)
    errHandler->ErrorHandling.log
    errHandler->ErrorHandling.raiseExn
  }
}

%%private(
  let makeGeneratedConfig = () => {
    let chains = [
      {
        let contracts = [
          {
            Config.name: "MultiTokenERC20",
            abi: Types.MultiTokenERC20.abi,
            addresses: [
              "0x0390eeb6B08D02f4e392866502D161Ad4105D2f3"->Address.Evm.fromStringOrThrow
,
            ],
            events: [
              module(Types.MultiTokenERC20.OwnershipTransferred),
              module(Types.MultiTokenERC20.TokenCreated),
              module(Types.MultiTokenERC20.TokensBurned),
              module(Types.MultiTokenERC20.TokensMinted),
            ],
            sighashes: [
              Types.MultiTokenERC20.OwnershipTransferred.sighash,
              Types.MultiTokenERC20.TokenCreated.sighash,
              Types.MultiTokenERC20.TokensBurned.sighash,
              Types.MultiTokenERC20.TokensMinted.sighash,
            ],
          },
        ]
        let chain = ChainMap.Chain.makeUnsafe(~chainId=31)
        let rpcConfig: Config.rpcConfig = {
          provider: Ethers.JsonRpcProvider.make(
            ~rpcUrls=["https://rpc.testnet.rootstock.io/L6ZhwA295IZEj8TgDgtnlNnoVumEws-T"],
            ~chainId=31,
            ~fallbackStallTimeout=10000,
          ),
          syncConfig: Config.getSyncConfig({
            initialBlockInterval: 10000,
            backoffMultiplicative: 0.8,
            accelerationAdditive: 2000,
            intervalCeiling: 10000,
            backoffMillis: 5000,
            queryTimeoutMillis: 20000,
          }),
        }
        {
          Config.confirmedBlockThreshold: 200,
          syncSource: 
            Rpc(rpcConfig)
,
          startBlock: 5498226,
          endBlock:  None ,
          chain,
          contracts,
          chainWorker:
            module(RpcWorker.Make({
              let chain = chain
              let contracts = contracts
              let rpcConfig = rpcConfig
              let eventModLookup =
                contracts
                ->Belt.Array.flatMap(contract => contract.events)
                ->EventModLookup.fromArrayOrThrow(~chain)
            }))
        }
      },
      {
        let contracts = [
          {
            Config.name: "MultiTokenERC20",
            abi: Types.MultiTokenERC20.abi,
            addresses: [
              "0x31d1042231fcD69d22c3076F841E5970f4a1603c"->Address.Evm.fromStringOrThrow
,
            ],
            events: [
              module(Types.MultiTokenERC20.OwnershipTransferred),
              module(Types.MultiTokenERC20.TokenCreated),
              module(Types.MultiTokenERC20.TokensBurned),
              module(Types.MultiTokenERC20.TokensMinted),
            ],
            sighashes: [
              Types.MultiTokenERC20.OwnershipTransferred.sighash,
              Types.MultiTokenERC20.TokenCreated.sighash,
              Types.MultiTokenERC20.TokensBurned.sighash,
              Types.MultiTokenERC20.TokensMinted.sighash,
            ],
          },
        ]
        let chain = ChainMap.Chain.makeUnsafe(~chainId=296)
        let rpcConfig: Config.rpcConfig = {
          provider: Ethers.JsonRpcProvider.make(
            ~rpcUrls=["https://testnet.hashio.io/api"],
            ~chainId=296,
            ~fallbackStallTimeout=10000,
          ),
          syncConfig: Config.getSyncConfig({
            initialBlockInterval: 10000,
            backoffMultiplicative: 0.8,
            accelerationAdditive: 2000,
            intervalCeiling: 10000,
            backoffMillis: 5000,
            queryTimeoutMillis: 20000,
          }),
        }
        {
          Config.confirmedBlockThreshold: 200,
          syncSource: 
            Rpc(rpcConfig)
,
          startBlock: 8795634,
          endBlock:  None ,
          chain,
          contracts,
          chainWorker:
            module(RpcWorker.Make({
              let chain = chain
              let contracts = contracts
              let rpcConfig = rpcConfig
              let eventModLookup =
                contracts
                ->Belt.Array.flatMap(contract => contract.events)
                ->EventModLookup.fromArrayOrThrow(~chain)
            }))
        }
      },
      {
        let contracts = [
          {
            Config.name: "MultiTokenERC20",
            abi: Types.MultiTokenERC20.abi,
            addresses: [
              "0x31d1042231fcD69d22c3076F841E5970f4a1603c"->Address.Evm.fromStringOrThrow
,
            ],
            events: [
              module(Types.MultiTokenERC20.OwnershipTransferred),
              module(Types.MultiTokenERC20.TokenCreated),
              module(Types.MultiTokenERC20.TokensBurned),
              module(Types.MultiTokenERC20.TokensMinted),
            ],
            sighashes: [
              Types.MultiTokenERC20.OwnershipTransferred.sighash,
              Types.MultiTokenERC20.TokenCreated.sighash,
              Types.MultiTokenERC20.TokensBurned.sighash,
              Types.MultiTokenERC20.TokensMinted.sighash,
            ],
          },
        ]
        let chain = ChainMap.Chain.makeUnsafe(~chainId=2810)
        let rpcConfig: Config.rpcConfig = {
          provider: Ethers.JsonRpcProvider.make(
            ~rpcUrls=["https://rpc-quicknode-holesky.morphl2.io"],
            ~chainId=2810,
            ~fallbackStallTimeout=10000,
          ),
          syncConfig: Config.getSyncConfig({
            initialBlockInterval: 10000,
            backoffMultiplicative: 0.8,
            accelerationAdditive: 2000,
            intervalCeiling: 10000,
            backoffMillis: 5000,
            queryTimeoutMillis: 20000,
          }),
        }
        {
          Config.confirmedBlockThreshold: 200,
          syncSource: 
            Rpc(rpcConfig)
,
          startBlock: 7733089,
          endBlock:  None ,
          chain,
          contracts,
          chainWorker:
            module(RpcWorker.Make({
              let chain = chain
              let contracts = contracts
              let rpcConfig = rpcConfig
              let eventModLookup =
                contracts
                ->Belt.Array.flatMap(contract => contract.events)
                ->EventModLookup.fromArrayOrThrow(~chain)
            }))
        }
      },
      {
        let contracts = [
          {
            Config.name: "MultiTokenERC20",
            abi: Types.MultiTokenERC20.abi,
            addresses: [
              "0x10bAc9115678D7B798B36b1D6Da68E0248873EBE"->Address.Evm.fromStringOrThrow
,
            ],
            events: [
              module(Types.MultiTokenERC20.OwnershipTransferred),
              module(Types.MultiTokenERC20.TokenCreated),
              module(Types.MultiTokenERC20.TokensBurned),
              module(Types.MultiTokenERC20.TokensMinted),
            ],
            sighashes: [
              Types.MultiTokenERC20.OwnershipTransferred.sighash,
              Types.MultiTokenERC20.TokenCreated.sighash,
              Types.MultiTokenERC20.TokensBurned.sighash,
              Types.MultiTokenERC20.TokensMinted.sighash,
            ],
          },
        ]
        let chain = ChainMap.Chain.makeUnsafe(~chainId=88882)
        let rpcConfig: Config.rpcConfig = {
          provider: Ethers.JsonRpcProvider.make(
            ~rpcUrls=["https://spicy-rpc.chiliz.com"],
            ~chainId=88882,
            ~fallbackStallTimeout=10000,
          ),
          syncConfig: Config.getSyncConfig({
            initialBlockInterval: 10000,
            backoffMultiplicative: 0.8,
            accelerationAdditive: 2000,
            intervalCeiling: 10000,
            backoffMillis: 5000,
            queryTimeoutMillis: 20000,
          }),
        }
        {
          Config.confirmedBlockThreshold: 200,
          syncSource: 
            Rpc(rpcConfig)
,
          startBlock: 17232781,
          endBlock:  None ,
          chain,
          contracts,
          chainWorker:
            module(RpcWorker.Make({
              let chain = chain
              let contracts = contracts
              let rpcConfig = rpcConfig
              let eventModLookup =
                contracts
                ->Belt.Array.flatMap(contract => contract.events)
                ->EventModLookup.fromArrayOrThrow(~chain)
            }))
        }
      },
    ]

    Config.make(
      ~shouldRollbackOnReorg=false,
      ~shouldSaveFullHistory=false,
      ~isUnorderedMultichainMode=false,
      ~chains,
      ~enableRawEvents=false,
      ~entities=[
        module(Entities.MultiTokenERC20_OwnershipTransferred),
        module(Entities.MultiTokenERC20_TokenCreated),
        module(Entities.MultiTokenERC20_TokensBurned),
        module(Entities.MultiTokenERC20_TokensMinted),
      ],
    )
  }

  let config: ref<option<Config.t>> = ref(None)
)

let registerAllHandlers = () => {
  registerContractHandlers(
    ~contractName="MultiTokenERC20",
    ~handlerPathRelativeToRoot="src/EventHandlers.js",
    ~handlerPathRelativeToConfig="src/EventHandlers.js",
  )

  let generatedConfig = makeGeneratedConfig()
  config := Some(generatedConfig)
  generatedConfig
}

let getConfig = () => {
  switch config.contents {
  | Some(config) => config
  | None => registerAllHandlers()
  }
}
