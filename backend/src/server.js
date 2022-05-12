/**
 * ----------------------- Required External Modules -----------------------
 * importing the project dependencies installed earlier and loading any environmental variables from the local .env file using the dotenv.config() method
 */

const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const UserRoute = require('./routes/userRoutes.js')

dotenv.config();

/**
 * ----------------------- App Variables -----------------------
 * checking if Node.js loaded the environmental variable PORT into process.env. 
 * If so, this parses its value as a number type and creates an instance of an Express application; otherwise, it exits the application
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT = process.env.PORT;

const app = express();

/**
*  ----------------------- DB Configuration and connection -----------------------
*/
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Databse Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

/**
 *  ----------------------- App Configuration -----------------------
 * mounting the middleware functions from the packages imported into this entry point module
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/user', UserRoute)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Server Activation
 * ----------------------- creating an Express server -----------------------
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});