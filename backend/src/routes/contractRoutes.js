const express = require('express')
const contractController = require('../controllers/contractController')
const router = express.Router();
const mongoose = require('mongoose');
const contract = require('../models/contractModel');

// ----------- Deploy a contract -------------
router.route('/').post((req, res, next) => {
    const contractObject = req.body;
    
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