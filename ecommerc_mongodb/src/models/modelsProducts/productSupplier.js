const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: "dado nescessário para cadastro do fornecedor",
  },
  email: {
    type: String,
    required: "dado nescessário para cadastro do fornecedor",
    lowercase: true,
    trim: true,
    match: /\S+@\S+\.\S+/,
  },
  telephone: {
    type: String,
    required: "dado nescessário para cadastro do fornecedor",
  },
  address: {
    street:{
     type: String,
      required: 'este campo é obrigatório preencha com endereço mais proximo deste fornecedor',
    },
    number:{
     type: Number,
      required: 'este campo é obrigatório preencha com endereço mais proximo deste fornecedor',
    },
    city:{
     type: String,
      required: 'este campo é obrigatório preencha com endereço mais proximo deste fornecedor',
    },
    cep:{
     type: String,
      required: 'este campo é obrigatório preencha com endereço mais proximo deste fornecedor',
    }
 },
  cnpj: {
    type: String,
    required: "dado nescessário para cadastro do fornecedor",
  },
  // productsName:[{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Products"
  // }]
},
  {
    timestamps: true,
  }
);

const SchemaSupplier = mongoose.models.Suppliers || mongoose.model('Suppliers', schema);

module.exports = SchemaSupplier;
