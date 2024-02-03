const mongoose = require('mongoose');

async function connectDB(req=null, res=null, next=null){
    try {
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Conectado ao banco de dados")
        try{next()}catch(err){};
        return mongoose;
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Erro ao conectar ao banco de dados"});
    }
}

module.exports = connectDB;