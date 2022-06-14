import React from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "../../views/pages/Authenticate";
//import { Redirect } from 'react-router-dom'
//import MintNFT from "../../views/examples/MintNFT";
import BlockchainSelectionModal from "../../views/pages/BlockchainSelection";
import * as fcl from "@onflow/fcl"; // used to call and configure the flow wallet (Blocto)

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
} from "reactstrap";

// *********************** Main function **************************************
export default function PageNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");

  // ------------------ Flow (Blocto) Wallet configuration used later in the authentication process ------------------
  fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org") // connect to Flow testnet
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn") // use Blocto testnet wallet
  // ------------------------------------------------------------------------------------------------------------------

  // Accessing the history instance created by React
  const history = useHistory();

  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-default");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };

  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };

  const onCollapseExited = () => {
    setCollapseOut("");
  };

  // Redirecting to the NFT minting page
  const MintNFTPage = () => {
    history.push("/mint-nft");
  };

  const CreateSmartContract = () => {
    // Checking if the user is currently connected to a wallet 
    // if wallet redirect to smart contract creation form
    // else alert "You're not currently connected to any wallet."
    // if (window.web3.eth.accounts.length > 0) {
    //   history.push("/create-smart-contract");
    // } else if (window.solana && window.solana.isPhantom) {
    //   history.push("/create-smart-contract");
    // } else if (fcl.currentUser().snapshot()) {
    //   history.push("/create-smart-contract");
    // } else { 
    //   window.alert("You need to be connected to at least one wallet to create a smart contract");
    // }
    history.push("/create-smart-contract");
  }

  // ********** Getting the current connected wallet address **********
  const onProfileClick = async () => {
    // ---------- Checking if the user is connected to the Polygon wallet ----------
    if (window.ethereum) { // Checking if metamask is even installed on the browser
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          console.log(addressArray[0]);
          history.push("/profile-page");
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        }
        else {
          window.alert("🦊   You're not currently connected, please connect to a wallet to continue");
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
  // **************************************************************************

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <img src={require("../../assets/img/logoTNM-01.png").default} alt="logo" style={{ width: 135, height: 50 }} />
          </NavbarBrand>

          <button aria-expanded={collapseOpen} className="navbar-toggler navbar-toggler" onClick={toggleCollapse}>
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  TNM•
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <UncontrolledDropdown>
              <DropdownToggle style={{ width: 110, height: 36, padding: 0 }}>
                <i className="tim-icons icon-planet" /> &nbsp; Explore
              </DropdownToggle>
              <DropdownMenu>
                <li>
                  <DropdownItem href="#" onClick={e => e.preventDefault()}>
                    All NFTs
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem href="#" onClick={e => e.preventDefault()}>
                    Artwork
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem href="#" onClick={e => e.preventDefault()}>
                    Photography
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem href="#" onClick={e => e.preventDefault()}>
                    Charity
                  </DropdownItem>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink tag={Link} to="/">
                About TNM
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/">
                TOP Sellers
              </NavLink>
            </NavItem>
            <NavItem>
              <BlockchainSelectionModal style={{ display: "flex", margin: "auto" }} />
            </NavItem>
            {/* <NavItem>
              <UncontrolledDropdown>
                <DropdownToggle style={{ width: 160, height: 37 }}>
                  <i className="tim-icons icon-spaceship" />
                  My NFT
                </DropdownToggle>
                <DropdownMenu>
                  <li>
                    <DropdownItem href="#" onClick={e => e.preventDefault()}>
                      Create NFT
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem onClick={MintNFTPage}>
                      Mint NFT
                    </DropdownItem> 
                  </li>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem> */}

            {/* <NavItem>
              <Modal style={{ display: "flex", margin: "auto" }} />
            </NavItem> */}


            <NavItem>
              <Button onClick={CreateSmartContract} className="nav-link d-none d-lg-block" color="secondary" type="button" style={{ width: 130 }}><i className="tim-icons icon-single-copy-04" />Create SC</Button>
            </NavItem>

            <NavItem>
              <Button onClick={onProfileClick} className="nav-link d-none d-lg-block" color="secondary" type="button">
                <img alt="..." src={require("../../assets/img/user.png").default} style={{ width: 30, height: 30 }} />
              </Button>

              {/* <UncontrolledDropdown>
                <DropdownToggle style={{ background: "none", padding: 0, marginTop: 5 }} >
                  <img alt="..." src={require("../../assets/img/user.png").default} style={{ width: 30, height: 30 }} />
                </DropdownToggle>
                <DropdownMenu>
                  <li>
                    <DropdownItem onClick={onProfileClick} tag="a">
                      Profile
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem href="#" onClick={e => e.preventDefault()}>
                      Log Out
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
