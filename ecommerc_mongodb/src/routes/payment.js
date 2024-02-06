const express = require('express');
const connectDB = require('../middlewares/connectDB');
const Payment = require('../models/modelsOrders/formOfPayment');
const routes = express.Router();

routes.post('/formofpayment', connectDB, async (req, res) => {
    //#swagger.tags = ['Orders/ Payments']
    const {payment} = req.body;

    try {
        const formOfPayment = await Payment.create({payment});
        return res.status(200).json(formOfPayment);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
});

routes.get('/formofpayment', connectDB, async (req, res) => {
    //#swagger.tags = ['Orders/ Payments']
    
    try {
        const getPayment = await Payment.find();
    return res.status(200).json(getPayment);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
});

routes.get('/formofpayment/:id', connectDB, async (req, res) => {
    //#swagger.tags = ['Orders/ Payments']
      const {id} = req.params;

    try {
        const getOnePayment = await Payment.findById(id);
        return res.status(200).json(getOnePayment);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
});

routes.put('/formofpayment/:id', connectDB, async (req, res) => {
    //#swagger.tags = ['Orders/ Payments']
    const body = req.body;
    const {id} = req.params;

    try {
        const putPayment = await Payment.findByIdAndUpdate(id, body, {new: true});
        return res.status(200).json(putPayment);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
});

routes.delete('/formofpayment/:id', connectDB, async (req, res) => {
    //#swagger.tags = ['Orders/ Payments']
    const {id} = req.params;
    try {
        const deletePayment = await Payment.findByIdAndDelete(id);
        return res.status(200).json(deletePayment);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
});

module.exports = routes;