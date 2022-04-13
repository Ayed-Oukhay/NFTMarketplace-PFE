import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import MintNFT from "views/examples/MintNFT.js";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" render={(props) => <Index {...props} />} />
      <Route path="/mint-nft" render={(props) => <MintNFT {...props} />} />
      <Route path="/landing-page" render={(props) => <LandingPage {...props} />} />
      <Route path="/profile-page" render={(props) => <ProfilePage {...props} />} />
      <Redirect from="/" to="/components" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
