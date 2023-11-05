const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Marketplace API',
            version: '1.0.0',
            description: 'API for managing carts, orders, and users in the marketplace',
        },
    },
    apis: ['app.js'], // Замените на путь к вашему файлу с маршрутами Express.js
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
