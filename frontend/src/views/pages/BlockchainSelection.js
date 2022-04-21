import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';

import { Button, Card, CardHeader } from "reactstrap";

import Web3 from 'web3';

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
    const history = useHistory();

    // ----------- If Polygon is selected as the wanted Blockchain ------------
    const PolygonSelected = async () => {
        //Checking if metamask is installed
        if (window.ethereum) {
            // if yes, checking if the user is connected and getting his account
            const provider = window.ethereum;
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            if (accounts.length < 1) { // if the user is not connected, requesting metamask authentication
                await provider.request({
                    method: "eth_requestAccounts",
                });
                // redirecting to the mint nft page
                history.push("/mint-nft");
            }
            else {
                history.push("/mint-nft");
            }
        } else {
            window.alert('You need to have Metamask installed to continue!');
        }
    }
    // --------------------------------------------------------------------------

    // ----------- If Solana is selected as the wanted Blockchain ------------
    const SolanaSelected = async () => {
        //Checking if Phantom is installed
        if (window.solana && window.solana.isPhantom) {
            // if yes, checking if the user is connected and getting his account
            const provider = window.solana;
            const account = await provider.connect();
            if (account===null) { // if the user is not connected, requesting phantom authentication)
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
                                        <Button className="btn-icon btn-2" color="default" type="button" style={{ width: 100, marginBottom: 20 }}> Select </Button>
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
                                        <Button className="btn-icon btn-2" color="default" type="button" style={{ width: 100, marginBottom: 20 }}> Select </Button>
                                    </center>
                                </Card>
                            </center>
                        </CardHeader>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}

export default BlockchainSelectionModal; 