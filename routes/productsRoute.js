const express = require('express');

const {getProducts,getProductById,getCategories,getProductsByCategory,getBestSellers,getBestPicks,getNewArrivals,getProductBySearch} = require('../controllers/productsController');

const  ProductsRoute = express.Router();

ProductsRoute.get('/', getProducts);  // API to get all products data from ugaoo.json file)
ProductsRoute.get('/categories',getCategories) // API to get all categories  from ugaoo.json file)
ProductsRoute.get('/category/:category', getProductsByCategory); // API to get products by category from ugaoo.json file)
ProductsRoute.get('/best-sellers', getBestSellers); // API to get best sellers products from ugaoo.json file)
ProductsRoute.get('/best-picks', getBestPicks); // API to get best picks products from ugaoo.json file)
ProductsRoute.get('/new-arrivals', getNewArrivals); // API to get new arrivals products from ugaoo.json file)
ProductsRoute.get('/search',getProductBySearch); // API to get products by search from ugaoo.json file)
ProductsRoute.get('/:id',getProductById);  // API to get product data by id from ugaoo.json file)


module.exports=ProductsRoute;