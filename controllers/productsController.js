const fs = require('fs');
const path = require('path');

const Data_Path = path.join(__dirname, '../data/ugaoo.json');
const generateResStructure = require('../utils/generateResStructure');

let ugaooData = [];

fs.readFile(Data_Path, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    ugaooData= JSON.parse(data);
  }
})

exports.getProducts = (req, res) => {
  res.status(200).send(generateResStructure(ugaooData));
}
exports.getProductById = (req, res) => {
  const id = +req.params.id;
  const product = ugaooData.find((product) => product.id === id);
  if (product) {
    res.status(200).send(generateResStructure(product));
  } else {
    res.status(404).send({
      status: 'failed',
      message: 'Product not found'
    });
  }
}

exports.getCategories = (req, res) => {
  const categories = ugaooData.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];
  res.status(200).send(generateResStructure(uniqueCategories));
}

exports.getProductsByCategory = (req, res) => {
  const category = (req.params.category).trim();
  const products = ugaooData.filter((product) => product.category === category);
  if (products.length > 0) {
    res.status(200).send(generateResStructure(products));
  } else {
    res.status(404).send({
      status: 'failed',
      message: 'Products not found'
    });
  }
}
exports.getBestSellers = (req, res) => {
  const bestSellers = ugaooData.filter((product) => product.bestseller === true);
  if (bestSellers.length > 0) {
    res.status(200).send(generateResStructure(bestSellers));
  } else {
    res.status(404).send({
      status: 'failed',
      message: 'Best sellers not found'
    });
  }
}
exports.getNewArrivals = (req, res) => {
  const newArrivals = ugaooData.filter((product) => product.new_arrival === true);
  if (newArrivals.length > 0) {
    res.status(200).send(generateResStructure(newArrivals));
  } else {
    res.status(404).send({
      status: 'failed',
      message: 'New arrivals not found'
    });
  }
}

exports.getBestPicks = (req,res) => {
  const bestPicks = ugaooData.filter((product) => product.best_pick === true);
  if (bestPicks.length > 0) {
    res.status(200).send(generateResStructure(bestPicks));
  } else {
    res.status(404).send({
      status: 'failed',
      message: 'Best picks not found'
    });
  }
}

exports.getProductBySearch = (req, res) => {
  const search = req.query.q;
  if(!search){
    res.status(400).send({
      status: 'failed',
      message: 'Please provide search query'
    });
  }
  const products = ugaooData.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  if (products.length > 0) {
    res.status(200).send(generateResStructure(products));
  } else {
    res.status(404).send({
      status: 'failed',
      message: 'Products not found'
    });
  }
}