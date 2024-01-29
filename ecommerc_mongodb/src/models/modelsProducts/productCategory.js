const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    category: {
        type: String,
        trim: true
    },
    order:{
        type: Number,
    },
    productsName:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products"
    }
});

const SchemaCategory = mongoose.models.Category || mongoose.model('Category', schema);

module.exports = SchemaCategory;