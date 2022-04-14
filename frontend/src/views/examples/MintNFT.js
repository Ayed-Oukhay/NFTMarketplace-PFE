import React, { useState, useEffect } from "react";
import "./MintNFT.css";
import { Input } from "reactstrap";
import Select from 'react-select';
import Attributes from '../../components/NFTCard/Attributes';
//import Mint from '../../utils/interact';

// Components for the unlockable content section
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

import { pinJSONToIPFS } from '../../utils/pinata.js'; // used later to add metadata when creating an NFT

// --------- Connecting to Alchemy and importing our smart contract ---------
require('dotenv').config();
const alchemykey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemykey);

const contractABI = require('../../utils/contract-abi.json')
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"; //A contract deployed on the Ropsten testnet
// ----------------------------------------------------------------------------

// --------------- Checking connection to the wallet -----------------
export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "👆🏽 Write a message in the text-field above.",
                };
            } else {
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
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};
// ----------------------------------------------------------------------------

// ------------ Calling the Mint function in our smart contract --------------
export const mintNFT = async (img, name, description) => {
    // error handling
    if (img.trim() === "" || (name.trim() === "" || description.trim() === "")) {
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
    }

    // make metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = img;
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
        'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI()//make call to NFT smart contract 
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
            status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }

    }
}
// ---------------------------------------------------------------------------

export default function MintNFT() {
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [unlockable, setUnlockable] = useState(false);

    //State variables
    const [status, setStatus] = useState("");
    const [walletAddress, setWallet] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);

    const onImageChange = (e) => {
        setImages([...e.target.files]);
    }

    const handleSubmit = (event) => {
        console.log("sucess");
    }

    const blockchains = [
        { value: 'polygon', label: 'Polygon' },
        { value: 'solana', label: 'Solana' },
        { value: 'tron', label: 'Tron' },
        { value: 'flow', label: 'Flow' }
    ]

    const handleChange = (event) => { // Used for the unlockable content section
        setUnlockable(event.target.checked);
    };

    const connectWalletPressed = async () => { // Function to check if the user is currently connected or not

        const address = await getCurrentWalletConnected();
        setStatus(address.status);
        setWallet(address.address);

    };

    const onMintPressed = async () => { // Function to mint the token once the form is submitted
        const address = await getCurrentWalletConnected();
        if (address.address !== "") {
            const { status } = await mintNFT(img, name, description);
            setStatus(status);
        }
        else {
            setStatus("🦊 Connect to Metamask using the top right button.");
            window.alert("You're not currently connected to your wallet.");
        }
    };

    return (
        <>
            {/* --------------- Begin Navbar --------------- */}
            <ExamplesNavbar />
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
                                    {/* <img alt="..." src={require("../../assets/img/image.png").default} style={{width:200,height:200}}> */}
                                    <input type="file" class="form-control" id="uploadMedia" aria-describedby="uploadMediaHelp" onChange={onImageChange} required />
                                    {imageURLs.map(imageSrc => <img alt="..." src={imageSrc} style={{ width: 200, height: 200 }} />)}
                                    {/* </img> */}
                                </div>
                                <div class="form-group" >
                                    <label for="exampleInputName">Name *</label>
                                    <input type="text" class="form-control" id="exampleInputName" aria-describedby="NameHelp" placeholder="Enter NFT name" onChange={(event) => setName(event.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputLink">External Link</label>
                                    <small id="uploadMediaHelp" class="form-text text-muted">This will allow you to include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</small>
                                    <input type="text" class="form-control" id="exampleInputLink" placeholder="https://yoursite.com/item1/" onChange={(event) => setImg(event.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputDesc">Description</label>
                                    <small id="DescHelp" class="form-text text-muted">The description will be included on the item's detail page underneath its image.</small>
                                    <input type="text" class="form-control" id="exampleInputDesc" placeholder="Provide a detailed description of your item." onChange={(event) => setDescription(event.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Collection</label>
                                    <small id="DescHelp" class="form-text text-muted">This is the collection where your item will appear.</small>
                                    <select class="form-control" id="exampleColl">
                                        <option style={{ backgroundImage: "../../assets/img/image.png", width: 20, height: 20 }}>PhotographyCollection#123</option>
                                        <option>TestCollection...</option>
                                        <option>#3</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Properties</label>
                                    <small id="DescHelp" class="form-text text-muted">Add your NFT Traits.</small>
                                    <br />
                                    <Attributes />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Unlockable Content
                                        <small id="DescHelp" class="form-text text-muted">Include unlockable content that can only be revealed by the owner of the item.</small>
                                    </label>
                                    <br />
                                    <FormControlLabel
                                        control={
                                            <Switch checked={unlockable} onChange={handleChange} aria-label="login switch" />
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
                                    <label for="exampleFormControlColl">Blockchain</label>
                                    <Select
                                        class="form-control"
                                        // className="basic-single"
                                        classNamePrefix="select Blockchain"
                                        defaultValue={blockchains[0]}
                                        name="blockchain"
                                        options={blockchains}
                                    />
                                </div>

                                <button type="button" class="btn btn-primary" onClick={onMintPressed}>Create NFT</button>
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
