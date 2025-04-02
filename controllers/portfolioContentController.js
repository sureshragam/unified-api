exports.getPortfolioContent = (req, res) => {
	try {
		const portfolioContent = require("../data/portfolio.json");
		res.status(200).json({
			status: "success",
			data: portfolioContent,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal Server Error",
		});
	}
};
