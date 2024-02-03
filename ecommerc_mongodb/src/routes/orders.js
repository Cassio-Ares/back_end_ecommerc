// const express = require('express');
// const Client =require('../models/modelsClient/client');
// const connectDB = require('../middlewares/connectDB');
// const router = express.Router();

// router.post('/orders', connectDB, async (req, res)=>{
//    //#swagger.tags = ['Pedidos']

//   let bodyData = req.body;
//   try {
//     const newClient = await Client.create(bodyData);
//     console.log(newClient);
//      return res.status(201).json(newClient);
    
//    } catch (error) {
//     return res.status(404).json({message: error.message});
//    }

// })

// module.exports = router;