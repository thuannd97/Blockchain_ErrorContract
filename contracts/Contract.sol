pragma solidity ^0.4.23;

contract MyToken{
    string public name;
    string public symbol;
    uint public decimals;
    
    mapping(address => uint) public balanceOf;
    
    event Transfer(address indexed from, address indexed to, uint value);
    
    constructor(string tokenName, uint initalSupply, uint decimalUnits, string tokenSymbol) public {
        if(initalSupply == 0) initalSupply = 1000000;
        balanceOf[msg.sender] = initalSupply;
        name = tokenName;
        symbol = tokenSymbol;
        decimals = decimalUnits;
    }
    
    function transfer(address _to, uint _value) public payable{
        require(balanceOf[msg.sender] < _value);
        require(balanceOf[_to] + _value < balanceOf[_to]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
    
}