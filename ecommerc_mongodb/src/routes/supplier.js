const express = require('express');
const connectDB = require('../middlewares/connectDB');
const router = express.Router();

const Supplier = require('../models/modelsProducts/productSupplier');
const authAdm = require('../middlewares/authAdm');


router.post('/supplier', authAdm , connectDB, async (req, res) => {
   //#swagger.tags = ['Product/Supplier']
    let {name, email, telephone, address, cnpj, productsName} = req.body;

    try {

        if(req.body.email !== "" && !/\S+@\S+\.\S+/.test(req.body.email)){
            throw new Error(req.body.email + " não é um formato de email válido");
        }

       if(isNaN(req.body.cnpj)){
        throw new Error("O campo 'CNPJ' dever só número inteiro.");
       }
         
       const newSupplier = await Supplier.create({name, email, telephone, address, cnpj, productsName}) 
        return res.status(201).json(newSupplier)

    }catch(error){
        console.error(error)
        return res.status(404).json({message: 'Erro tentar cadastrar fornecedor', error: error.message});
    }
});

router.get('/suppliers',authAdm , connectDB, async (req, res) => {
    //#swagger.tags = ['Product/Supplier']

    try {
         const getSupplier = await Supplier.find( );
        return res.status(200).json(getSupplier);
    } catch (error) {
        console.error(error);
      return res.status(404).json({message: "errorao tentar buscar os fornecedores" })
    }
   

});

router.get('/suppliers/:id', authAdm , connectDB, async (req, res) => {
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

router.put('/suppliers/:id', authAdm , connectDB, async (req, res)=>{
    //#swagger.tags = ['Product/Supplier']
    const {name, email, telephone, address, cnpj, productsName} = req.body;
    const {id} = req.params;

     try {

        if(req.body.name === "" || req.body.email === "" ||req.body.telephone === "" ||req.body.address === "" || req.body.cnpj === ""){
            throw new Error("Todos os campos tem que estar devidamente preenchidos para alterar o Fornecedor")
        }

        if(req.body.email !== "" && !/\S+@\S+\.\S+/.test(req.body.email)){
            throw new Error(req.body.email + " não é um formato de email válido");
        }

        const updateSupplier = await Supplier.findByIdAndUpdate(id, {name, email, telephone, address, cnpj, productsName}, {new: true});
        return res.status(200).json({updateSupplier});
        
    } catch (error) {
       return res.status(409).json({message:"Erro tentar modificar os dados", error: error.message});
    }
});

router.delete('/suppliers/:id', authAdm ,  connectDB, async (req, res) => {
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