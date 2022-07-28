// ------------ core components ----------------
import React, { useEffect, useState } from "react";
import Navbar from "components/Navbars/MainNavbar.js";
import Footer from "components/Footer/Footer.js";
import { useLocation } from 'react-router-dom';

require('dotenv').config();

const endpoint = process.env.REACT_APP_ALCHEMY_KEY;

const NFT = (props) => {

    const [contractAddress, setContractAddress] = useState("0x7a1C29e5462989dB8680AaF5b9c1FeD6BDC16303"); // For the moment the contract's address is hardcoded, seeing that all the NFTs created for the moments are done through the same smart contract.
    const [SpecNFT, setSpecNFT] = useState("");

    // ------------ Getting the id of the current selected NFT from the URL ----------------
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    // console.log(id);

    // ----------------------- Function to display the selected NFT using Alchemy's getNFTMetadata api -----------------------
    // ----------------------- This api gets the metadata associated with a given NFT -----------------------
    useEffect(async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        // --- Preparing the api's required variables ---
        const baseURL = `${endpoint}/getNFTMetadata`;
        const tokenId = id;
        const tokenType = "erc721";
        const fetchURL = `${baseURL}?contractAddress=${contractAddress}&tokenId=${tokenId}&tokenType=${tokenType}`;

        // --- Calling the api to get the metadata of the selected NFT ---
        let data = await fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then((response) => {
                //console.log(response); 
                return response;
            })
            //.then(response => JSON.stringify(response, null, 2))
            .catch(error => console.log('error', error));

        console.log(data);
        setSpecNFT(data);

    }, []);
    // --------------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Navbar />
            <br /><br /><br /><br /><br />
            <div class="container">
                <div class="card">
                    <div class="container-fluid">
                        <div class="wrapper row">
                            <div class="preview col-md-6">
                                <br />
                                <div class="preview-pic tab-content" style={{ marginLeft: '20px', marginTop: '60px', marginBottom: '40px', textAlign: 'center' }}>
                                    <div class="tab-pane active" id="pic-1"><img src={SpecNFT.metadata?.image} /></div>
                                </div>
                            </div>
                            <div class="details col-md-6">
                                <br />
                                <h3 class="product-title">{SpecNFT.title}</h3>
                                <div class="rating">
                                    <div class="stars">
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                    </div>
                                    <span class="review-no">41 reviews</span>
                                </div>

                                <p class="product-description"><strong>Description:</strong>&nbsp;&nbsp;{SpecNFT.metadata?.description}</p>

                                <p class="vote"><strong>Contract Address:</strong> <a href={`https://mumbai.polygonscan.com/address/${SpecNFT.contract?.address}`}>{SpecNFT.contract?.address} </a></p>
                                <h4 class="sizes"><img src="https://cdn-icons-png.flaticon.com/512/3576/3576411.png" style={{ height: '20px' }} /> &nbsp;&nbsp; Attributes:</h4>
                                <ul class="sizes-list">
                                    <span class="size" data-toggle="tooltip" title="small">{SpecNFT.metadata?.attributes[0]?.name}&nbsp;&nbsp;{SpecNFT.metadata?.attributes[0]?.value}</span>< br />
                                    <span class="size" data-toggle="tooltip" title="medium">{SpecNFT.metadata?.attributes[1]?.name}&nbsp;&nbsp;{SpecNFT.metadata?.attributes[1]?.value}</span>< br />
                                </ul>
                                {/* <p class="product-description">Creation date: &nbsp; {SpecNFT.timeLastUpdated}</p> */}
                                <h4 class="price">Current Price: &nbsp;&nbsp;<img src="https://cdn-icons-png.flaticon.com/512/7016/7016537.png" style={{ height: '30px' }} /> 2.88
                                    &nbsp;&nbsp;<span>($2.51)</span></h4>
                                <div class="action">
                                    <button class="add-to-cart btn btn-default" type="button"><i class="fas fa-credit-card" />&nbsp;&nbsp;&nbsp;Buy now</button>
                                    <button class="like btn btn-default" type="button"><i class="fa fa-heart" />&nbsp;&nbsp;&nbsp;Add to wishlist </button>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default NFT