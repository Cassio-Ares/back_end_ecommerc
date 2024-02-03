const express = require("express");
const connectDB = require("../middlewares/connectDB");
const router = express.Router();
const Products = require("../models/modelsProducts/product");

router.post("/products", connectDB, async (req, res) => {
  const {
    nameProduct,
    imgProduct,
    priceProduct,
    promotionalPrice,
    descriptionProduct,
    reviewsProduct,
    expirationDate,
    productStock,
    productCategory,
    productSupplier,
  } = req.body;

  try {
    const product = await Products.create( {
        nameProduct,
        imgProduct,
        priceProduct,
        promotionalPrice,
        descriptionProduct,
        reviewsProduct,
        expirationDate,
        productStock,
        productCategory,
        productSupplier,
      });

      return res.status(201).json(product);

  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: error.message });
  }
});

module.exports = router;
