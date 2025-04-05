const express = require("express");

module.exports = (db1) => {
	const {
		getProducts,
		getProductById,
		getCategories,
		getProductsByCategory,
		getBestSellers,
		getBestPicks,
		getNewArrivals,
		getProductBySearch,
	} = require("../controllers/productsController")(db1); // pass db1 to controllers

	const ProductsRoute = express.Router();

	ProductsRoute.get("/", getProducts);
	ProductsRoute.get("/categories", getCategories);
	ProductsRoute.get("/category/:category", getProductsByCategory);
	ProductsRoute.get("/best-sellers", getBestSellers);
	ProductsRoute.get("/best-picks", getBestPicks);
	ProductsRoute.get("/new-arrivals", getNewArrivals);
	ProductsRoute.get("/search", getProductBySearch);
	ProductsRoute.get("/:id", getProductById);

	return ProductsRoute;
};
