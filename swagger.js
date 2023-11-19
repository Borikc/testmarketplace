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
    apis: ['cardRoutes.js', 'cartRoutes.js', 'orderRoutes.js', 'userRoutes.js'], // Используйте один массив и перечислите ваши файлы маршрутов
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

//Добавить Swagger по всем маршрутам
// Path: cardRoutes.js, cartRoutes.js, orderRoutes.js, userRoutes.js, itemRoutes.js
// const express = require('express');
// const router = express.Router();
// const db = require('./db'); // Импорт модуля базы данных
