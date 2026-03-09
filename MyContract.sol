// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    string public message;

    event MessageSet(string newMessage);

    constructor(string memory _message) {
        message = _message;
    }

    function setMessage(string memory _message) public {
        message = _message;
        emit MessageSet(_message);
    }

    function getMessageLength() public view returns (uint256) {
        return bytes(message).length;
    }
}