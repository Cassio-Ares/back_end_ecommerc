const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    status:{
        type:String,
        default: 'pedido em analise'
    } 
});

const SchemaStatus = mongoose.model('Status', schema);

module.exports = SchemaStatus;