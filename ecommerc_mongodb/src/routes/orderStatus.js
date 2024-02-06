const express = require('express');
const connectDB = require('../middlewares/connectDB');
const Status = require('../models/modelsOrders/orderStatus');
const router = express.Router();


router.post('/status', connectDB, async (req, res) => {
    //#swagger.tags = ['Orders/StatusOrder']
    const { status } = req.body;

    try {
        const statusOrders = await Status.create({status});
        return res.status(201).json(statusOrders);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
});

router.get('/status',connectDB, async (req, res) => {
      //#swagger.tags = ['Orders/StatusOrder']

      try {
        const getStatus = await Status.find();
        return res.status(200).json(getStatus);
      } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
      }
});

router.get('/status/:id',connectDB, async (req, res) => {
      //#swagger.tags = ['Orders/StatusOrder']
    const {id} = req.params;
      try {
        const getOneStatus = await Status.findById(id);
        res.status(200).json(getOneStatus)
      } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
      }
});

router.put('/status/:id', connectDB, async (req, res) => {
      //#swagger.tags = ['Orders/StatusOrder']
      const body = req.body;
      const {id} = req.params;

      try {
        const putStatus = await Status.findByIdAndUpdate(id, body, {new: true});
        return res.status(200).json(putStatus);
      } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
      }
});

router.delete('/status/:id', connectDB, async (req, res) => {
      //#swagger.tags = ['Orders/StatusOrder']
    const {id} = req.params
      try {
        const deletStatus = await Status.findByIdAndDelete(id)
        return res.status(200).json(deletStatus);        
      } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});  
      }
})


module.exports = router;