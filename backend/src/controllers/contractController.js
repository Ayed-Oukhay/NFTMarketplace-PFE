const ContractModel = require('../models/contractModel');
const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
const UserController = require('../controllers/userController')
const express = require('express')
const router = express.Router();

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

        // ----------------- Fetching the compiled contract using ethers.js basing on the selected features by the user to deploy a custom contract -----------------
        const contract = await ethers.getContractFactory("noFeatures");
        // ----- if 1 feature was selected -----
        // if contractObject.features.length == 1 {
            // if contractObject.features[0] == 'Mintable' {}
            // else if contractObject.features[0] == 'Burnable' {}
            // else if contractObject.features[0] == 'Pausable' {}
        // }
        // ----- if 2 features were selected -----
        // else if contractObject.features.length == 2 {
            // if contractObject.features.includes('Mintable') && contractObject.features.includes('Burnable') {}
            // else if contractObject.features.includes('Mintable') && contractObject.features.includes('Pausable') {}
            // else if contractObject.features.includes('Pausable') && contractObject.features.includes('Burnable') {}
        // }
        // ----- if all features were selected -----
        // else if contractObject.features.length == 3 {}

        console.log('Deploying myContract...');
        const CustomSC = await contract.deploy(); // calling deploy() will return an async Promise that we can await on 
        await CustomSC.deployed();
        console.log(`Contract deployed to address: ${CustomSC.address}`);

        // --- Adding the newly deployed contract hash in the database and the user who created it ---
        // 1- Creating the contract object that we're going to save to our DB locally
        const deployedContract = {
            txHash: CustomSC.address.toString(),
            userAddress: contractObject.owner,
        }

        // axios.post('http://localhost:3000/create-smart-contract', deployedContract).then(res => {
        //     return {
        //         success: true,
        //         status: "✅ Check out your transaction on Polygonscan: https://mumbai.polygonscan.com/tx/"+res.data.txHash,
        //     }
        // }).catch((error) => {
        //     console.log(error)
        // });

        console.log("The following contract is being added to the DB : ")
        console.log(deployedContract);
        // 2- Adding it to the DB
        ContractModel.create(deployedContract, (error, data) => {
            if (error) {
                return error;
            } else {
                res.json(data);
                console.log(`Contract added to DB`);
                const deployer = deployedContract.userAddress;
                // --- Adding the newly deployed contract to it's owner's (user) table in the DB ---
                // 1- Getting all users in the DB
                UserModel.find((error, data) => {
                    if (error) {
                        return error;
                    } else {
                        for (obj in data) {
                            // 2- Getting the specific user that deployed the contract
                            if (data[obj].walletAddresses.includes(deployer.toString())) {
                                // 3- Adding the contract hash to the user's smartContracts array
                                UserModel.findByIdAndUpdate(data[obj]._id, {
                                    $addToSet: {
                                        smartContracts: deployedContract.txHash.toString()
                                    }
                                }, (error, data) => {
                                    if (error) {
                                        return next(error);
                                        console.log(error)
                                    } else {
                                        res.json(data)
                                        console.log('Smart contract address added successfully!')
                                    }
                                })
                            }
                        }
                    }
                })
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