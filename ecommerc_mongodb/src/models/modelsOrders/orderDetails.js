const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    ],
    quantityOfProduct: [{
        type: Number,
        default: 1,
    }],
    unitPrices:  [
        {
          unitPrice: Number,
          total: Number,
        }
      ],
    totalOrder:{
        type: Number,
        required: true
    },
    formOfPayment:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "FormOfPayment"
}
})

const SchemaOrderDetails = mongoose.models.OrderDetails || mongoose.model("OrdelDetails", schema);

module.exports = SchemaOrderDetails;


