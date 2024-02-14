const express = require('express');
const mongoose = require('mongoose');
const Client =require('../models/modelsClient/client');
const TypeOfDoc = require('../models/modelsClient/typeOfDocument')
const connectDB = require('../middlewares/connectDB');
const authAdm = require('../middlewares/authAdm');
const router = express.Router();

router.post('/client', connectDB, async (req, res)=>{
   //#swagger.tags = ['Clients']

  let {name, email, address, telephone, typeOfDocument, numberDocument } = req.body;
  
  try {
    if(!typeOfDocument){
      throw new Error("Coloque um tipo de documento valido")
    }
    
    if(req.body.email &&  req.body.email !== "" && !/\S+@\S+\.\S+/.test(req.body.email)){
      throw new Error(req.body.email + " não é um formato de email válido");
    }
    
    typeOfDocument = await TypeOfDoc.findById(typeOfDocument);
    let newClient = await Client.create({name, email, address, telephone, typeOfDocument, numberDocument });
    
    return res.status(201).json(newClient);
    
   } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Erro ao criar cliente', error: error.message });
   }

});

router.get('/client', authAdm , connectDB, async (req, res) => {
  //#swagger.tags = ['Clients']
  try {
      let getClients = await Client.find().populate('typeOfDocument').exec();

      return res.status(200).json(getClients);
  } catch (error) {
    console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
  }
});


router.get('/client/:id', connectDB, async (req, res)=>{
  //#swagger.tags = ['Clients']
  const {id} = req.params;
try {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  const getOneClients = await Client.findById(id);
  return res.status(200).json(getOneClients);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro no servidor'});
}
});

router.put('/client/:id', connectDB, async (req, res)=>{
  //#swagger.tags = ['Clients']
  let {name, email, address, telephone, typeOfDocument, numberDocument } = req.body;
  const {id} = req.params;
try {
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ message: 'ID inválido' });
  }

  if(req.body.name === "" || req.body.email === "" || req.body.address === "" || req.body.telephone === "" || req.body.typeOfDocument === "" || req.body.numberDocument === ""){
    throw new Error("Para atualizar o cadastro todos os campos tem que estar preenchidos com dados validos")
  } 

  if(req.body.email !== "" &&  !/\S+@\S+\.\S+/.test(req.body.email) ){
    throw new Error(req.body.email + " não é um formato de email válido");
  }
   
  const putClient = await Client.findByIdAndUpdate(id, {name, email, address, telephone, typeOfDocument, numberDocument }, {new: true});
  return res.status(200).json(putClient);
} catch (error) {
  console.error(error);
  return res.status(500).json({  message: 'Erro ao deletar cliente', error: error.message });
}
});

router.delete('/client/:id', authAdm , connectDB, async (req, res)=>{
  //#swagger.tags = ['Clients']
  const {id} = req.params;
  
try {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: 'ID inválido' });
    }

  const deleteClient = await Client.findByIdAndDelete(id);
  return res.status(200).json(deleteClient);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro ao deletar cliente', error: error.message });
}
});


module.exports = router;
