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
  address: {
    type: String,
    required: "dado nescessário para cadastro do fornecedor",
  },
  telephone: {
    type: String,
    required: "dado nescessário para cadastro do fornecedor",
  },
  CNPJ: {
    type: String,
    required: "dado nescessário para cadastro do fornecedor",
  },
  productsName:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products"
  }]
},
  {
    timestamps: true,
  }
);

const SchemaSupplier = mongoose.models.Suppliers || mongoose.model('Suppliers', schema);

module.exports = SchemaSupplier;
