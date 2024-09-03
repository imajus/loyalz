// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintableBurnableERC20 is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }


    function burnFrom(address account, uint256 amount) public onlyOwner{
        //uint256 currentAllowance = allowance(account, _msgSender());
        //require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
        //unchecked {
            //_approve(account, _msgSender(), currentAllowance - amount);
        //}
        _burn(account, amount);
    }
}