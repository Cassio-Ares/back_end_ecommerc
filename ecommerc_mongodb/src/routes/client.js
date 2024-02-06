const express = require('express');
const Client =require('../models/modelsClient/client');
const TypeOfDoc = require('../models/modelsClient/typeOfDocument')
const connectDB = require('../middlewares/connectDB');
const router = express.Router();

router.post('/client', connectDB, async (req, res)=>{
   //#swagger.tags = ['Cliente']

  let {name, email, address, telephone, typeOfDocument, numberDocument } = req.body;
  
  try {
    typeOfDocument = await TypeOfDoc.findById(typeOfDocument);
    let newClient = await Client.create({name, email, address, telephone, typeOfDocument, numberDocument });
    
    return res.status(201).json(newClient);
    
   } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
   }

});

router.get('/client', connectDB, async (req, res) => {
  //#swagger.tags = ['Cliente']
  try {
      // Encontra todos os clientes e popula o campo 'typeOfDocument'
      let getClients = await Client.find().populate('typeOfDocument').exec();

      return res.status(200).json(getClients);
  } catch (error) {
    console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
  }
});


router.get('/client/:id', connectDB, async (req, res)=>{
  //#swagger.tags = ['Cliente']
  const {id} = req.params;
try {
  const getOneClients = await Client.findById(id);
  return res.status(200).json(getOneClients);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
}
});

router.put('/client/:id', connectDB, async (req, res)=>{
  //#swagger.tags = ['Cliente']
  const body = req.body;
  const {id} = req.params;
try {
  const putClient = await Client.findByIdAndUpdate(id, body, {new: true});
  return res.status(200).json(putClient);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
}
});

router.delete('/client/:id', connectDB, async (req, res)=>{
  //#swagger.tags = ['Cliente']
  const {id} = req.params;
try {
  const deleteClient = await Client.findByIdAndDelete(id);
  return res.status(200).json(deleteClient);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro ao deletar cliente', error: error.message });
}
});


module.exports = router;
