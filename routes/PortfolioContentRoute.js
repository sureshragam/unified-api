const express = require("express");

const {
	getPortfolioContent,
} = require("../controllers/portfolioContentController");

const PortfolioContentRoute = express.Router();

PortfolioContentRoute.get("/", getPortfolioContent); // API to get all portfolio content data from portfolio.json file)

module.exports = PortfolioContentRoute;
