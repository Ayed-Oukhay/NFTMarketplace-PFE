const { task } = require("hardhat/config");
const { getAccount } = require("./helpers.js");

task("deploy", "Deploys the smart contract ...").setAction(async function (taskArguments, hre) {
    const myContractFactory = await hre.ethers.getContractFactory("myContract", getAccount());
    console.log('Deploying myContract...');
    const contract = await myContractFactory.deploy();
    await contract.deployed();
    console.log(`Contract deployed to address: ${contract.address}`);
});
// const { ethers } = require("hardhat/config");

// async function main() {

//     // Get our account (as deployer) to verify that a minimum wallet balance is available
//     //const [deployer] = await ethers.getSigners();

//     //console.log(`Deploying contracts with the account: ${deployer.address}`);
//     //console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

//     // Fetch the compiled contract using ethers.js
//     const contract = await ethers.getContractFactory("myContract");
//     // calling deploy() will return an async Promise that we can await on 
//     const CustomSC = await contract.deploy();
//     console.log(`Contract deployed to address: ${CustomSC.address}`);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     }); 