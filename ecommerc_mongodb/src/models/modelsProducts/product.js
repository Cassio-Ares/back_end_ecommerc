const mongoose =  require('mongoose');


const schema = new mongoose.Schema({
    nameProduct:{
        type: String,
        required: 'dado necessário para o cadastrado do produto',
        trim: true,
    },
    imgProduct: {
        type: String,
    },
    priceProduct: {
        type: Number,
        required: 'dado necessário para o cadastrado do produto',
        trim: true,
    },
    promotionalPrice:{
        type: Number,
    },
    descriptionProduct: {
        type: String,
        required: 'dado necessário para o cadastrado do produto',
        trim: true,
    },
    reviewsProduct: {
        type: String,
        default: ""
    },
    expirationDate: {
        type: Date,
        required: 'dado necessário para o cadastrado do produto',
    },
    productStock: {
        type: Number,
        required: 'dado necessário para o cadastrado do produto',
        trim: true,
    },
    Category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: 'dado necessário para o cadastrado do produto',
        trim: true,
    }],
    Supplier:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: 'dado necessário para o cadastrado do produto',
        trim: true,
    }]
}, 
    {
        timestamps: true,
    }
)

const SchemaProducts = mongoose.models.Products || mongoose.model('Products', schema);

module.exports = SchemaProducts;