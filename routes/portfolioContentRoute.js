const express = require("express");

module.exports = (db2) => {
	const { getPortfolioContent } =
		require("../controllers/portfolioContentController")(db2);

	const router = express.Router();

	router.get("/", getPortfolioContent); // You can add more routes if needed

	return router;
};
