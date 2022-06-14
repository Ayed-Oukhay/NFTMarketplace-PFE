// This file holds the definition of a BaseUser and a user type to store all files related to users
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	// We don't need to specify an Id, as by default, Mongoose adds an _id property to your schemas.
	nonce: {
		type: Number,
		required: true,
		default: Math.floor(Math.random() * 1000000), // Initialize with a random nonce
	},
	walletAddresses: {
		type: [String],
		required: true,
		unique: true,
		lowercase: true
	},
    smartContracts: {
        type: [String],
        lowercase: true,
    },
    username: {
        type: String,
    },
	password: {
		type: String,
	},
	img:{
        type: String,
		default: "assets/img/default-user.png",
    },
	desc:{
		type: String,
	}
});

var user = new mongoose.model('User', schema);
module.exports = user;