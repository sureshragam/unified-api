const fs = require("fs");
const path = require("path");
const Product = require("../modals/Product.model");

const Data_Path = path.join(__dirname, "../data/ugaoo.json");
const generateResStructure = require("../utils/generateResStructure");

exports.getProducts = async (req, res) => {
	try {
		const data = await Product.find();
		res.status(200).json(generateResStructure(data));
	} catch (err) {
		console.error("Error fetching products:", err); // Log error to console
		res.status(500).json({
			status: "failed",
			message: "Internal server error",
		});
	}
};
exports.getProductById = async (req, res) => {
	const id = req.params.id;
	try {
		const product = await Product.findById(id);
		if (product) {
			res.status(200).json(generateResStructure(product));
		} else {
			res.status(404).json({
				status: "failed",
				message: "Product not found",
			});
		}
	} catch (err) {
		console.error("Error fetching product:", err); // Log error to console
		res.status(500).json({
			status: "failed",
			message: "Internal server error",
		});
	}
};

exports.getCategories = async (req, res) => {
	const uniqueCategories = await Product.distinct("category");
	res.status(200).json(generateResStructure(uniqueCategories));
};

exports.getProductsByCategory = async (req, res) => {
	const category = req.params.category.trim();
	if (category) {
		const products = await Product.find({ category: category });
		if (products.length > 0) {
			res.status(200).send(generateResStructure(products));
		} else {
			res.status(404).send({
				status: "failed",
				message: "Products not found",
			});
		}
	} else {
		res.status(400).json({
			status: "failed",
			message: "Please provide category",
		});
	}
};
exports.getBestSellers = async (req, res) => {
	const bestSellers = await Product.find({ bestseller: true });
	if (bestSellers.length > 0) {
		res.status(200).json(generateResStructure(bestSellers));
	} else {
		res.status(404).send({
			status: "failed",
			message: "Best sellers not found",
		});
	}
};
exports.getNewArrivals = async (req, res) => {
	const newArrivals = await Product.find({ new_arrival: true });
	if (newArrivals.length > 0) {
		res.status(200).send(generateResStructure(newArrivals));
	} else {
		res.status(404).send({
			status: "failed",
			message: "New arrivals not found",
		});
	}
};

exports.getBestPicks = async (req, res) => {
	const bestPicks = await Product.find({ best_pick: true });
	if (bestPicks.length > 0) {
		res.status(200).send(generateResStructure(bestPicks));
	} else {
		res.status(404).send({
			status: "failed",
			message: "Best picks not found",
		});
	}
};

exports.getProductBySearch = async (req, res) => {
	const search = req.query.q;
	if (!search) {
		res.status(400).send({
			status: "failed",
			message: "Please provide search query",
		});
	}
	const products = await Product.find({
		name: { $regex: search, $options: "i" },
	});
	if (products.length > 0) {
		res.status(200).send(generateResStructure(products));
	} else {
		res.status(404).send({
			status: "failed",
			message: "Products not found",
		});
	}
};
