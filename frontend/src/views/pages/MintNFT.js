import React, { useState, useEffect, useRef } from "react";
import "./MintNFT.css";
import { Input } from "reactstrap";
import Select from 'react-select';
import ipfs from '../../utils/ipfs';
import axios from 'axios';

// Components for the unlockable content section
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// core components
import Navbar from "components/Navbars/MainNavbar.js";
import Footer from "components/Footer/Footer.js";

import { pinJSONToIPFS } from '../../utils/pinata.js'; // used later to add metadata when creating an NFT

import BlockchainSelectionModal from "./BlockchainSelection";

// ********** Connecting to Alchemy and importing our smart contract **********
require('dotenv').config();
const alchemykey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemykey);
const solanaWeb3 = require("@solana/web3.js");

var requests = require('requests');
// Requesting current connected wallet address::...........
// Changing the contractABI and the contractAddress depending on the current blockchain the user is connected to
// Specifying the contract info
const contractABI = require('../../utils/contract-abi.json');
const contractAddress = "0x7a1C29e5462989dB8680AaF5b9c1FeD6BDC16303"; //A contract deployed on the polygon Mumbai testnet
// const SolContractAddress = ""; //A contract deployed on the polygon Mumbai testnet
const API_KEY_ID = process.env.API_KEY_ID;
const API_SECRET_KEY = process.env.API_SECRET_KEY;
// *****************************************************************************

const db = 'mongodb://localhost:27017/MarketplaceUsers';

// ************ Checking connection to the wallet ************
export const getCurrentWalletConnected = async () => {
    // ---------- Checking if the user is connected to the Polygon wallet ----------
    if (window.ethereum) { // Checking if metamask is even installed on the browser
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "👆🏽 Write a message in the text-field above.",
                };
            }
            // -------- Checking if the user is connected to solana instead --------
            // else if (window.solana && window.solana.isPhantom) {
            //     // -------------- Getting the Phantom account address -------------------
            //     const solanaAccount = await window.solana.connect();
            //     if (solanaAccount) {
            //         const solWalletKey = solanaAccount.publicKey.toString();
            //         return {
            //             address: solWalletKey,
            //             status: "👆🏽 Write a message in the text-field above.",
            //         };
            //     }
            // }
            // -------- Else returning an error --------
            else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                };
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else { // If the metamask browser extention is not installed
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};
// *****************************************************************************

// *************** Calling the Mint function in our smart contract ***************
export const mintNFT = async (img, name, description, extLink, attributes) => {
    // Cheking if all the required fields are filled
    if (img === "" || (name.trim() === "" || description.trim() === "")) {
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
    }

    // Creating the metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = img;
    metadata.description = description;
    metadata.externalLink = extLink;
    metadata.attributes = attributes;

    // Calling pinata to pin the metadata to IPFS
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

    //setting up the Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI()//make call to the NFT smart contract 
    };

    //signing the transaction via Metamask
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Polygonscan: https://mumbai.polygonscan.com/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }
}
// *****************************************************************************

// **************** Solana NFT mint function ****************
// export const mintSolanaNFT = async (img, name, description, extLink, attributes) => {
//     // Cheking if all the required fields are filled
//     if (img === "" || (name.trim() === "" || description.trim() === "")) {
//         return {
//             success: false,
//             status: "❗Please make sure all fields are completed before minting.",
//         }
//     }

//     const HEADERS = {
//         "APIKeyID": API_KEY_ID,
//         "APISecretKey": API_SECRET_KEY
//     }

//     const solanaAccount = await window.solana.connect();
//     const MNEMONIC_PHRASE = solanaAccount.publicKey.toString();

//     const PARAMS = {
//         "secret_recovery_phrase": MNEMONIC_PHRASE,
//         "derivation_path": "",
//         "network": "devnet",
//         "nft_name": "Rare Rare Punk Pig #001",
//         "nft_symbol": "PUNKPIG",
//         "nft_url": "https://pbs.twimg.com/profile_images/724046973276278784/8fvrG3zo_400x400.jpg",
//         "nft_upload_method": "LINK"
//     }

//     const response = requests.post({
//         "url": "https://api.theblockchainapi.com/v1/solana/nft",
//         "params": PARAMS,
//         "headers": HEADERS
//     });

//     console.log(response.json())
// }
// **********************************************************

// **************** Begining the Main function ****************
export default function MintNFT() {
    //variable to handle the unlockable content section
    const [unlockable, setUnlockable] = useState(false);

    //State variables
    const [status, setStatus] = useState("");
    const [walletAddress, setWallet] = useState("");
    const [name, setName] = useState(""); //metadata component
    const [description, setDescription] = useState(""); //metadata component
    const [img, setImg] = useState(""); //metadata component
    const [extlink, setExtlink] = useState(""); //metadata component
    const [attributes, setAttributes] = useState([
        { name: "", value: "" },
    ]); //metadata component

    //const [contractAddress, setContractAddress] = useState(""); // used to change the smart contract address
    const contractAddress = useRef(null);

    // ------ Begining the image upload handling ------
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);

    // Capturing the uploaded image
    const onImageChange = (event) => {
        setImages([...event.target.files]);
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            // uploading the image to ipfs and getting the hash
            const imgBuffer = Buffer.from(reader.result);
            ipfs.files.add(imgBuffer, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    setImg("https://ipfs.io/ipfs/" + result[0].hash);
                    console.log(result[0].hash);
                }
            })
        };
    }
    // ------ End of the image upload handling ------

    // ------ Begining the NFT properties handling ------
    let addFormFields = () => {
        setAttributes([...attributes, { name: "", value: "" }])
    }

    let removeFormFields = (i) => {
        let newAttributeValues = [...attributes];
        newAttributeValues.splice(i, 1);
        setAttributes(newAttributeValues)
    }
    // ------ Ending the NFT properties handling ------

    const handleSubmit = (event) => { //for the form submit
        alert(JSON.stringify(attributes));
        console.log("sucess");
    }

    const handleChange = (i, event) => { // Used for the unlockable content section
        // Detecting added NFT traits
        let newAttributeValues = [...attributes];
        newAttributeValues[i][event.target.name] = event.target.value;
        setAttributes(newAttributeValues);
        //console.log(i, event.target.name)
    };

    const handleChangeUnlockableContent = (event) => { // Used for the unlockable content section
        setUnlockable(event.target.checked);
    };

    const onMintPressed = async () => { // Function to mint the token once the form is submitted
        //console.log("inputFields", attributes);
        const address = await getCurrentWalletConnected();
        if (address.address !== "") {
            const { status } = await mintNFT(img, name, description, extlink, attributes);
            setStatus(status);
        }
        else {
            setStatus("🦊 Connect to Metamask, 👻 Phantom, or any other wallet using the top right buttons.");
            window.alert("You're not currently connected to your wallet.");
        }
    };

    // const onSolMintPressed = async () => { // Function to mint the token once the form is submitted
    //     //console.log("inputFields", attributes);
    //     const address = await getCurrentWalletConnected();
    //     if (address !== "") {
    //         const { status } = await mintSolanaNFT(img, name, description, extlink, attributes);
    //         setStatus(status);
    //     }
    //     else {
    //         setStatus("🦊 Connect to Metamask, 👻 Phantom, or any other wallet using the top right buttons.");
    //         window.alert("You're not currently connected to your wallet.");
    //     }
    // };

    const ChangeCurrentBlockchain = () => {
        // if (event.target.value === "rinkeby") {
        //     setContractAddress("0x8d12a197cb00d4747a1fe03395095ce2a5cc6819");
        // }
        // else if (event.target.value === "mainnet") {
        //     setContractAddress("0x8d12a197cb00d4747a1fe03395095ce2a5cc6819");
        // }
        return (
            <>
                <BlockchainSelectionModal />
            </>
        )
    }

    // Function to set the smart contract address to mint the nft from 
    const onSmartContractChange = (event) => {
        // Getting the list of all the contracts in the DB
        const contractList = axios.get(`${db}contracts`).then((response) => {
            const allContracts = response.data.contracts;
        }).catch(error => console.error(`Error: ${error}`));
        console.log(contractList);
        // Setting the contract address to the one selected by the user
        if (event.target.value == "default contract") {
            contractAddress.current.hidden = true;
            console.log("default contract is selected");
        }
        else if (event.target.value == "Other") {
            contractAddress.current.hidden = false;
            console.log(contractAddress.current.value);
        }
        else {
            contractAddress.current.hidden = true;
            console.log(event.target.value);
        }
    }

    return (
        <>
            {/* --------------- Begin Navbar --------------- */}
            <Navbar />
            {/* --------------- End Navbar --------------- */}

            <div className="wrapper">
                {/* -------------- Begin NFT Creation Form ----------------- */}
                <div className="content-center">
                    <section className="section section-lg">
                        <section className="section">
                            <small id="uploadMediaHelp" class="form-text text-muted">* Required fields</small>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label for="uploadMedia">Choose an Image, Video, Audio, or a 3D Model *</label>
                                    <small id="uploadMediaHelp" class="form-text text-muted">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</small>
                                    <input type="file" class="form-control" id="uploadMedia" aria-describedby="uploadMediaHelp" onChange={onImageChange} required />
                                    {imageURLs.map(imageSrc => <img alt="..." src={imageSrc} style={{ width: 400, height: 250 }} />)}
                                </div>
                                <div class="form-group" >
                                    <label for="exampleInputName">Name *</label>
                                    <input type="text" class="form-control" id="exampleInputName" aria-describedby="NameHelp" placeholder="Enter NFT name" onChange={(event) => setName(event.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputLink">External Link (optional)</label>
                                    <small id="uploadMediaHelp" class="form-text text-muted">This will allow you to include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</small>
                                    <input type="text" class="form-control" id="exampleInputLink" placeholder="https://yoursite.com/item1/" onChange={(event) => setExtlink(event.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputDesc">Description *</label>
                                    <small id="DescHelp" class="form-text text-muted">The description will be included on the item's detail page underneath its image.</small>
                                    <input type="text" class="form-control" id="exampleInputDesc" placeholder="Provide a detailed description of your item." onChange={(event) => setDescription(event.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Collection (optional)</label>
                                    <small id="DescHelp" class="form-text text-muted">This is the collection where your item will appear.</small>
                                    <select class="form-control" id="exampleColl">
                                        <option style={{ backgroundImage: "../../assets/img/image.png", width: 20, height: 20 }}>PhotographyCollection#123</option>
                                        <option>TestCollection...</option>
                                        <option>#3</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Properties (optional)</label>
                                    <small id="DescHelp" class="form-text text-muted">Add your NFT Traits.</small>
                                    <br />
                                    {/* ---------- Begin NFT Traits section ---------- */}
                                    {attributes.map((element, index) => (
                                        <div className="form-inline" key={index}>
                                            <label style={{ color: "white", paddingRight: 20 }}>Type</label>
                                            <input type="text" name="name" placeholder='Exp: Class' class="form-control" value={element.name || ""} onChange={e => handleChange(index, e)} /> &nbsp;&nbsp;&nbsp;&nbsp;
                                            <label style={{ color: "white", paddingRight: 20 }}>Value</label>
                                            <input type="text" name="value" placeholder='Exp: Warrior' class="form-control" value={element.value || ""} onChange={e => handleChange(index, e)} /> &nbsp;&nbsp;&nbsp;&nbsp;
                                            {
                                                index ?
                                                    <button type="button" class="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
                                                    : null
                                            }
                                        </div>
                                    ))}
                                    {/* ---------- End NFT Traits section ---------- */}
                                    <button class="btn btn-secondary" type="button" onClick={() => addFormFields()}>+ Add Properties</button>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Unlockable Content
                                        <small id="DescHelp" class="form-text text-muted">Include unlockable content that can only be revealed by the owner of the item.</small>
                                    </label>
                                    <br />
                                    <FormControlLabel
                                        control={
                                            <Switch checked={unlockable} onChange={handleChangeUnlockableContent} aria-label="login switch" />
                                        }
                                        label={unlockable ? <Input class="form-control" placeholder="Enter Content (Access key, Redeem code, link to a file,...)." rows="3" type="textarea" /> : <Input class="form-control" placeholder="Enter Content (Access key, Redeem code, link to a file,...)." rows="3" type="textarea" hidden />}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Supply</label>
                                    <small id="DescHelp" class="form-text text-muted">The amout of tokens you'll own.</small>
                                    <input type="number" class="form-control" id="exampleInputName" aria-describedby="NameHelp" placeholder="1" disabled />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Smart contract</label>
                                    <small id="DescHelp" class="form-text text-muted">You can either deploy your NFT on our TNM's smart contract, or you can choose one of your own own smart contract.</small>
                                    {/* List of smart contracts of the user including the smart contract deployed by us, OR the user can select "other" option and manually enter his smart contract address*/}
                                    <select class="form-control" id="exampleColl" onChange={onSmartContractChange}>
                                        <option>Default Contract</option>
                                        <option>0x03ef23f801D2bc9B2A839DD476a16842C0066456</option>
                                        <option>...</option>
                                        <option>Other</option>
                                    </select>
                                    {/* If the user selects Other then the line here under should appear and the selection list above should be hidden */}
                                    <input type="text" class="form-control" id="otherSCAddress" ref={contractAddress} aria-describedby="NameHelp" placeholder="0x7a1C29e5462989dB8680AaF5b9c1FeD6BDC16303" hidden />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Blockchain</label>
                                    <small id="DescHelp" class="form-text text-muted">If you want to change your current Blockchain, you can click this button.</small>
                                    {/* <BlockchainSelectionModal style={{ display: "flex", margin: "auto" }} value="Change Blockchain"/> */}
                                    <button class="btn btn-warning" type="button" onClick={ChangeCurrentBlockchain} style={{ padding: 11 }}><i className="tim-icons icon-alert-circle-exc" style={{ marginRight: 7 }} />Change Blockchain</button>
                                </div>
                                <br />
                                <button type="button" class="btn btn-primary" onClick={onMintPressed}><i className="tim-icons icon-check-2" /> &nbsp;&nbsp; Create NFT</button>
                                <p id="status">{status}</p>
                            </form>
                        </section>
                    </section>

                </div>
                {/* -------------------------- End NFT Creation Form ------------------------- */}
            </div>

            {/* --------------- Begin Footer --------------- */}
            <Footer />
            {/* --------------- End Footer --------------- */}

        </>
    );
}
// **************** Ending the Main function ****************