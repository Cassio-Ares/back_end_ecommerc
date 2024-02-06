const express = require("express");
const connectDB = require("../middlewares/connectDB");
const Details = require("../models/modelsOrders/orderDetails");
const Products = require("../models/modelsProducts/product");
const routes = express.Router();

routes.post("/ordersdetails", connectDB, async (req, res) => {
  //#swagger.tags = ['Orders/orderDetails']
  const { products, quantityOfProduct, formOfPayment } = req.body;

  const populatedProducts = await Products.find(
    { _id: { $in: products } },
    "nameProduct priceProduct productStock"
  );

  const unitPrices = populatedProducts.map((product, index) => {
    const unitPrice = product.priceProduct;
    const quantity = quantityOfProduct[index];
    const total = unitPrice * quantity;
    const stock = product.productStock -= quantity;
    Products.findByIdAndUpdate(product._id, stock)
    return { unitPrice, total };
  });

  const totalOrder = unitPrices.reduce(
    (sum, product) => sum + product.total,
    0
  );

  try {
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
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});

routes.get("/ordersdetails", connectDB, async (req, res) => {
  //#swagger.tags = ['Orders/orderDetails']
   try {
    const getDetails = await Details.find();
     return res.status(200).json(getDetails)
   } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
   }
  
});

routes.get("/ordersdetails/:id", connectDB, async (req, res) => {
  //#swagger.tags = ['Orders/orderDetails']
  const {id} = req.params
  try {
    const getOneDetails = await Details.findById(id);
    return res.status(200).json(getOneDetails);
  } catch (error) {
     console.error(error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});

routes.put("/ordersdetails", connectDB, async (req, res) => {
  //#swagger.tags = ['Orders/orderDetails']
  const body = req.body;
  const {id} = req.params

 try {
    const putOneDetails = await Details.findByIdAndUpdate(id, body, {new: true});
    return res.status(200).json(putOneDetails);
 } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
 }
});

routes.delete("/ordersdetails", connectDB, async (req, res) => {
    //#swagger.tags = ['Orders/orderDetails']
    const {id} = req.params;

    try {
        const deleteDetails = await Details.findByIdAndDelete(id)
        return res.status(200).json(deleteDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao processar a solicitação." });
    }
  });

module.exports = routes;
