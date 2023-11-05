const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Импортируйте ваши маршруты
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Импортируйте аннотации Swagger из ваших маршрутных файлов (необязательно, если они уже в ваших файлах)
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Marketplace API',
        version: '1.0.0',
        description: 'API documentation for the Marketplace application',
    },
};

const options = {
    swaggerDefinition,
    apis: ['userRoutes.js', 'cardRoutes.js', 'orderRoutes.js'], // Укажите ваши маршрутные файлы
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Подключите ваши маршруты
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);

// Запустите сервер
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});