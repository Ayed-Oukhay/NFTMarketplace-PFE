const express = require('express')
const contractController = require('../controllers/contractController')
const router = express.Router();
const mongoose = require('mongoose');
const contract = require('../models/contractModel');
var web3 = require('web3');

// ----------- Deploy a contract -------------
router.route('/').post((req, res, next) => {
    // --- Getting the smart contract object passed from the frontend ---
    const contractObject = req.body;
    // --- Getting the wallet address of the connected user ---
    // const userAddress = 
    // --- The deploy script should take effect here to return the tx hash, save it to the database and return it to the fronend ---
    // new web3.eth.Contract(JSON.parse(contractObject.abi),
    // {
    //     from: userAddress,
    // })
    console.log(contractObject);
    // --- Adding the newly deployed contract hash in the database and the user who created it ---
    // contract.create(req.body, (error, data) => {
    //     if (error) {
    //         return next(error)
    //     } else {
    //         console.log(data)
    //         res.json(data)
    //     }
    // })
});
// ------------------------------------

// ----------- Get all user contracts -------------
router.route('/').get((req, res) => {
    contract.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
// ----------------------------------------------

// ----------- Get a specific contract by hash -------------
router.get('/:id', contractController.findOne);
// ---------------------------------------------


module.exports = router