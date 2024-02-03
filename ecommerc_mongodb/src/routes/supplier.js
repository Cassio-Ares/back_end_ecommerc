const express = require('express');
const connectDB = require('../middlewares/connectDB');
const router = express.Router();

const Supplier = require('../models/modelsProducts/productSupplier');


router.post('/supplier', connectDB, async (req, res) => {
   //#swagger.tags = ['Product/Supplier']
  //#swagger.description = ""
    const {name, email, telephone, address, cnpj, productsName} = req.body;

    try {
         
       const newSupplier = await Supplier.create({name, email, telephone, address, cnpj, productsName}) 
        return res.status(201).json(newSupplier)

    }catch(error){
        console.error(error)
        return res.status(404).json({message: 'Erro tentar cadastrar fornecedor', error: erroressage});
    }
});

router.get('/suppliers', connectDB, async (req, res) => {
    //#swagger.tags = ['Product/Supplier']

    try {
         const getSupplier = await Supplier.find( );
        return res.status(200).json(getSupplier);
    } catch (error) {
        console.error(error);
      return res.status(404).json({message: "errorao tentar buscar os fornecedores" })
    }
   

});

router.get('/suppliers/:id', connectDB, async (req, res) => {
    //#swagger.tags = ['Product/Supplier']

    const {id} = req.params;
      try{
            const getSupplier = await Supplier.findById(id)
            return res.status(200).json(getSupplier)
      }catch(error){
        console.error(error)
        return res.status(404).json({message: "Erro tentar buscar os fornecedores" })
      }  
});

router.put('/suppliers/:id', connectDB, async (req, res)=>{
    //#swagger.tags = ['Product/Supplier']
    const body = req.body;
    const {id} = req.params;

     try {

        const updateSupplier = await Supplier.findByIdAndUpdate(id, body, {new: true});
        return res.status(200).json({updateSupplier});
        
    } catch (error) {
       return res.status(404).json({message:"Erro tentar modificar os dados"});
    }
});

router.delete('/suppliers/:id', connectDB, async (req, res) => {
    //#swagger.tags = ['Product/Supplier']

    const {id}= req.params;

    try {
        const deleteSupplier = await Supplier.findByIdAndDelete(id);
        res.status(200).json({deleteSupplier});
        
    } catch (error) {
       console.log(error);
       res.status(404).json({message:"Erro tentar deletar o fornecedor"});
    }

    
})

module.exports = router;