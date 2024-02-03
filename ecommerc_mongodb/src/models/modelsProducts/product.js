const mongoose =  require('mongoose');

const schema = new mongoose.Schema({
    nameProduct:{
        type: String,
        required: 'dado nescessário para o cadastrado do produto',
        trim: true,
    },
    imgProduct: {
        type: String,
    },
    priceProduct: {
        type: Number,
        required: 'dado nescessário para o cadastrado do produto',
        trim: true,
    },
    promotionalPrice:{
        type: Number,
    },
    descriptionProduct: {
        type: String,
        required: 'dado nescessário para o cadastrado do produto',
        trim: true,
    },
    reviewsProduct: {
        type: String,
        default: ""
    },
    expirationDate: {
        type: Date,
        required: 'dado nescessário para o cadastrado do produto',
    },
    productStock: {
        type: Number,
        required: 'dado nescessário para o cadastrado do produto',
        trim: true,
    },
    productCategory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
        required: 'dado nescessário para o cadastrado do produto',
        trim: true,
    }],
    productSupplier:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductSupplier",
        required: 'dado nescessário para o cadastrado do produto',
        trim: true,
    }]
}, 
    {
        timestamps: true,
    }
)

const SchemaProducts = mongoose.models.Products || mongoose.model('Products', schema);

module.exports = SchemaProducts;