import React, { useState, useEffect } from "react";
import "./MintNFT.css";

// core components
import Navbar from "components/Navbars/MainNavbar.js";
import Footer from "components/Footer/Footer.js";
import {UncontrolledTooltip} from "reactstrap";

require('dotenv').config();

// ************ Checking connection to the wallet and getting the current connected address ************
export const getCurrentWalletConnected = async () => {

    // Checking Metamask connection
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
    }

    // Checking Phantom connection
    // Checking Blocto connection
    // Checking Tronlink connection

};
// *****************************************************************************

// *************** Calling the deploy and verifying the form fields ***************
export const deploySC = async (name, symbol, access, license) => {
    // Cheking if all the required fields are filled
    if (name.trim() === "" || symbol.trim() === "" || access.trim() === "" || license.trim() === "") {
        return {
            success: false,
            status: "❗Please make sure all fields are completed before deploying your smart contract.",
        }
    } else {
        // Check if the transaction passed in the backend and retunr the transaction hash
        // if (...) {
        return {
            success: true,
            status: "✅ Check out your transaction on Polygonscan: https://mumbai.polygonscan.com/tx/",
        }
        // } else {
        //    return {
        //        success: false,
        //        status: "😥 Something went wrong! Please try again later.",
        //    }
        // }
    }
}
// *****************************************************************************

// **************** Begining the Main function ****************
export default function Deploy() {

    // State variables
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [baseuri, setBaseURI] = useState("");
    const [features, setFeatures] = useState("");
    const [access, setAccessControl] = useState("");
    const [license, setLicense] = useState("");

    const onDeployPressed = async () => { // Function to create the smart contract once the form is submitted
        const address = await getCurrentWalletConnected();
        if (address.address !== "") {
            const { status } = await deploySC(name, symbol, baseuri, features, access, license);
            setStatus(status);
        }
        else {
            setStatus("🦊 Connect to Metamask, 👻 Phantom, or any other wallet using the top right buttons.");
            window.alert("You're not currently connected to your wallet.");
        }
    };

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
                            <form>
                                <div class="form-group" >
                                    <label for="exampleInputName">Name *</label>
                                    <input type="text" class="form-control" id="exampleInputName" aria-describedby="NameHelp" placeholder="MyToken" onChange={(event) => setName(event.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputLink">Symbol *</label>
                                    <input type="text" class="form-control" id="exampleInputLink" placeholder="MTK" onChange={(event) => setSymbol(event.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputDesc">Base URI (optional)</label>
                                    <small id="DescHelp" class="form-text text-muted">Will be concatenated with token IDs to generate the token URIs.</small>
                                    <input type="text" class="form-control" id="exampleInputBaseUri" placeholder="https://..." onChange={(event) => setBaseURI(event.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Features (optional)</label>
                                    <small id="DescHelp" class="form-text text-muted">You can choose the features that you want to add to your smart contractfrom the list below.</small>
                                    {/* checkboxes with multiple choices allowed */}
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Access Control *</label>
                                    <small id="DescHelp" class="form-text text-muted">Control how/who has access to your smart contract.</small>
                                    <label>
                                        <input type="radio" id="ownable_hover" value="Ownable" />
                                        &nbsp;&nbsp; Ownable
                                    </label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" id="roles_hover" value="Roles" />
                                        &nbsp;&nbsp; Roles
                                    </label>
                                    <UncontrolledTooltip
                                        delay={0}
                                        placement="bottom"
                                        target="ownable_hover">
                                        Simple mechanism with a single account authorized for all privileged actions.
                                    </UncontrolledTooltip>
                                    <UncontrolledTooltip
                                        delay={0}
                                        placement="bottom"
                                        target="roles_hover">
                                        Flexible mechanism with a separate role for each privileged action. 
                                    </UncontrolledTooltip>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">License *</label>
                                    <input type="text" class="form-control" id="exampleInputName" aria-describedby="NameHelp" placeholder="MIT" onChange={(event) => setLicense(event.target.value)} />
                                </div>
                                <br />
                                <button type="button" class="btn btn-primary" onClick={onDeployPressed}><i className="tim-icons icon-check-2" /> &nbsp;&nbsp; Deploy Smart Contract</button>
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