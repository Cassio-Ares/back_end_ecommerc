const express = require('express');
const connectDB = require('../middlewares/connectDB');
const router = express.Router();
const TypeOfDocument = require('../models/modelsClient/typeOfDocument');


router.post('/typedoc', connectDB, async (req, res) =>{
    //#swagger.tags = ['Cliente/Tipos de documentos']
    let body = req.body;
     
    try {
        const typeOfDocument = await TypeOfDocument.create(body);
        console.log(typeOfDocument);
        return res.status(201).json(typeOfDocument)
    } catch (error) {
       return res.status(404).json({message: `Erro ao cadastrar`});
    }
});


router.delete('/typedoc/:id', connectDB, async (req, res)=>{
   //#swagger.tags = ['Cliente/Tipos de documentos']
      const typeDocId = req.params.id;
    
     try {
        const removed = await TypeOfDocument.deleteOne({ _id: typeDocId });
        res.status(200).json({message: "Tipo de documento deletado do banco de dados"});
      } catch (error) {
        res.status(404).json({message: "Erro ao tentar deletar tipo de documento"});
      }

 })



module.exports = router;