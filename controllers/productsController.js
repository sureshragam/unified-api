const path = require("path");
const createProductModel = require("../modals/Product.model");
const generateResStructure = require("../utils/generateResStructure");

module.exports = (db1) => {
	const Product = createProductModel(db1);

	const getProducts = async (req, res) => {
		try {
			const data = await Product.find();
			res.status(200).json(generateResStructure(data));
		} catch (err) {
			console.error("Error fetching products:", err);
			res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	};

	const getProductById = async (req, res) => {
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
			console.error("Error fetching product:", err);
			res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	};

	const getCategories = async (req, res) => {
		const uniqueCategories = await Product.distinct("category");
		res.status(200).json(generateResStructure(uniqueCategories));
	};

	const getProductsByCategory = async (req, res) => {
		const category = req.params.category.trim();
		if (category) {
			const products = await Product.find({ category });
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

	const getBestSellers = async (req, res) => {
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

	const getNewArrivals = async (req, res) => {
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

	const getBestPicks = async (req, res) => {
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

	const getProductBySearch = async (req, res) => {
		const search = req.query.q;
		if (!search) {
			return res.status(400).send({
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

	return {
		getProducts,
		getProductById,
		getCategories,
		getProductsByCategory,
		getBestSellers,
		getBestPicks,
		getNewArrivals,
		getProductBySearch,
	};
};
