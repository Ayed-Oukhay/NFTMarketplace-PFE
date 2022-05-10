import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";
import { Button, Card, CardHeader } from "reactstrap";
import Web3 from 'web3';
import * as fcl from "@onflow/fcl"; // used to call and configure the flow wallet (Blocto)

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BlockchainSelectionModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isConnected, setIsConnected] = useState(false);
    const history = useHistory();

    // ------------------ Flow (Blocto) Wallet configuration used later in the authentication process ------------------
    fcl.config()
        .put("accessNode.api", "https://access-testnet.onflow.org") // connect to Flow testnet
        .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn") // use Blocto testnet wallet
    // ------------------------------------------------------------------------------------------------------------------

    // ----------- If Polygon is selected as the wanted Blockchain ------------
    const PolygonSelected = async () => {
        if (window.ethereum) { // Checking if metamask is installed
            const provider = window.ethereum; // if yes, checking if the user is connected and getting his account
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            if (accounts.length < 1) { // if the user is not connected, requesting metamask authentication
                await provider.request({
                    method: "eth_requestAccounts",
                });
                history.push("/mint-nft"); // redirecting to the mint nft page
                setIsConnected(true);
            } else {
                history.push("/mint-nft");
                setIsConnected(true);
                console.log(accounts[0]);
            }
        } else {
            window.alert('You need to have Metamask installed to continue!');
        }
    }
    // --------------------------------------------------------------------------

    // ----------- If Solana is selected as the wanted Blockchain -----------
    const SolanaSelected = async () => {
        // Checking if the user is already connected to Metamask and if yes requesting to disconnect
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length >= 1) {
            window.alert('You are currently connected to another account, please disconnect from all other wallets to continue!');
        } else {
            if (window.solana && window.solana.isPhantom) { // Checking if Phantom is installed
                // if yes, checking if the user is connected and getting his account
                const provider = window.solana;
                const account = await provider.connect();
                if (account === null) { // if the user is not connected, requesting phantom authentication
                    const Add = account.publicKey.toString();
                    const userObject = {
                        publicAddress: Add
                    };
                    history.push("/mint-nft");
                } else {
                    history.push("/mint-nft");
                }
            } else {
                window.alert('You need to have Phantom installed to continue!');
            }
        }
    }
    // --------------------------------------------------------------------------

    // ----------- If Tron is selected as the wanted Blockchain -----------
    const TronSelected = async () => {
        // Checking if the user is already connected to Metamask or Phantom and if yes requesting to disconnect
        const Pol_web3 = new Web3(window.ethereum);
        const Pol_accounts = await Pol_web3.eth.getAccounts();
        if (Pol_accounts.length >= 1) {
            window.alert('You are currently connected to another account, please disconnect from all other wallets to continue!');
        } else {
            if (window.tronWeb && window.tronWeb.ready) { // Checking if Tronlink is installed
                // if yes, checking if the user is connected and getting his account
                const provider = window.tronWeb;
                const account = await provider.trx.getAccount(
                    window.tronWeb.defaultAddress.base58
                );
                console.log(account);
                if (account === false) { // if the user is not connected, requesting tronlink authentication
                    provider.request({
                        method: 'tron_requestAccounts'
                    });
                    // history.push("/mint-nft");
                } else {
                    history.push("/mint-nft");
                }
            } else {
                window.alert('You need to have Tronlink installed to continue!');
            }
        }
    }
    // --------------------------------------------------------------------------

    // ----------- If Flow is selected as the wanted Blockchain -----------
    const FlowSelected = async () => {
        // Checking if the user is already connected to Metamask or Phantom and if yes requesting to disconnect
        const Pol_web3 = new Web3(window.ethereum);
        const Pol_accounts = await Pol_web3.eth.getAccounts();
        if (Pol_accounts.length >= 1) {
            window.alert('You are currently connected to another account, please disconnect from all other wallets to continue!');
        }
        else {
            const user = await fcl.currentUser().snapshot();
            if (user.addr === null) {
                await fcl.authenticate()
                if (user.addr !== null) {
                    history.push("/mint-nft");
                } else {
                    window.alert('Authentication error!');
                }
            }
            else {
                history.push("/mint-nft");
                console.log(user.addr);
            }
        }
    }
    // --------------------------------------------------------------------------

    // ----------- Disconnecting from any connected wallet -----------
    // const Disconnect = async () => {
    //     const poly_provider = window.ethereum;
    //     const web3 = new Web3(poly_provider);
    //     const poly_account = await web3.eth.getAccounts();
    //     const sol_provider = window.solana;
    //     const sol_account = sol_provider.connect().publicKey.toString();
    //     const user = await fcl.currentUser().snapshot();
    //     // Disconnecting from Metamask
    //     if (poly_account.length > 1) {
    //         await web3.eth.currentProvider.disconnect();
    //         setIsConnected(false);
    //         window.alert("You have successfully been disconnected from Metamask!");
    //     }
    //     // Disconnecting from Phantom
    //     else if (sol_account !== "") {
    //         await sol_provider.disconnect();
    //         window.alert("You have successfully been disconnected from Phantom!");
    //         setIsConnected(false);
    //     }
    //     // Disconnecting from Tronlink
    //     // Disconnecting from Blocto
    //     else if (user.addr !== null) {
    //         await fcl.unauthenticate();
    //         window.alert("You have successfully been disconnected from Blocto!");
    //         setIsConnected(false);
    //     }
    //     // If the user is not connected to any wallet
    //     else {
    //         window.alert("You are not currently connected to any wallet!");
    //         setIsConnected(false);
    //     }
    // }
    // ------------------------------------------------------------

    return (
        <div>
            <Button onClick={handleOpen} className="nav-link d-none d-lg-block" color="secondary" type="button" style={{ width: 110 }}><i className="tim-icons icon-molecule-40" />Create</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <Card className="bg-secondary shadow border-0" >
                        <CardHeader className="bg-transparent pb-5">
                            <div className="text-muted mb-4">
                                <h2 style={{ color: "#304169" }}>Choose Blockchain
                                    <h5 style={{ color: "#6E6E6E" }}>Choose the most suitable blockchain for your needs. You need to sign in for creation.</h5>
                                </h2>
                            </div>
                            {/* -------------------- Blockchain Cards Section -------------------- */}
                            <center>
                                {/* ------------- Polygon Card ------------- */}
                                <Card className="bg-secondary shadow border-0" style={{ width: "10rem", float: "left", marginRight: 20, marginLeft: 10 }}>
                                    <center>
                                        <img alt="..." src={require("../../assets/img/polygon_logo.png").default} style={{ width: 50, height: 50, marginTop: 20 }} />
                                        <h4 style={{ color: "#304169" }}>Polygon</h4>
                                        <Button className="btn-icon btn-2" color="default" type="button" style={{ width: 100, marginBottom: 20 }} onClick={PolygonSelected}> Select </Button>
                                    </center>
                                </Card>
                                {/* ------------- Flow Card ------------- */}
                                <Card className="bg-secondary shadow border-0" style={{ width: "10rem", float: "left", marginRight: 20 }}>
                                    <center>
                                        <img alt="..." src={require("../../assets/img/flow_logo.png").default} style={{ width: 50, height: 50, marginTop: 20 }} />
                                        <h4 style={{ color: "#304169" }}>Flow</h4>
                                        <Button className="btn-icon btn-2" color="default" type="button" style={{ width: 100, marginBottom: 20 }} onClick={FlowSelected}> Select </Button>
                                    </center>
                                </Card>
                                {/* ------------- Solana Card ------------- */}
                                <Card className="bg-secondary shadow border-0" style={{ width: "10rem", float: "left" }}>
                                    <center>
                                        <img alt="..." src={require("../../assets/img/solana_logo.png").default} style={{ width: 50, height: 50, marginTop: 20 }} />
                                        <h4 style={{ color: "#304169" }}>Solana</h4>
                                        <Button className="btn-icon btn-2" color="default" type="button" style={{ width: 100, marginBottom: 20 }} onClick={SolanaSelected}> Select </Button>
                                    </center>
                                </Card>
                                {/* ------------- Tron Card ------------- */}
                                <Card className="bg-secondary shadow border-0" style={{ width: "10rem" }}>
                                    <center>
                                        <img alt="..." src={require("../../assets/img/tron_logo.png").default} style={{ width: 50, height: 50, marginTop: 20 }} />
                                        <h4 style={{ color: "#304169" }}>Tron</h4>
                                        <Button className="btn-icon btn-2" color="default" type="button" style={{ width: 100, marginBottom: 20 }} onClick={TronSelected}> Select </Button>
                                    </center>
                                </Card>
                                {/* ------------- Disconnect Button ------------- */}
                                {/* {isConnected ? <Button className="btn-icon btn-2" color="warning" type="button" style={{ width: 110, marginBottom: 20 }} onClick={Disconnect}> Disconnect </Button> : <Button className="btn-icon btn-2" color="warning" type="button" style={{ width: 110, marginBottom: 20 }} disabled> Disconnect </Button>} */}
                            </center>
                        </CardHeader>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}

export default BlockchainSelectionModal;