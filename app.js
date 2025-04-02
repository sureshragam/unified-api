const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: "Too many requests, please try again later.",
	skip: (req) => req.path === "/api", // Exclude health check route
});

const ProductsRoute = require("./routes/productsRoute");
const PortfolioContentRoute = require("./routes/portfolioContentRoute");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(limiter);

app.use("/api/v1/ugaoo/products", ProductsRoute);
app.use("/api/v1/portfolio/content", PortfolioContentRoute);
app.use(errorHandler);

module.exports = app;
