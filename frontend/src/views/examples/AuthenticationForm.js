import React from "react";
import classnames from "classnames";
// reactstrap components
import {
    Card,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    FormGroup, Form, Input, InputGroup, Button,
} from "reactstrap";

class Navs extends React.Component {
    state = {
        tabs: 1
    };
    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };
    render() {
        return (
            <>
                <div className="nav-wrapper">
                    <div className="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                    </div>
                    <Nav className="nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                        <NavItem>
                            <NavLink aria-selected={this.state.tabs === 1}
                                className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.tabs === 1
                                })}
                                onClick={e => this.toggleNavs(e, "tabs", 1)}
                                href="#pablo"
                                role="tab"
                            >
                                <i className="ni ni-cloud-upload-96 mr-2" />
                                Sign in
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                aria-selected={this.state.tabs === 2}
                                className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.tabs === 2
                                })}
                                onClick={e => this.toggleNavs(e, "tabs", 2)}
                                href="#pablo"
                                role="tab"
                            >
                                <i className="ni ni-bell-55 mr-2" />
                                Signup
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <Card className="shadow">
                    <CardBody style={{ background: "none" }}>
                        <TabContent activeTab={"tabs" + this.state.tabs}>
                            <TabPane tabId="tabs1">
                                <Form>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <Input id="exampleFormControlInput1" placeholder="name@example.com" type="email" style={{ color: "white" }} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <Input id="exampleFormControlInput1" placeholder="Password" type="password" style={{ color: "white" }} />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                                        <label className="custom-control-label" htmlFor=" customCheckLogin" >
                                            <span className="text-muted">Remember me</span>
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <Button className="my-4" color="primary" type="submit" >
                                            Sign in
                                        </Button>
                                    </div>
                                </Form>
                            </TabPane>
                            <TabPane tabId="tabs2">
                                <Form>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <Input id="exampleFormControlInput1" placeholder="Username" type="text" style={{ color: "white" }} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <Input id="exampleFormControlInput1" placeholder="name@example.com" type="email" style={{ color: "white" }} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <Input id="exampleFormControlInput1" placeholder="Password" type="password" style={{ color: "white" }} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <Input id="exampleFormControlInput1" placeholder="Confirm Password" type="password" style={{ color: "white" }} />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button className="my-4" color="primary" type="submit" >
                                            Sign up
                                        </Button>
                                    </div>
                                </Form>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </>
        );
    }
}

export default Navs;
