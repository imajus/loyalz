
@genType
type rawEventsKey = {
  chainId: int,
  eventId: string,
}

let hashRawEventsKey = (key: rawEventsKey) =>
  EventUtils.getEventIdKeyString(~chainId=key.chainId, ~eventId=key.eventId)

@genType
type dynamicContractRegistryKey = {
  chainId: int,
  contractAddress: Address.t,
}

let hashDynamicContractRegistryKey = ({chainId, contractAddress}) =>
  EventUtils.getContractAddressKeyString(~chainId, ~contractAddress)

type t = {
  eventSyncState: InMemoryTable.t<int, TablesStatic.EventSyncState.t>,
  rawEvents: InMemoryTable.t<rawEventsKey, TablesStatic.RawEvents.t>,
  dynamicContractRegistry: InMemoryTable.t<
    dynamicContractRegistryKey,
    TablesStatic.DynamicContractRegistry.t,
  >,
  @as("MultiTokenERC20_OwnershipTransferred") 
  multiTokenERC20_OwnershipTransferred: InMemoryTable.Entity.t<Entities.MultiTokenERC20_OwnershipTransferred.t>,
  @as("MultiTokenERC20_TokenCreated") 
  multiTokenERC20_TokenCreated: InMemoryTable.Entity.t<Entities.MultiTokenERC20_TokenCreated.t>,
  @as("MultiTokenERC20_TokensBurned") 
  multiTokenERC20_TokensBurned: InMemoryTable.Entity.t<Entities.MultiTokenERC20_TokensBurned.t>,
  @as("MultiTokenERC20_TokensMinted") 
  multiTokenERC20_TokensMinted: InMemoryTable.Entity.t<Entities.MultiTokenERC20_TokensMinted.t>,
  rollBackEventIdentifier: option<Types.eventIdentifier>,
}

let makeWithRollBackEventIdentifier = (rollBackEventIdentifier): t => {
  eventSyncState: InMemoryTable.make(~hash=v => v->Belt.Int.toString),
  rawEvents: InMemoryTable.make(~hash=hashRawEventsKey),
  dynamicContractRegistry: InMemoryTable.make(~hash=hashDynamicContractRegistryKey),
  multiTokenERC20_OwnershipTransferred: InMemoryTable.Entity.make(),
  multiTokenERC20_TokenCreated: InMemoryTable.Entity.make(),
  multiTokenERC20_TokensBurned: InMemoryTable.Entity.make(),
  multiTokenERC20_TokensMinted: InMemoryTable.Entity.make(),
  rollBackEventIdentifier,
}

let make = () => makeWithRollBackEventIdentifier(None)

let clone = (self: t) => {
  eventSyncState: self.eventSyncState->InMemoryTable.clone,
  rawEvents: self.rawEvents->InMemoryTable.clone,
  dynamicContractRegistry: self.dynamicContractRegistry->InMemoryTable.clone,
  multiTokenERC20_OwnershipTransferred: self.multiTokenERC20_OwnershipTransferred->InMemoryTable.Entity.clone,
  multiTokenERC20_TokenCreated: self.multiTokenERC20_TokenCreated->InMemoryTable.Entity.clone,
  multiTokenERC20_TokensBurned: self.multiTokenERC20_TokensBurned->InMemoryTable.Entity.clone,
  multiTokenERC20_TokensMinted: self.multiTokenERC20_TokensMinted->InMemoryTable.Entity.clone,
  rollBackEventIdentifier: self.rollBackEventIdentifier->InMemoryTable.structuredClone,
}


let getInMemTable = (
  type entity,
  inMemoryStore: t,
  ~entityMod: module(Entities.Entity with type t = entity),
): InMemoryTable.Entity.t<entity> => {
  let module(Entity) = entityMod->Entities.entityModToInternal
  inMemoryStore->Utils.magic->Js.Dict.unsafeGet(Entity.key)
}
