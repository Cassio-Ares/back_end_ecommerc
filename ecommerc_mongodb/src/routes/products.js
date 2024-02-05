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
    Category,
    Supplier,
  } = req.body;

  try {
    const product = await Products.create({
      nameProduct,
      imgProduct,
      priceProduct,
      promotionalPrice,
      descriptionProduct,
      reviewsProduct,
      expirationDate,
      productStock,
      Category,
      Supplier,
    });

    //TO DO
    const populatedProduct = await Products.findById(product._id)
    .populate({
      path: 'Supplier',
      select: 'name' 
    })
    .exec();

    return res.status(201).json(populatedProduct);

  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: error.message });
  }
});

router.get('/products', connectDB, async (req, res) => {
     try {
      const products = await Products.find();
      return res.status(200).json(products);
     } catch (error) {
      console.error(error);
      return res.status(404).json({ message: error.message });
     }
});

router.get('/products/:id', connectDB, async (req, res) =>{
    const {id} = req.params;

    try {
      const getProduct = await Products.findById(id);
      return res.status(200).json(getProduct);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: error.message });
    }
});

router.put('/products/:id', connectDB, async(req, res)=>{
  const body = req.body;
  const {id} = req.params;

  try {
    const updateProduct = await Products.findByIdAndUpdate(id, body, {new: true});
    return res.status(200).json({updateProduct});
  } catch (error) {
    console.error(error);
      return res.status(404).json({ message: error.message });
  }
});

router.delete('/products/:id', connectDB, async (req, res) => {
  const {id} = req.params

  try {
    const deleteProduct = await Products.findByIdAndDelete(id);
    res.status(200).json({deleteProduct});
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: error.message });
  }
})

module.exports = router;
