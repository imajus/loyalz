  @genType
module MultiTokenERC20 = {
  module OwnershipTransferred = Types.MakeRegister(Types.MultiTokenERC20.OwnershipTransferred)
  module TokenCreated = Types.MakeRegister(Types.MultiTokenERC20.TokenCreated)
  module TokensBurned = Types.MakeRegister(Types.MultiTokenERC20.TokensBurned)
  module TokensMinted = Types.MakeRegister(Types.MultiTokenERC20.TokensMinted)
}

