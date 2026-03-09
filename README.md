# Base dApp

A decentralized application for interacting with MyContract on the Base network.

## Features

- Connect to MetaMask wallet
- View and manage global message (owner only)
- Set personal messages
- Query other users' messages
- Track message timestamps and ages

## Quick Start

### 1. Deploy the Contract

```bash
# Set your private key
export PRIVATE_KEY=your_private_key_here

# Deploy to Base mainnet
./deploy.sh

# Or deploy to testnet (edit deploy.sh to uncomment testnet lines)
```

### 2. Update Contract Address

After deployment, update the `contractAddress` in both `app.js` and `docs/app.js` with your deployed contract address.

### 3. Host the dApp

The dApp is ready to be hosted on GitHub Pages:

1. Go to your repository settings
2. Enable GitHub Pages
3. Select "Deploy from a branch" and choose `main` branch with `/docs` folder
4. Your dApp will be available at `https://yourusername.github.io/Base/`

## Local Development

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Compile contract
forge build

# Test locally
forge test
```

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
- Foundry for development/deployment
