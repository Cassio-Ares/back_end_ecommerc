const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'este campo é obrigatório preencha com seu nome completo por favor'
    }, 
    email: {
        type: String,
        required: 'este campo é obrigatório preencha com seu e-mail que vc mais acessa por favor',
        lowercase: true,
        trim: true,
        match: /\S+@\S+\.\S+/,
        unique: true
      },
    address: {
       street:{
        type: String,
         required: 'este campo é obrigatório preencha com endereço ideal para uma entrega segura por favor',
       },
       number:{
        type: Number,
         required: 'este campo é obrigatório preencha com endereço ideal para uma entrega segura por favor',
       },
       city:{
        type: String,
         required: 'este campo é obrigatório preencha com endereço ideal para uma entrega segura por favor',
       },
       cep:{
        type: String,
         required: 'este campo é obrigatório preencha com endereço ideal para uma entrega segura por favor',
       }
    },
    telephone: {
        type: String,
        required: 'este campo é obrigatório preencha com seu telefone por favor',
    },
   typeOfDoc: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'TypeOfDocument',
    //    required: 'este campo é obrigatório',
    },
    numberDocument:{
        type: String,
        required: 'este campo é obrigatório preencha com o numero do documento que vc selecionou por favor',
    }
},
    {
        timestamps: true,
    }
);

const SchemaClient = mongoose.models.Client || mongoose.model('Client', schema);

module.exports = SchemaClient;