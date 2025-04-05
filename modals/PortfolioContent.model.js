const mongoose = require("mongoose");

// Define flexible schema
const portfolioSchema = new mongoose.Schema({}, { strict: false });

// Export a function that takes a DB connection and returns the model
module.exports = (conn) =>
	conn.model("Portfolio", portfolioSchema, "Portfolio");
