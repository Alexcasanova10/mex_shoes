const express = require("express");
const productRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const enumBrand = ["Adidas","Nike","Puma","Reebok","Charly","Vans","Panam","Otras"];

productRoute.get(
  "/brand/:brand",
  asyncHandler(async (req, res) => { 
    const { brand } = req.params;
    const products = await Product.find({ brand });
    const totalProducts = products.length;
    res.json({ products, total: totalProducts });
  })
);  

productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const { sort } = req.query;
    const sortOrder = sort === "desc" ? -1 : 1; 

    const products = await Product.find({ status_Active: true }).sort({ price: sortOrder });
        
    const totalProducts = await Product.countDocuments({ status_Active: true });

    res.json({ products, total: totalProducts });
  })
);


productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

module.exports = productRoute;

 