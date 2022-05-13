/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
// require("@nomiclabs/hardhat-ethers");
require("./scripts/deploy.js");
// require("@nomiclabs/hardhat-etherscan");

const { ALCHEMY_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://kovan.infura.io/v3/${ALCHEMY_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
  },
  polygonscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};
