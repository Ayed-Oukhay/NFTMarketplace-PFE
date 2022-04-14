import React from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "../../views/examples/Authenticate";
//import { Redirect } from 'react-router-dom'
//import MintNFT from "../../views/examples/MintNFT";

// reactstrap components
import {
  //Button,
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
} from "reactstrap";

export default function ExamplesNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
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
  const MintNFTPage = () => {
    history.push("/mint-nft");
  }
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <img src={require("../../assets/img/logoTNM-01.png").default} alt="logo" style={{ width: 135, height: 50 }} />
          </NavbarBrand>

          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
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
              <DropdownToggle style={{ width: 130, height: 36 }}>
                Explore
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
            </NavItem>

            <NavItem>
              <Modal style={{ display: "flex", margin: "auto" }} />
            </NavItem>

            <NavItem>
              <UncontrolledDropdown>
                <DropdownToggle style={{ background: "none" }} >
                  <img alt="..." src={require("../../assets/img/user.png").default} style={{ width: 30, height: 30 }} />
                </DropdownToggle>
                <DropdownMenu>
                  <li>
                    <DropdownItem href="#" onClick={e => e.preventDefault()}>
                      Profile
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem href="#" onClick={e => e.preventDefault()}>
                      Log Out
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
