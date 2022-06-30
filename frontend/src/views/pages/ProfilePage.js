import React, { useEffect, useState } from "react";
import classnames from "classnames";
import PerfectScrollbar from "perfect-scrollbar"; // javascript plugin used to create scrollbars on windows
import { useHistory } from "react-router-dom";
import axios from 'axios';
import NftCard from './NFTCard';
import { fetchNFTs } from '../../utils/fetchNFTs.js';
// import TestModal from './NFTModal';

// ------------ reactstrap components ----------------
import {
  Card, Button, CardHeader, CardBody, Label, FormGroup, Form, Input, FormText, NavItem, NavLink, Nav,
  Table, TabContent, TabPane, Container, Row, Col, UncontrolledTooltip, UncontrolledCarousel, Modal
} from "reactstrap";

// ------------ core components ----------------
import Navbar from "components/Navbars/MainNavbar.js";
import Footer from "components/Footer/Footer.js";
import { Hidden } from "@mui/material";

require('dotenv').config();
const alchemykey = process.env.REACT_APP_ALCHEMY_KEY;

// ------------ Slider items ------------
const carouselItems = [
  {
    src: require("assets/img/denys.jpg").default,
    altText: "Slide 1",
    caption: "Big City Life, United States",
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg").default,
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States",
  },
  {
    src: require("assets/img/mark-finn.jpg").default,
    altText: "Slide 3",
    caption: "Stocks, United States",
  },
];
// ------------------------------------

let ps = null;

// ********* Beginning the main function *********
export default function ProfilePage() {
  const [tabs, setTabs] = React.useState(1);
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);

  // -------- Accessing the history instance created by React ------------
  const history = useHistory();

  // ------------ Creating a user instance to display the user data ------------
  const [userInfo, setUserInfo] = useState("");

  // ------------ State variables and handlers to display each NFT's properties ------------
  // const [NFTInfo, setNFTInfo] = useState([]);
  // const [showNFTModal, setShowNFTModal] = useState(false);
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleOpen = () => setShow(true);
  const [owner, setOwner] = useState("")
  const [contractAddress, setContractAddress] = useState("0x7a1C29e5462989dB8680AaF5b9c1FeD6BDC16303")
  const [NFTs, setNFTs] = useState("")
  // --------------------------------------------------------------------------------------

  // --------- Function to get the connected user's profile on page load-----------
  useEffect(async () => {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        // ------------- Getting the list of all the users in the DB -------------
        axios.get('http://localhost:7000/user').then((response) => {
          const users = response.data;
          //console.log(users)
          for (var i = 0; i < users.length; i++) {
            // ------------- Getting the specific user object from the DB -------------
            if (users[i].walletAddresses.includes(addressArray[0])) {
              // console.log("user found!")
              const FoundUser = users[i];
              // ------ Creating a user object ------
              let userObj = {
                nonce: FoundUser.nonce,
                username: FoundUser.username,
                walletAddresses: FoundUser.walletAddresses,
                description: FoundUser.desc,
                profilePicture: FoundUser.img,
                smartContracts: FoundUser.smartContracts,
              }
              // ------------------------------------
              setUserInfo(userObj);
              setOwner(userObj.walletAddresses)
            }
            else {
              console.log("User not found!");
            }
            // ------------------------------------------------------------------------
          }
        }).catch(error => console.error(`Error: ${error}`));
        // ------------------------------------------------------------------------  

        // --------------- Getting the NFTs of the connected user ---------------
        // --- fetching the alchemy (mumbai-testnet) api to get the NFTs of the connected user in a descending order (to get the latest added NFT) and waiting for the response ---
        // const api_resp = await fetch(`${alchemykey}/getNFTs/?owner=${addressArray[0]}`);
        // const nft_data = await api_resp.json();

        // --- Displaying the fetched NFTs in their dedicated section of the profile page ---
        // const nftContainer = document.getElementById("nftItems");
        // const assets = nft_data.ownedNfts;
        // if (assets.length === 0) { // if the user has no NFTs, return "You have no NFTs yet"
        //   return //...
        // }
        // else {
        //   assets.forEach((nft) => {
        //     // -------- Getting the NFT data from the api's response --------
        //     const { metadata: { image }, metadata: { name }, metadata: { description } } = nft; // we're using metadata:{prop} syntax because the information in the api response gets the name, image and description of the NFT metadata in a second-level key, so to access it we need to use that syntax 
        //     // -------- Listing the items in cards --------
        //     const newElement = document.createElement('div');
        //     newElement.innerHTML = `
        //         <div class="card d-flex mt-auto" style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); width: 260px; height:350px; float:left;">
        //           <center><img src='${image}' alt="Avatar" style="width:230px; height:180px; margin-top: 10px;" /></center>
        //             <div class="container" style="padding: 2px 16px;">
        //               <h4><b>${name}</b></h4>
        //               <p>${description}</p>
        //             </div>
        //             <div class="card-footer mt-auto align-self-end">
        //               <center><input type="submit" value="Display" style="width:230px;" onclick=${ModalContent()} ></center>
        //             </div>
        //         </div>
        //         `
        //     nftContainer.appendChild(newElement);
        //     // ---------------- Ending the list NFT ----------------
        //   })
        // }
        // --------------------------------- End of getting the NFTs of the connected user ---------------------------------
      }
      else {
        history.push("/");
        window.alert("Something went wrong, please verify that you are connected");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  // ----------------------------------------------------------------------------

  // ------------ Event to call show the NFT Modal on item click ------------
  // const nftEvents = {
  //   onClick: (e, nft) => {
  //     console.log("nft");
  //     setNFTInfo(nft);
  //     toggleTrueFlase();
  //   },
  // };

  // const toggleTrueFalse = () => {
  //   setShowNFTModal(handleOpen);
  // };

  // function ModalContent() {
  //   return (
  //     <Modal show={show} onHide={handleClose}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>{NFTInfo.name}</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         ...
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={handleClose}>Close</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   )
  // }
  // ------------------------------------------------------------------------

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png").default}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png").default}
          />
          <Container className="align-items-center">
            {/* --------------- Displaying the connected user's infos --------------- */}
            {/* {console.log(userInfo.profilePicture)} */}
            <Row>
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">{userInfo.username}</h1>
                <h5 className="text-on-back">{userInfo.nonce}</h5>
                <h4 className="title text-left">Address</h4>
                <h6 className="description text-left">{userInfo.walletAddresses}</h6>
                <br /><br />
                <p className="profile-description">
                  {userInfo.description}
                </p>

                <div className="btn-wrapper profile pt-3">
                  <Button
                    className="btn-icon btn-round"
                    color="twitter"
                    href="https://twitter.com/creativetim"
                    id="tooltip639225725"
                    target="_blank"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip639225725">
                    Follow us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="facebook"
                    href="https://www.facebook.com/creativetim"
                    id="tooltip982846143"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-square" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip982846143">
                    Like us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="dribbble"
                    href="https://dribbble.com/creativetim"
                    id="tooltip951161185"
                    target="_blank"
                  >
                    <i className="fab fa-dribbble" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip951161185">
                    Follow us
                  </UncontrolledTooltip>
                </div>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="ImageNotFound"
                      className="img-center img-fluid rounded-circle"
                      //src={require(`${userInfo.profilePicture}`)}
                      //src={userInfo.profilePicture}
                      src={require("assets/img/ayed.jpg").default}
                    />
                    <h4 className="title">Transactions</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pablo"
                        >
                          Wallet
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pablo"
                        >
                          Send
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pablo"
                        >
                          News
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">COIN</th>
                              <th className="header">AMOUNT</th>
                              <th className="header">VALUE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>BTC</td>
                              <td>7.342</td>
                              <td>48,870.75 USD</td>
                            </tr>
                            <tr>
                              <td>ETH</td>
                              <td>30.737</td>
                              <td>64,53.30 USD</td>
                            </tr>
                            <tr>
                              <td>XRP</td>
                              <td>19.242</td>
                              <td>18,354.96 USD</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* -------------------------------- End user infos --------------------------------- */}
          </Container>
        </div>
        {/* ------------------------------- User NFT List Section ------------------------------- */}

        {/* <div className="section">
          <Container>
            <Row className="justify-content-between" id="nftItems">
              <Col md="3">
                <h1 className="profile-title text-left">NFTs</h1>
                <h5 className="text-on-back">02</h5>
                <p className="profile-description text-left">
                  This collection of NFTs is a list of random NFTs that I have created for the purpose of this test
                </p>
              </Col>
            </Row>
            {showNFTModal ? ModalContent() : null}
          </Container>
        </div> */}

        <div className="section">
          <Container>
            <Row className="justify-content-between" id="nftItems">
              <Col md="3">
                <h1 className="profile-title text-left">NFTs</h1>
                <h5 className="text-on-back">02</h5>
                <p className="profile-description text-left">
                  This collection of NFTs is a list of random NFTs that I have created for the purpose of this test
                </p>
                <button className='py-2 btn-primary rounded-sm w-full hover:bg-slate-100' style={{ width: '250px' }} onClick={() => { fetchNFTs(owner, contractAddress, setNFTs) }}><i class="tim-icons icon-refresh-01" /> &nbsp; Load NFTs</button>
                <br /><br />
              </Col>
            </Row>
            {
              NFTs ? NFTs.map(NFT => {
                return (
                  <div>
                    <Container>
                      <Row className="justify-content-between" id="nftItems">
                        <Col md="3">
                          <NftCard image={NFT.media[0].gateway} id={NFT.id.tokenId} title={NFT.title} address={NFT.contract.address} description={NFT.description}></NftCard>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }) : <div>No NFTs found</div>
            }
          </Container>
        </div>
        {/* ------------------------------------------- End user NFTs list ----------------------------------------- */}

        <div className="section">
          <Container>
            <Row className="justify-content-between">
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <UncontrolledCarousel items={carouselItems} />
                </Row>
              </Col>
              <Col md="5">
                <h1 className="profile-title text-left">Projects</h1>
                <h5 className="text-on-back">03</h5>
                <p className="profile-description text-left">
                  With NFTs ranging from Photography, to digital artwork and mythical creatures such Pokemons, these are the NFTs that I have created for the purpose of this test.
                </p>
                <div className="btn-wrapper pt-3">
                  <Button
                    className="btn-simple"
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-book-bookmark" /> Bookmark
                  </Button>
                  <Button
                    className="btn-simple"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-bulb-63" /> Check it!
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
