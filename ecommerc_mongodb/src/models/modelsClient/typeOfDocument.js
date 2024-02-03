const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    typeOfDoc: {
          type: String,
    }
});

const SchemaDoc = mongoose.models.TypeOfDocument || mongoose.model('TypeOfDocument', schema);

module.exports = SchemaDoc;