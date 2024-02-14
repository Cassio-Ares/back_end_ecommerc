const express = require('express');
const connectDB = require('../middlewares/connectDB');
const Client =require('../models/modelsClient/client');
const OrderDetails = require('../models/modelsOrders/orderDetails');
const OrderStatus = require('../models/modelsOrders/orderStatus');
const Orders = require('../models/modelsOrders/orders');
const authAdm = require('../middlewares/authAdm');
const routes = express.Router();


routes.post('/orders', connectDB, async (req, res) => {
    //#swagger.tags= ['Orders']

    let {client, orderDetails, orderStatus} = req.body;

    try {

    client = await Client.findById(client);
    orderDetails = await OrderDetails.findById(orderDetails);
    orderStatus = await OrderStatus.findById(orderStatus);

    if(client === null){
        throw new Error("Precisamos do cadastro do cliente para finalizar seu pedido")
    }


    if(orderDetails === null){
        throw new Error("Verifique os detalhes do pedido")
    }

    if(orderStatus === null){
        throw new Error("O Status do pedido esta nulo")
    }

    const currentTimestamp = new Date();
    let deliveryDate = new Date(currentTimestamp.getTime() + (15 * 24 * 60 * 60 * 1000)); 

    let returnDeadline = new Date(deliveryDate.getTime() + (7 * 24 * 60 * 60 * 1000)); 
  

    const orders = await Orders.create({client, orderDetails,  orderStatus, deliveryDate, returnDeadline});

    return res.status(200).json(orders);

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }

});

routes.get('/orders', connectDB, async (req, res) => {
    //#swagger.tags= ['Orders']
        try {
            const orders = await Orders.find().populate('client').populate('orderDetails').populate('orderStatus').exec(); 
            return res.json(orders);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
});

routes.get('/orders/:id', connectDB, async (req, res) => {
    //#swagger.tags= ['Orders']
    const {id} = req.params;
    try {
        const getOneOrder = await Orders.findById(id).populate('client').populate('orderDetails').populate('orderStatus').exec();
        return res.status(200).json(getOneOrder);
    } catch (error) {
        return res.status(400).json({ error: err.message });
    }
})

routes.put('/orders/:id', connectDB, async (req, res) => {
     //#swagger.tags= ['Orders']
     let {orderStatus}= req.body;
     let {id} = req.params;

     try {
        if(orderStatus === null){
            throw new Error('Verifique o status');
        }
        const putOrders = await Orders.findByIdAndUpdate(id, {orderStatus}, {new: true});
        return res.status(200).json(putOrders)        
     } catch (error) {
        return res.status(400).json({ error: err.message });
     }
})

routes.delete('/orders/:id', connectDB, async (req, res) => {
     //#swagger.tags= ['Orders']
     const {id} = req.params;
     try {
        const deleteOrders = await Orders.findByIdAndDelete(id);
        return res.status(200).json(deleteOrders)
     } catch (error) {
        return res.status(400).json({ error: err.message });
     }
})


module.exports = routes;