const express = require('express');
const Client =require('../models/modelsClient/client');
const connectDB = require('../middlewares/connectDB');
const router = express.Router();

router.post('/client', connectDB, async (req, res)=>{
   //#swagger.tags = ['Cliente']

  let {name, email, address, telephone, typeOfDoc, numberDocument } = req.body;
  try {
    const newClient = await Client.create({name, email, address, telephone, typeOfDoc, numberDocument });
     return res.status(201).json(newClient);
    
   } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
   }

});

router.get('/client/:id', connectDB, async (req, res)=>{
  //#swagger.tags = ['Cliente']
});

router.put('/client/:id', connectDB, async (req, res)=>{
  //#swagger.tags = ['Cliente']
});


module.exports = router;
