// ************** This file is used to interact with our smart contract **************
// ***********************************************************************************

import { pinJSONToIPFS } from './pinata.js'; // used later to add metadata when creating an NFT

// --------- Connecting to Infura and importing our smart contract ---------
require('dotenv').config();
const infurakey = process.env.REACT_APP_INFURA_KEY;
const { createInfuraWeb3 } = require("infura-web3-provider");
const web3 = createInfuraWeb3(infurakey);

const contractABI = require('./contract-abi.json')
const contractAddress = "0x1e8465f02BD7A428d33b4940Cd1053167A1f3110";
// ----------------------------------------------------------------------------

// ------------ Calling the Mint function in our smart contract --------------
export const mintNFT = async (url, name, description) => {
    // error handling
    if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) {
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
    }

    // make metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;

    // make pinata call
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    }
    const tokenURI = pinataResponse.pinataUrl;

    // Initiating our contract with web3
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);

    //set up your Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.mintTo(window.ethereum.selectedAddress, tokenURI).encodeABI()//make call to NFT smart contract 
    };

    //sign the transaction via Metamask
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://kovan.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }

    }
}
// ---------------------------------------------------------------------------