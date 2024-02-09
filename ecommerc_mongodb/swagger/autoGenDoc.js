const mongooseToSwagger = require('mongoose-to-swagger');
const SchemaAdm = require('../src/models/modelAdm/adm.js');
const SchemaClient = require('../src/models/modelsClient/client.js');
const SchemaDoc = require('../src/models/modelsClient/typeOfDocument.js');
const SchemaProducts = require('../src/models/modelsProducts/product.js');
const SchemaSupplier = require('../src/models/modelsProducts/productSupplier.js');
const SchemaCategory = require('../src/models/modelsProducts/productCategory.js');
const SchemaOrders = require('../src/models/modelsOrders/orders.js');
const SchemaStatus = require('../src/models/modelsOrders/orderStatus.js');
const SchemaPayment = require('../src/models/modelsOrders/formOfPayment.js');
const SchemaOrderDetails = require('../src/models/modelsOrders/orderDetails.js');

const swaggerAutogen = require('swagger-autogen')({
    openapi: "3.0.0",
    language: "pt-BR",
});

const outputFile = "./swagger_output.json";
const endPointsFiles = ["../index.js", "../src/routes.js"] ///**local das rotas, end-pointes */

let doc = {
    info: {
        version: "1.0.0",
        title: "API de um Ecommerce basico",
        description: ""
    },

    servers: [
        {
            url: "http://localhost:4000/",
            description: "Servidor localhost"
        }
    ], 

    consumes: ["application/json"],
    produces: ["application/json"],
    components:{
        schemas:{
            Adm:mongooseToSwagger(SchemaAdm),
            Client: mongooseToSwagger(SchemaClient),
            TypeOfDocument: mongooseToSwagger(SchemaDoc),
            Products: mongooseToSwagger(SchemaProducts),
            Suppliers: mongooseToSwagger(SchemaSupplier),
            Category: mongooseToSwagger(SchemaCategory),
            Orders: mongooseToSwagger(SchemaOrders),
            Status: mongooseToSwagger(SchemaStatus),
            OrderDetails: mongooseToSwagger(SchemaOrderDetails),
            Payment: mongooseToSwagger(SchemaPayment),
        }
    }

}

// to do if
swaggerAutogen(outputFile, endPointsFiles, doc).then(()=>{
    console.log(`Documentação do swagger gerada encontra-se no arquivo em: ${outputFile}`);
    if(process.env.NODE_ENV !== 'production'){
        require("../index.js");
    }
})