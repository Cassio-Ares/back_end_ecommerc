const mongooseToSwagger = require('mongoose-to-swagger');
const swaggerAutogen = require('swagger-autogen')({
    openapi: "3.0.0",
    language: "pt-BR",
});

const outputFile = "./swagger_output.json";
const endPointsFiles = ["../index.js"] ///**local das rotas, end-pointes */

let doc = {
    info: {
        version: "1.0.0",
        title: "API de um Ecommerce basico",
        description: ""
    },

    servers: [
        {
            url: "http://localhost:3000/",
            description: "Servidor localhost"
        }
    ], 

    consumes: ["application/json"],
    produces: ["application/json"],

}

// to do if
swaggerAutogen(outputFile, endPointsFiles, doc).then(()=>{
    console.log(`Documentação do swagger gerada encontra-se no arquivo em: ${outputFile}`);
    if(process.env.NODE_ENV !== 'production'){
        require("../index.js");
    }
})