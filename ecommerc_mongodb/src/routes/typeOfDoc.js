const express = require("express");
const connectDB = require("../middlewares/connectDB");
const router = express.Router();
const TypeOfDocument = require("../models/modelsClient/typeOfDocument");
const authAdm = require("../middlewares/authAdm");

router.post('/typeofdocument', authAdm , connectDB, async (req, res) => {
  //#swagger.tags = ['Client/Type of document']
  let { typeOfDoc } = req.body;

  if (!typeOfDoc) {
    return res.status(400).json({
      message:"Preencha o campo para cadastrar os tipos de documento que poderá ser usados.",
    });
  }

  try {
    const typeOfDocument = await TypeOfDocument.create({ typeOfDoc });
    return res.status(201).json(typeOfDocument);
  } catch (error) {
    return res.status(404).json({ message: `Erro ao cadastrar` });
  }
});

router.get('/typeofdocument', connectDB, async (req, res) => {
   //#swagger.tags = ['Client/Type of document']
  try {
    const getTypeOfDocument = await TypeOfDocument.find();
    return res.status(200).json(getTypeOfDocument);
  } catch (error) {
    console.error(error);
    return  res.status(500).json({ message: 'Erro ao tentar buscar os tipos de documentos'});
  }
});

router.delete('/typeofdocument/:id', connectDB, async (req, res) => {
  //#swagger.tags = ['Client/Type of document']
  const typeDocId = req.params.id;

  try {
    const removed = await TypeOfDocument.deleteOne({ _id: typeDocId });
    res.status(200).json({ message: "Tipo de documento deletado do banco de dados" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao tentar deletar tipo de documento" });
  }
});

module.exports = router;
