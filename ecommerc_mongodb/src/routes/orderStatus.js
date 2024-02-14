const express = require('express');
const connectDB = require('../middlewares/connectDB');
const Status = require('../models/modelsOrders/orderStatus');
const authAdm = require('../middlewares/authAdm');
const router = express.Router();


router.post('/status', authAdm, connectDB, async (req, res) => {
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

router.get('/status', authAdm ,connectDB, async (req, res) => {
      //#swagger.tags = ['Orders/StatusOrder']

      try {
        const getStatus = await Status.find();
        return res.status(200).json(getStatus);
      } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
      }
});

router.get('/status/:id', authAdm ,connectDB, async (req, res) => {
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

router.put('/status/:id', authAdm , connectDB, async (req, res) => {
      //#swagger.tags = ['Orders/StatusOrder']
      const { status } = req.body;
      const {id} = req.params;

      try {
        const putStatus = await Status.findByIdAndUpdate(id,{ status }, {new: true});
        return res.status(200).json(putStatus);
      } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
      }
});

router.delete('/status/:id', authAdm , connectDB, async (req, res) => {
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