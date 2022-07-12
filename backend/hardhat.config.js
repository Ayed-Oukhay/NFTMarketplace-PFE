/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
// require("./scripts/deploy.js");
require("@nomiclabs/hardhat-etherscan");

const { ALCHEMY_POLYGON_KEY, POLYGONSCAN_API_KEY, ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.1",
    overrides: {
      "contracts/myContract.sol":{
        version: "0.8.1",
      },
      "contracts/onlyMintable.sol":{
        version: "0.8.1",
      },
      "contracts/onlyBurnable.sol":{
        version: "0.8.1",
      },
      "contracts/onlyPausable.sol":{
        version: "0.8.1",
      },
      "contracts/mintableBurnable.sol":{
        version: "0.8.1",
      },
      "contracts/mintablePausable.sol":{
        version: "0.8.1",
      },
      "contracts/burnablePausable.sol":{
        version: "0.8.1",
      },
      "contracts/noFeatures.sol":{
        version: "0.8.1",
      },
      "contracts/fullContract.sol":{
        version: "0.8.1",
      }
    }
  },
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: ALCHEMY_POLYGON_KEY,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};
