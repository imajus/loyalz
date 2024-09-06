open Table
open Enums.EntityType
type id = string

type internalEntity
module type Entity = {
  type t
  let key: string
  let name: Enums.EntityType.t
  let schema: S.schema<t>
  let rowsSchema: S.schema<array<t>>
  let table: Table.table
}
module type InternalEntity = Entity with type t = internalEntity
external entityModToInternal: module(Entity with type t = 'a) => module(InternalEntity) = "%identity"

//shorthand for punning
let isPrimaryKey = true
let isNullable = true
let isArray = true
let isIndex = true

@genType
type whereOperations<'entity, 'fieldType> = {eq: 'fieldType => promise<array<'entity>>}

module MultiTokenERC20_OwnershipTransferred = {
  let key = "MultiTokenERC20_OwnershipTransferred"
  let name = MultiTokenERC20_OwnershipTransferred
  @genType
  type t = {
    id: id,
    newOwner: string,
    previousOwner: string,
  }

  let schema = S.object((s): t => {
    id: s.field("id", S.string),
    newOwner: s.field("newOwner", S.string),
    previousOwner: s.field("previousOwner", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
     (name :> string),
    ~fields=[
      mkField(
      "id", 
      Text,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "newOwner", 
      Text,
      
      
      
      
      
      ),
      mkField(
      "previousOwner", 
      Text,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~default="CURRENT_TIMESTAMP"),
    ],
  )
}
 
module MultiTokenERC20_TokenCreated = {
  let key = "MultiTokenERC20_TokenCreated"
  let name = MultiTokenERC20_TokenCreated
  @genType
  type t = {
    id: id,
    name: string,
    tokenAddress: string,
  }

  let schema = S.object((s): t => {
    id: s.field("id", S.string),
    name: s.field("name", S.string),
    tokenAddress: s.field("tokenAddress", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
     (name :> string),
    ~fields=[
      mkField(
      "id", 
      Text,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "name", 
      Text,
      
      
      
      
      
      ),
      mkField(
      "tokenAddress", 
      Text,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~default="CURRENT_TIMESTAMP"),
    ],
  )
}
 
module MultiTokenERC20_TokensBurned = {
  let key = "MultiTokenERC20_TokensBurned"
  let name = MultiTokenERC20_TokensBurned
  @genType
  type t = {
    amount: bigint,
    from: string,
    id: id,
    name: string,
  }

  let schema = S.object((s): t => {
    amount: s.field("amount", BigInt.schema),
    from: s.field("from", S.string),
    id: s.field("id", S.string),
    name: s.field("name", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
     (name :> string),
    ~fields=[
      mkField(
      "amount", 
      Numeric,
      
      
      
      
      
      ),
      mkField(
      "from", 
      Text,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "name", 
      Text,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~default="CURRENT_TIMESTAMP"),
    ],
  )
}
 
module MultiTokenERC20_TokensMinted = {
  let key = "MultiTokenERC20_TokensMinted"
  let name = MultiTokenERC20_TokensMinted
  @genType
  type t = {
    amount: bigint,
    id: id,
    name: string,
    to: string,
  }

  let schema = S.object((s): t => {
    amount: s.field("amount", BigInt.schema),
    id: s.field("id", S.string),
    name: s.field("name", S.string),
    to: s.field("to", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
     (name :> string),
    ~fields=[
      mkField(
      "amount", 
      Numeric,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "name", 
      Text,
      
      
      
      
      
      ),
      mkField(
      "to", 
      Text,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~default="CURRENT_TIMESTAMP"),
    ],
  )
}
 

type entity = 
  | MultiTokenERC20_OwnershipTransferred(MultiTokenERC20_OwnershipTransferred.t)
  | MultiTokenERC20_TokenCreated(MultiTokenERC20_TokenCreated.t)
  | MultiTokenERC20_TokensBurned(MultiTokenERC20_TokensBurned.t)
  | MultiTokenERC20_TokensMinted(MultiTokenERC20_TokensMinted.t)

let makeGetter = (schema, accessor) => json => json->S.parseWith(schema)->Belt.Result.map(accessor)

let getEntityParamsDecoder = (entityName: Enums.EntityType.t) =>
  switch entityName {
  | MultiTokenERC20_OwnershipTransferred => makeGetter(MultiTokenERC20_OwnershipTransferred.schema, e => MultiTokenERC20_OwnershipTransferred(e))
  | MultiTokenERC20_TokenCreated => makeGetter(MultiTokenERC20_TokenCreated.schema, e => MultiTokenERC20_TokenCreated(e))
  | MultiTokenERC20_TokensBurned => makeGetter(MultiTokenERC20_TokensBurned.schema, e => MultiTokenERC20_TokensBurned(e))
  | MultiTokenERC20_TokensMinted => makeGetter(MultiTokenERC20_TokensMinted.schema, e => MultiTokenERC20_TokensMinted(e))
  }

let allTables: array<table> = [
  MultiTokenERC20_OwnershipTransferred.table,
  MultiTokenERC20_TokenCreated.table,
  MultiTokenERC20_TokensBurned.table,
  MultiTokenERC20_TokensMinted.table,
]
let schema = Schema.make(allTables)

@get
external getEntityId: internalEntity => string = "id"

exception UnexpectedIdNotDefinedOnEntity
let getEntityIdUnsafe = (entity: 'entity): id =>
  switch Utils.magic(entity)["id"] {
  | Some(id) => id
  | None =>
    UnexpectedIdNotDefinedOnEntity->ErrorHandling.mkLogAndRaise(
      ~msg="Property 'id' does not exist on expected entity object",
    )
  }
