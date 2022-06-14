// This file holds the definition of a BaseUser and a user type to store all files related to users
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	txHash: {
		// Ce hash sera toujours unique puisque c'est généré chaque fois automatiquement par la blockchain
		type: String,
		required: true,
	},
	userAddress: { // This is supposed to work as a foreign key, to link the contract to the user address that was used to deploy it (Still don't know how to do correctly...).
		type: String,
		required: true,
	},
});

var contract = new mongoose.model('Contract', schema);
module.exports = contract;