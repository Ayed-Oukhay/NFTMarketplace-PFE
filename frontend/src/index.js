import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";

import LandingPage from "views/pages/LandingPage";
//import LandingPage from "views/pages/LandingPage.js";
import ProfilePage from "views/pages/ProfilePage.js";
import MintNFT from "views/pages/MintNFT.js";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={(props) => <LandingPage {...props} />} />
      <Route path="/mint-nft" render={(props) => <MintNFT {...props} />} />
      <Route path="/profile-page" render={(props) => <ProfilePage {...props} />} />
      <Redirect to="/" />
    </Switch>
  </Router>,
  document.getElementById("root")
);