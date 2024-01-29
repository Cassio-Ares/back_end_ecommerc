const express = require('express');
const Client =require('../models/modelsClient/client')
const router = express.Router();

router.post('/client', async (req, res)=>{
   //#swagger.tags = ['Cliente']

  let bodyData = req.body;
  try {
    const newClient = await Client.create(bodyData);
    console.log(newClient);
     return res.status(201).json(newClient);
    
   } catch (error) {
    return res.status(404).json({message: error.message});
   }

})

module.exports = router;
