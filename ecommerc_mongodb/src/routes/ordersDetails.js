const express = require("express");
const connectDB = require("../middlewares/connectDB");
const Details = require("../models/modelsOrders/orderDetails");
const Products = require("../models/modelsProducts/product");
const authAdm = require("../middlewares/authAdm");
const routes = express.Router();

routes.post("/ordersdetails", connectDB, async (req, res) => {
  //#swagger.tags = ['Orders/OrderDetails']
  const { products, quantityOfProduct, formOfPayment } = req.body;

  try {
    const populatedProducts = await Products.find(
      { _id: { $in: products } },
      "nameProduct priceProduct productStock"
    );

    const unitPrices = await Promise.all(
      populatedProducts.map(async (product, index) => {
        const unitPrice = product.priceProduct;
        const quantity = quantityOfProduct[index];
        const total = unitPrice * quantity;
        const productStock = product.productStock - quantity;
        if (productStock < 0) {
          throw new Error("Estoque insuficente: " + product.nameProduct);
        }
        await Products.findByIdAndUpdate(product._id, {
          productStock: productStock,
        });
        return { unitPrice, total };
      })
    );

    const totalOrder = unitPrices.reduce(
      (sum, product) => sum + product.total,
      0
    );

    const orderDetails = await Details.create({
      products,
      quantityOfProduct,
      unitPrices,
      totalOrder,
      formOfPayment,
    });

    return res.status(200).json({ orderDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

routes.get("/ordersdetails",authAdm, connectDB, async (req, res) => {
  //#swagger.tags = ['Orders/OrderDetails']
  try {
    const getDetails = await Details.find().populate('products', 'nameProduct');
    return res.status(200).json(getDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});



routes.get("/ordersdetails/:id", authAdm , connectDB, async (req, res) => {
  //#swagger.tags = ['Orders/OrderDetails']
  const { id } = req.params;
  try {
    const getOneDetails = await Details.findById(id).populate('products', 'nameProduct');
    return res.status(200).json(getOneDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});


routes.delete("/ordersdetails/:id", authAdm , connectDB, async (req, res) => {
  //#swagger.tags = ['Orders/OrderDetails']
  const { id } = req.params;

  try {
    const deleteDetails = await Details.findByIdAndDelete(id);
    return res.status(200).json(deleteDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});

module.exports = routes;
