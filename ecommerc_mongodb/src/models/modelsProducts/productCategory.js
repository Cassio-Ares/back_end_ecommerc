const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    category: {
        type: String,
        required: "Digite um nome de categoria para que eu possa criar",
        trim: true
    },
    order:{
        type: Number,
    }
});

const SchemaCategory = mongoose.models.Category || mongoose.model('Category', schema);

module.exports = SchemaCategory;