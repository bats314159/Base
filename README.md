# Base dApp

A decentralized application for interacting with MyContract on the Base network.

## Features

- Connect to MetaMask wallet
- View and manage global message (owner only)
- Set personal messages
- Query other users' messages
- Track message timestamps and ages

## Setup

1. Deploy MyContract.sol to Base network
2. Update `contractAddress` in app.js with the deployed address
3. Open index.html in a web browser with MetaMask installed
4. Connect your wallet and switch to Base network

## Contract Functions

- `setMessage(string)`: Set global message (owner only)
- `appendToMessage(string)`: Append to global message (owner only)
- `resetMessage()`: Reset global message (owner only)
- `setUserMessage(string)`: Set personal message
- `deleteUserMessage()`: Delete personal message
- `getUserMessage(address)`: Query user's message
- `getUserMessageAge(address)`: Get message age in seconds

## Requirements

- Web3 wallet (MetaMask recommended)
- Connection to Base network
