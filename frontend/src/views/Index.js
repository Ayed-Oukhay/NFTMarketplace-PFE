import React from "react";

import MainPage from "views/examples/LandingPage";
import MintNFT from "views/examples/MintNFT.js";

export default function Index() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  },[]);
  return (
    <>
      <MintNFT />
    </>
  );
}
