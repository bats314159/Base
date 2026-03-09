#!/bin/bash

# Deploy MyContract to Base network
# Make sure you have foundry installed and configured

# Set the contract constructor argument
MESSAGE="Hello from Base dApp!"

# Deploy to Base mainnet
echo "Deploying to Base mainnet..."
forge create --rpc-url https://mainnet.base.org \
    --private-key $PRIVATE_KEY \
    --constructor-args "$MESSAGE" \
    src/MyContract.sol:MyContract

# For testnet deployment, uncomment:
# echo "Deploying to Base Goerli testnet..."
# forge create --rpc-url https://goerli.base.org \
#     --private-key $PRIVATE_KEY \
#     --constructor-args "$MESSAGE" \
#     src/MyContract.sol:MyContract

echo "Deployment complete. Update the contract address in app.js and docs/app.js"