const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/errorHandler");

const createApp = (db1, db2) => {
	const app = express();

	const limiter = rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
		message: "Too many requests, please try again later.",
		skip: (req) => req.path === "/api",
	});

	app.use(express.json());
	app.use(cors());
	app.use(morgan("dev"));
	app.use(limiter);

	const ProductsRoute = require("./routes/productsRoute")(db1);
	const PortfolioContentRoute = require("./routes/portfolioContentRoute")(db2);

	app.use("/api/v1/ugaoo/products", ProductsRoute);
	app.use("/api/v1/portfolio/content", PortfolioContentRoute);

	app.use(errorHandler);

	return app;
};

module.exports = createApp;
