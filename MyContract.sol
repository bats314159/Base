// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    string public message;
    mapping(address => string) public userMessages;
    mapping(address => uint256) public userMessageTimestamps;

    address public owner;
    uint256 public messageSetCount;

    event MessageSet(string newMessage);
    event UserMessageSet(address user, string newMessage);
    event MessageReset();

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(string memory _message) {
        message = _message;
        owner = msg.sender;
    }

    function setMessage(string memory _message) public onlyOwner {
        message = _message;
        messageSetCount++;
        emit MessageSet(_message);
    }

    function getMessageLength() public view returns (uint256) {
        return bytes(message).length;
    }

    function setUserMessage(string memory _message) public {
        userMessages[msg.sender] = _message;
        userMessageTimestamps[msg.sender] = block.timestamp;
        emit UserMessageSet(msg.sender, _message);
    }

    function resetMessage() public onlyOwner {
        message = "";
        emit MessageReset();
    }

    function appendToMessage(string memory _additional) public onlyOwner {
        message = string(abi.encodePacked(message, _additional));
        messageSetCount++;
        emit MessageSet(message);
    }

    function getUserMessage(address user) public view returns (string memory) {
        return userMessages[user];
    }

    function deleteUserMessage() public {
        delete userMessages[msg.sender];
        userMessageTimestamps[msg.sender] = 0;
        emit UserMessageSet(msg.sender, "");
    }
}