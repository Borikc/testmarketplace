const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Импортируйте ваши маршруты
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const itemRoutes = require('./routes/itemRoutes');

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
    apis: ['routes/userRoutes.js', 'routes/cardRoutes.js', 'routes/orderRoutes.js', "routes/cartRoutes.js", "routes/itemRoutes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Подключите ваши маршруты
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/items', itemRoutes);

// Запустите сервер
const port = process.env.PORT || 3080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});