const createPortfolioModel = require("../modals/PortfolioContent.model");

module.exports = (db2) => {
	const PortfolioContent = createPortfolioModel(db2);

	const getPortfolioContent = async (req, res) => {
		try {
			const portfolioContent = await PortfolioContent.findOne();
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

	return { getPortfolioContent };
};
