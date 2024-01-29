const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   payment:{
     type: String,
   }
});

const SchemaPayment = mongoose.model('FormOfPayment', schema);

module.exports = SchemaPayment;