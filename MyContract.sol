// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    string public message;
    mapping(address => string) public userMessages;

    event MessageSet(string newMessage);
    event UserMessageSet(address user, string newMessage);
    event MessageReset();

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

    function setUserMessage(string memory _message) public {
        userMessages[msg.sender] = _message;
        emit UserMessageSet(msg.sender, _message);
    }

    function resetMessage() public {
        message = "";
        emit MessageReset();
    }
}