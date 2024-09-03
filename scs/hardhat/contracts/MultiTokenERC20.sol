// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MintableBurnableERC20.sol";

contract MultiTokenERC20 is Ownable {
    mapping(string => address) public tokens;

    event TokenCreated(string indexed name, address indexed tokenAddress);
    event TokensMinted(string name, address to, uint256 amount);
    event TokensBurned(string name, address from, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function createToken(string memory name, string memory symbol) public onlyOwner {
        require(tokens[name] == address(0), "Token already exists");
        MintableBurnableERC20 newToken = new MintableBurnableERC20(name, symbol);
        tokens[name] = address(newToken);
        require(address(newToken) != address(0), "Token creation failed");
        require(tokens[name] == address(newToken), "Token address not stored correctly");
        emit TokenCreated(name, address(newToken));
    }

    function mintTokens(string memory name, address to, uint256 amount) public onlyOwner {
        require(tokens[name] != address(0), "Token does not exist");
        MintableBurnableERC20(tokens[name]).mint(to, amount);
        emit TokensMinted(name, to, amount);
    }

    function burnTokens(string memory name, address from, uint256 amount) public onlyOwner{
        require(tokens[name] != address(0), "Token does not exist");
        require(ERC20(tokens[name]).balanceOf(from) >= amount, "Insufficient balance");
        //require(ERC20(tokens[name]).allowance(from, address(this)) >= amount, "Insufficient allowance");
        MintableBurnableERC20(tokens[name]).burnFrom(from, amount);
        emit TokensBurned(name, from, amount);
    }

    function getTokenAddress(string memory name) public view returns (address) {
        return tokens[name];
    }
}