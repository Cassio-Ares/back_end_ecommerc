const express = require('express');
const connectDB = require('../middlewares/connectDB');
const Client =require('../models/modelsClient/client');
const OrderDetails = require('../models/modelsOrders/orderDetails');
const OrderStatus = require('../models/modelsOrders/orderStatus');
const Orders = require('../models/modelsOrders/orders');
const routes = express.Router();


routes.post('/orders', connectDB, async (req, res) => {
    //#swagger.tags= ['orders']

    let {client, orderDetails, orderStatus, deliveryDate, returnDeadline} = req.body;

    try {
        if (!client || !orderDetails) {
            return res.status(400).json({ error: "IDs do cliente, detalhes do pedido e status do pedido são obrigatórios" });
        }

    const clientExist = await Client.findById(client);
    const orderDetailsExist = await OrderDetails.findById(orderDetails);
    const orderStatusExist = await OrderStatus.findById(orderStatus || orderStatus.default);

    const currentTimestamp = new Date();
    deliveryDate = new Date(currentTimestamp.getTime() + (15 * 24 * 60 * 60 * 1000)); 

    returnDeadline = new Date(deliveryDate.getTime() + (7 * 24 * 60 * 60 * 1000)); 
  

    const orders = await Orders.create({clientExist, orderDetailsExist,  orderStatusExist, deliveryDate, returnDeadline});

    return res.status(200).json(orders);

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }

});

routes.get('/orders', connectDB, async (req, res) => {
    //#swagger.tags= ['orders']
        try {
            const orders = await Orders.find().populate("client orderDetails orderStatus");
            return res.json(orders);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
});

routes.get('/orders', connectDB, async (req, res) => {
    //#swagger.tags= ['orders']
})

routes.put('/orders', connectDB, async (req, res) => {
    //#swagger.tags= ['orders']
})

routes.delete('/orders', connectDB, async (req, res) => {
    //#swagger.tags= ['orders']
})


module.exports = routes;