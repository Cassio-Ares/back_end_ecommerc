const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: 'Nome é essencial para seu cadastro'
    },
    email:{
        type: String,
        required: 'Email é essencial para seu cadastro',
        lowercase: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: 'Criar uma senha valida é essencial para seu cadastro',
        trim: true,
        select: false
    }
},
{
    timestamps: true
}
);

const SchemaAdm = mongoose.models.Adms || mongoose.model('Adms', schema);

module.exports = SchemaAdm;