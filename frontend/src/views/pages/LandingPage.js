import React from "react";
import "./LandingPage.css";
import NFTCard from "../../components/NFTCard/NFTCard";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Navbar from "components/Navbars/MainNavbar.js";
import Footer from "components/Footer/Footer.js";

//import bigChartData from "variables/charts.js";

export default function LandingPage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  return (
    <>
      {/* --------------- Begin Navbar --------------- */}
      <Navbar />
      {/* --------------- End Navbar --------------- */}

      <div className="wrapper">
        {/* --------------- Begin Intro Section --------------- */}
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png").default}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png").default}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png").default}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png").default}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png").default}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png").default}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  The first Tunisian <br />
                  <span className="text-white">NFT Marketplace</span>
                </h1>
                <p className="text-white mb-3">
                  Explore, Create and Trade NFTs on the blockchain. From digital artwork to real estate-based NFTs,
                  you can find the perfect crypto collectibles and non-fungible tokens (NFTs) on TNM.
                </p>
              </Col>
              <Col lg="4" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/etherum.png").default}
                />
              </Col>
            </Row>
          </div>
        </div>
        {/* --------------- End Intro Section --------------- */}

        {/* --------------- Begin Some NFTs --------------- */}
        <section className="section section-lg">
          <section className="section">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png").default}
            />
            <Container>
              <Row className="row-grid justify-content-between">
                <Col lg="20">
                  <h1 className="text-center">Popular NFTs</h1>
                  <Row className="row-grid justify-content-center">
                    <Col lg="3">
                      <div className="info">
                        <NFTCard />
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <NFTCard />
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <NFTCard />
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <NFTCard />
                      </div>
                    </Col>
                  </Row>
                  <Row className="row-grid justify-content-center">
                    <Col lg="3">
                      <div className="info">
                        <NFTCard />
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <NFTCard />
                      </div>
                    </Col><Col lg="3">
                      <div className="info">
                        <NFTCard />
                      </div>
                    </Col><Col lg="3">
                      <div className="info">
                        <NFTCard />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </section>
        {/* --------------- End Some NFTs --------------- */}

        {/* --------------- Begin Categories --------------- */}
        <section className="section section-lg">
          <section className="section">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png").default}
            />
            <Container>
              <Row className="row-grid justify-content-between">
                <Col className="mt-lg-5" md="5">
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-palette text-warning" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">3,237</CardTitle>
                                <p />
                                <p className="card-category">Digital Artwork</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats upper bg-default">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-camera-18 text-white" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">3,653</CardTitle>
                                <p />
                                <p className="card-category">Photography</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-heart-2 text-info" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">593</CardTitle>
                                <p />
                                <p className="card-category">Charity</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <div className="pl-md-5">
                    <br /><br /><br />
                    <h1>
                      Browse Categories
                    </h1>
                    <p>
                      Our Mission on TNM is for creators to be able to transform anything
                      they wish to sell into a digital asset as an NFT.
                    </p>
                    <br />
                    <p>
                      We also seek to have a large arsenal of supported blockchains, so that creators who own multiple wallets can easily upload and sell their NFTs
                      on the same Marketplace.
                    </p>
                    <br />
                    <a
                      className="font-weight-bold text-info mt-5"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Show all NFTs{" "}
                      <i className="tim-icons icon-minimal-right text-info" />
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </section>
        {/* --------------- End Categories --------------- */}

        {/* --------------- Begin How it works --------------- */}
        <section className="section section-lg">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png").default}
          />
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <h1 className="text-center">How it works</h1>
                <Row className="row-grid justify-content-center">
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="tim-icons icon-wallet-43" />
                      </div>
                      <h4 className="info-title">Set up your wallet(s)</h4>
                      <hr className="line-primary" />
                      <p>
                        Before you can add or create your NFT, you need to add at least one wallet to your account.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-warning">
                        <i className="tim-icons icon-single-copy-04" />
                      </div>
                      <h4 className="info-title">Choose a smart contract or create your own</h4>
                      <hr className="line-warning" />
                      <p>
                        You can choose between deploying your NFT on TNM's own deployed smart contract or your own custom smart contract.
                      </p> 
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-info">
                        <i className="tim-icons icon-upload" />
                      </div>
                      <h4 className="info-title">Create your NFT</h4>
                      <hr className="line-info" />
                      <p>
                        You can easily create your NFT simply by filling the creation form.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-success">
                        <i className="tim-icons icon-coins" />
                      </div>
                      <h4 className="info-title">List your NFTs</h4>
                      <hr className="line-success" />
                      <p>
                        Once created, you can sell your NFTs on the Marketplace by simply listing them, adding a price and that's it, you're good to go.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        {/* --------------- End How it works --------------- */}

        {/* <section className="section section-lg section-safe">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path5.png").default}
          />
          <Container>
            <Row className="row-grid justify-content-between">
              <Col md="5">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/chester-wade.jpg").default}
                />
                <Card className="card-stats bg-danger">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">100%</CardTitle>
                        <p className="card-category text-white">Safe</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-stats bg-info">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">573 K</CardTitle>
                        <p className="card-category text-white">
                          Satisfied customers
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-stats bg-default">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">10 425</CardTitle>
                        <p className="card-category text-white">Business</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <div className="px-md-5">
                  <hr className="line-success" />
                  <h3>Awesome features</h3>
                  <p>
                    The design system comes with three pre-built pages to help
                    you get started faster. You can change the text and images
                    and you're good to go.
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div className="icon icon-success mb-2">
                          <i className="tim-icons icon-vector" />
                        </div>
                        <div className="ml-3">
                          <h6>Carefully crafted components</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div className="icon icon-success mb-2">
                          <i className="tim-icons icon-tap-02" />
                        </div>
                        <div className="ml-3">
                          <h6>Amazing page examples</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div className="icon icon-success mb-2">
                          <i className="tim-icons icon-single-02" />
                        </div>
                        <div className="ml-3">
                          <h6>Super friendly support team</h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section> */}
        {/* <section className="section section-lg">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png").default}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png").default}
          />
          <Col md="12">
            <Card className="card-chart card-plain">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <hr className="line-info" />
                    <h5 className="card-category">Total Investments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={bigChartData.data}
                    options={bigChartData.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </section> */}
        {/* <section className="section section-lg section-coins">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path3.png").default}
          />
          <Container>
            <Row>
              <Col md="4">
                <hr className="line-info" />
                <h1>
                  Choose the coin{" "}
                  <span className="text-info">that fits your needs</span>
                </h1>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/bitcoin.png").default}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Light Coin</h4>
                        <span>Plan</span>
                        <hr className="line-primary" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>50 messages</ListGroupItem>
                        <ListGroupItem>100 emails</ListGroupItem>
                        <ListGroupItem>24/7 Support</ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="primary">
                      Get plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/etherum.png").default}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Dark Coin</h4>
                        <span>Plan</span>
                        <hr className="line-success" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>150 messages</ListGroupItem>
                        <ListGroupItem>1000 emails</ListGroupItem>
                        <ListGroupItem>24/7 Support</ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="success">
                      Get plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/ripp.png").default}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Bright Coin</h4>
                        <span>Plan</span>
                        <hr className="line-info" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>350 messages</ListGroupItem>
                        <ListGroupItem>10K emails</ListGroupItem>
                        <ListGroupItem>24/7 Support</ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="info">
                      Get plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </section> */}

        {/* --------------- Begin Footer --------------- */}
        <Footer />
        {/* --------------- End Footer --------------- */}
      </div>
    </>
  );
}
