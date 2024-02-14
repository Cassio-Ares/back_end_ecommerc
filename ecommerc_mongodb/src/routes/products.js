const express = require("express");
const connectDB = require("../middlewares/connectDB");
const router = express.Router();
const Products = require("../models/modelsProducts/product");
const authAdm = require("../middlewares/authAdm");

router.post("/products", authAdm ,  connectDB, async (req, res) => {
  //#swagger.tags = ['Product']
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

    return res.status(201).json(product);

  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: error.message });
  }
});

router.get('/products', connectDB, async (req, res) => {
    //#swagger.tags = ['Product']
     try {
      const products = await Products.find().populate('Category', 'category').populate('Supplier', 'name').exec();
      return res.status(200).json(products);
     } catch (error) {
      console.error(error);
      return res.status(404).json({ message: error.message });
     }
});

router.get('/products/:id', connectDB, async (req, res) =>{
    //#swagger.tags = ['Product']
    const {id} = req.params;

    try {
      const getProduct = await Products.findById(id).populate('Category', 'category').populate('Supplier', 'name').exec();
      return res.status(200).json(getProduct);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: error.message });
    }
});

router.put('/products/:id', authAdm, connectDB, async(req, res)=>{
    //#swagger.tags = ['Product']
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
  const {id} = req.params;

  try {
   
    if(req.body.nameProduct === '' || req.body.priceProduct === '' || req.body.descriptionProduct === '' || req.body. expirationDate === '' || req.body.productStock === '' ){
      throw new Error("Todos os campos tem que estar devidamente preenchidos para alterar o Produto")
    }

   
   if(!/^\d{1,3}(,\d{3})*(\.\d{2})?$/.test(req.body.priceProduct)){
       throw new Error("Verifique os dados este campo só aceita numeros, pontos e virgulas")
   }

   if(!/^\d{1,3}(,\d{3})*(\.\d{2})?$/.test(req.body.promotionalPrice)){
    throw new Error("Verifique os dados este campo só aceita numeros, pontos e virgulas")
}

    const updateProduct = await Products.findByIdAndUpdate(id, {
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
    }, {new: true});
    return res.status(200).json({updateProduct});
  } catch (error) {
    console.error(error);
      return res.status(404).json({ message: error.message });
  }
});

router.delete('/products/:id', authAdm , connectDB, async (req, res) => {
    //#swagger.tags = ['Product']
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
