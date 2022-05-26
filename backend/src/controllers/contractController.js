const ContractModel = require('../models/contractModel')

// var web3 = require('web3');
// const contractFile = require('');

const { ethers } = require("hardhat");

//const mycontract = require("../../contracts/myContract.sol");

// ----------- Get a specific contract by hash -------------
exports.deploy = async (req, res) => {
    try {
        // --- Getting the smart contract object passed from the frontend ---
        const contractObject = req.body;
        console.log(contractObject);

        // Fetch the compiled contract using ethers.js
        const contract = await ethers.getContractFactory("myContract");
        console.log('Deploying myContract...');
        // calling deploy() will return an async Promise that we can await on 
        const CustomSC = await contract.deploy();
        await CustomSC.deployed();
        console.log(`Contract deployed to address: ${CustomSC.address}`);

        // --- Adding the newly deployed contract hash in the database and the user who created it ---
        // 1- Creating the contract object that we're going to save to our DB locally
        const deployedContract = {
            txHash: CustomSC.address.toString(),
            userAddress: contractObject.owner,
        }
        // console.log(deployedContract);
        // 2- Adding it to the DB
        ContractModel.create(deployedContract, (error, data) => {
            if (error) {
                return next(error);
            } else {
                console.log(data);
                res.json(data);
                console.log(`Contract added to DB`);
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// ---------------------------------------------

// ----------- Get a specific contract by hash -------------
exports.findOne = async (req, res) => {
    try {
        const contract = await ContractModel.findById(req.params.id);
        res.status(200).json(contract);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// ---------------------------------------------