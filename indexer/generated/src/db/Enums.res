// Graphql Enum Type Variants
type enumType<'a> = {
  name: string,
  variants: array<'a>,
}

let mkEnum = (~name, ~variants) => {
  name,
  variants,
}

module type Enum = {
  type t
  let enum: enumType<t>
}

module ContractType = {
  @genType
  type t = 
    | @as("MultiTokenERC20") MultiTokenERC20

  let schema = 
      S.literal(MultiTokenERC20)

  let name = "CONTRACT_TYPE"
  let variants = [
    MultiTokenERC20,
  ]
  let enum = mkEnum(~name, ~variants)
}

module EntityType = {
  @genType
  type t = 
    | @as("MultiTokenERC20_OwnershipTransferred") MultiTokenERC20_OwnershipTransferred
    | @as("MultiTokenERC20_TokenCreated") MultiTokenERC20_TokenCreated
    | @as("MultiTokenERC20_TokensBurned") MultiTokenERC20_TokensBurned
    | @as("MultiTokenERC20_TokensMinted") MultiTokenERC20_TokensMinted

  let schema = S.union([
    S.literal(MultiTokenERC20_OwnershipTransferred), 
    S.literal(MultiTokenERC20_TokenCreated), 
    S.literal(MultiTokenERC20_TokensBurned), 
    S.literal(MultiTokenERC20_TokensMinted), 
  ])

  let name = "ENTITY_TYPE"
  let variants = [
    MultiTokenERC20_OwnershipTransferred,
    MultiTokenERC20_TokenCreated,
    MultiTokenERC20_TokensBurned,
    MultiTokenERC20_TokensMinted,
  ]

  let enum = mkEnum(~name, ~variants)
}


let allEnums: array<module(Enum)> = [
  module(ContractType), 
  module(EntityType),
]
