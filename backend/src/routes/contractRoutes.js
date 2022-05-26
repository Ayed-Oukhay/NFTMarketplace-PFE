const express = require('express')
const contractController = require('../controllers/contractController')
const router = express.Router();
const mongoose = require('mongoose');
const contract = require('../models/contractModel');


// ----------- Deploy a contract -------------
router.post('/', contractController.deploy);
// -------------------------------------------

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

// ----------- Delete contract -------------
router.route('/:id').delete((req, res, next) => {
    contract.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
// ------------------------------------


module.exports = router