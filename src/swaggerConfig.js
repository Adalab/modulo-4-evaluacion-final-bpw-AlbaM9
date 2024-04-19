
require("dotenv").config();
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Libros de Fantasía',
            version: '1.0.0',
            description: 'Una API para gestionar libros de fantasía y sus autores',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ['./src/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);


module.exports = swaggerDocs;
