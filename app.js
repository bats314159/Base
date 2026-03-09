// app.js - dApp for MyContract on Base network

const contractAddress = "0xYourContractAddressHere"; // Replace with actual deployed address
const contractABI = [
    "function message() view returns (string)",
    "function owner() view returns (address)",
    "function messageSetCount() view returns (uint256)",
    "function userMessages(address) view returns (string)",
    "function userMessageTimestamps(address) view returns (uint256)",
    "function setMessage(string)",
    "function appendToMessage(string)",
    "function resetMessage()",
    "function setUserMessage(string)",
    "function deleteUserMessage()",
    "function getMessageLength() view returns (uint256)",
    "function getUserMessageAge(address) view returns (uint256)",
    "event MessageSet(string newMessage)",
    "event UserMessageSet(address user, string newMessage)",
    "event MessageReset()"
];

let provider, signer, contract, userAddress;

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            document.getElementById('account').textContent = `Connected: ${userAddress}`;

            // Switch to Base network
            await switchToBase();

            contract = new ethers.Contract(contractAddress, contractABI, signer);

            loadData();
            setupEventListeners();
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet");
        }
    } else {
        alert("Please install MetaMask or another Web3 wallet");
    }
}

async function switchToBase() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x2105' }], // Base mainnet chain ID
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x2105',
                        chainName: 'Base',
                        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
                        rpcUrls: ['https://mainnet.base.org'],
                        blockExplorerUrls: ['https://basescan.org']
                    }]
                });
            } catch (addError) {
                console.error("Error adding Base network:", addError);
            }
        }
    }
}

async function loadData() {
    try {
        const globalMsg = await contract.message();
        document.getElementById('globalMessage').textContent = globalMsg;

        const count = await contract.messageSetCount();
        document.getElementById('messageCount').textContent = count.toString();

        if (userAddress) {
            const userMsg = await contract.userMessages(userAddress);
            document.getElementById('userMessage').textContent = userMsg;

            const age = await contract.getUserMessageAge(userAddress);
            document.getElementById('messageAge').textContent = age.toString();
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function setupEventListeners() {
    document.getElementById('setGlobalMessage').addEventListener('click', async () => {
        const msg = document.getElementById('newGlobalMessage').value;
        if (!msg) return alert("Enter a message");
        try {
            const tx = await contract.setMessage(msg);
            await tx.wait();
            loadData();
            alert("Global message set!");
        } catch (error) {
            console.error(error);
            alert("Error setting message. Are you the owner?");
        }
    });

    document.getElementById('appendGlobalMessage').addEventListener('click', async () => {
        const msg = document.getElementById('newGlobalMessage').value;
        if (!msg) return alert("Enter text to append");
        try {
            const tx = await contract.appendToMessage(msg);
            await tx.wait();
            loadData();
            alert("Text appended!");
        } catch (error) {
            console.error(error);
            alert("Error appending. Are you the owner?");
        }
    });

    document.getElementById('resetGlobalMessage').addEventListener('click', async () => {
        try {
            const tx = await contract.resetMessage();
            await tx.wait();
            loadData();
            alert("Global message reset!");
        } catch (error) {
            console.error(error);
            alert("Error resetting. Are you the owner?");
        }
    });

    document.getElementById('setUserMessage').addEventListener('click', async () => {
        const msg = document.getElementById('newUserMessage').value;
        if (!msg) return alert("Enter a message");
        try {
            const tx = await contract.setUserMessage(msg);
            await tx.wait();
            loadData();
            alert("Personal message set!");
        } catch (error) {
            console.error(error);
            alert("Error setting personal message");
        }
    });

    document.getElementById('deleteUserMessage').addEventListener('click', async () => {
        try {
            const tx = await contract.deleteUserMessage();
            await tx.wait();
            loadData();
            alert("Personal message deleted!");
        } catch (error) {
            console.error(error);
            alert("Error deleting message");
        }
    });

    document.getElementById('queryUserMessage').addEventListener('click', async () => {
        const addr = document.getElementById('queryAddress').value;
        if (!ethers.utils.isAddress(addr)) return alert("Invalid address");
        try {
            const msg = await contract.userMessages(addr);
            document.getElementById('queriedMessage').textContent = msg || "No message set";
        } catch (error) {
            console.error(error);
            alert("Error querying message");
        }
    });
}

document.getElementById('connectWallet').addEventListener('click', connectWallet);