const ContractModel = require('../models/contractModel')

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