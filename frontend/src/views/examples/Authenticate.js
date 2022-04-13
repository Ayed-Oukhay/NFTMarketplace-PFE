import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthForm from "./AuthenticationForm";
import {
  Button, Card, CardHeader, DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

import Web3 from 'web3';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Modals = (props) => {

  // ------ Wallet connection vars ------
  const [isConnecting, setIsConnecting] = useState(false); //used to check if the user is connecting or not to display different messages
  const [isConnected, setIsConnected] = useState(false); // we'll use this to check if the user is connected or not
  const [currentAccount, setCurrentAccount] = useState(null); // We'll use this to get the Metamask connected account
  const [currentBalance, setCurrentBalance] = useState(0); // We'll use this to get the account balance of the connected user
  // ------------------------------------
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ---------------- For compatibility reasons, we need to check the version of the provider (Metamask) because some browsers still use window.web3 instead of window.ethereum --------------------------
  const detectProvider = () => {
    let provider;
    // ----- Checking Polygon (Ethereum) provider -----
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.solana && window.solana.isPhantom) { // ----- Checking Solana provider-----
      provider = window.solana;
    } else if (window.tronWeb) {
      provider = window.tronWeb;
    } else if (window.web3) { // ----- Checking Web3 general provider-----
      provider = window.web3.currentProvider;
    } else { // ----- If no provider is found -----
      window.alert("No wallet browser-extension detected! check out your browser extensions!");
    }
    return provider;
  }
  // ---------------------------------------------------------------------------------------------------------------

  // ********************************* Metamask Connection (Once clicked, this function will change the status of the user to Connected!) *********************************
  const AuthBtnClick = async () => {
    const provider = detectProvider();
    // Initalizing web3
    const web3 = new Web3(provider);
    if (provider) {

      // ------------------- Cheking if Metamask is installed and detected ------------------- 
      if (provider !== window.ethereum) {
        console.error("Not window.ethereum provider. Do you have multiple wallet installed ?");
      }

      setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });

      // ------------------- Getting our Metamask account -------------------
      const accounts = await web3.eth.getAccounts();

      // ------------------- checking if we're actually connected to Metamask -------------------
      if (accounts.length === 0) {
        console.log("Please make sure you're connected to Metamask!");
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        console.log("Account changed to: " + accounts[0]);

        // ------------------- Getting the current balance -------------------
        const accBalance = web3.utils.fromWei(
          await web3.eth.getBalance(accounts[0]),
          "ether"
        );
        setCurrentBalance(Number(accBalance).toFixed(6));
        console.log("Balance changed to: " + accBalance);
        setIsConnected(true);
      }

      // ------------------- Creating the user and adding it to the database -------------------
      // const web3 = new Web3(provider);
      // const accounts = await web3.eth.getAccounts()
      // const userObject = {
      //   publicAddress: accounts[0]
      // };
      // axios.post('http://localhost:7000/user', userObject).then((res) => {
      //   console.log(res.data)
      // }).catch((error) => {
      //   console.log(error)
      // });

      setIsConnecting(false);
      // props.onLogin(provider);
    }
  };
  // ********************************* End Metamask Connection ******************************************

  return (
    <div>
      <Button onClick={handleOpen} className="nav-link d-none d-lg-block" color="secondary" type="button" style={{ width: 110 }}><i className="tim-icons icon-wallet-43" />Connect</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style}>
          <Card className="bg-secondary shadow border-0" >
            <CardHeader className="bg-transparent pb-5">
              {/* -------------------- Wallet sign in -------------------- */}
              <div className="text-center text-muted mb-4">
                <small>Sign in via Wallets</small>
              </div>
              <center>
                <UncontrolledDropdown>
                  <center>
                    <DropdownToggle caret color="default">
                      <img alt="..." src={require("../../assets/img/wallets.png").default} style={{ width: 40, height: 40 }} />
                      Select a wallet
                    </DropdownToggle>
                  </center>
                  <DropdownMenu>
                    <li>
                      {/* -------------- Metamask Login btn -------------- */}
                      <DropdownItem href="#pablo" onClick={AuthBtnClick}>
                        <img alt="..." src={require("../../assets/img/metamask_logo.png").default} style={{ width: 40, height: 40 }} />
                        Metamask
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                        <img alt="..." src={require("../../assets/img/phantom_logo.png").default} style={{ width: 40, height: 40 }} />
                        Phantom
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                        <img alt="..." src={require("../../assets/img/tronlink_logo.png").default} style={{ width: 40, height: 40 }} />
                        TronLink
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                        <img alt="..." src={require("../../assets/img/Blocto_logo.png").default} style={{ width: 33, height: 40 }} />
                        Blocto
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </center>

              {/* -------------------- Classic form sign in -------------------- */}
              <AuthForm />

              {/* -------------------- Social Media sign in -------------------- */}
              <div className="text-muted text-center mt-2 mb-3">
                <small>Or sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button className="btn-neutral btn-icon" color="default" href="#" style={{ width: 40, height: 40, background: "none" }}>
                  <span className="btn-inner--icon">
                    <img alt="..." src={require("../../assets/img/github.png").default} />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button className="btn-neutral btn-icon" color="default" href="#" style={{ width: 40, height: 40, background: "none" }}>
                  <span className="btn-inner--icon">
                    <img alt="..." src={require("../../assets/img/google.png").default} />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
                <Button className="btn-neutral btn-icon" color="default" href="#" style={{ width: 40, height: 40, background: "none" }}>
                  <span className="btn-inner--icon">
                    <img alt="..." src={require("../../assets/img/twitter.png").default} />
                  </span>
                  <span className="btn-inner--text">Twitter</span>
                </Button>
              </div>

            </CardHeader>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default Modals; 