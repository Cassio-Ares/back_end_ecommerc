const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    quantityOfProduct: {
        type: Number,
        default: 1,
    },
    unitPrice: {
        type: Number,
        required: true
    },
    totalOrder:{
        type: Number,
        required: true
    },
    formOfPayment:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "FormOfPayment"
}
})

const SchemaOrderDetails = mongoose.models.OrdelDetails || mongoose.model("OrdelDetails", schema);

module.exports = SchemaOrderDetails;


