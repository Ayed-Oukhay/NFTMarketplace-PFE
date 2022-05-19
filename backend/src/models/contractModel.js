// This file holds the definition of a BaseUser and a user type to store all files related to users
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	// We don't need to specify an Id, as by default, Mongoose adds an _id property to your schemas.
	// name: {
	// 	type: String,
	// 	required: true,
	// },
    // symbol: {
	// 	type: String,
	// 	required: true,
	// },
	// the base uri is where the nft's metadata resides
    // baseuri: {
	// 	type: String,
	// },
    // features: {
	// 	type: [String],
	// },
    // access: {
	// 	type: String,
	// 	required: true,
	// },
    // license: {
	// 	type: String,
	// 	required: true,
	// },
	txHash: {
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