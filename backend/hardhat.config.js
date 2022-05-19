/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("./scripts/deploy.js");
require("@nomiclabs/hardhat-etherscan");

const { MORALIS_POLYGON_KEY, POLYGONSCAN_API_KEY, ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: `${MORALIS_POLYGON_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};
