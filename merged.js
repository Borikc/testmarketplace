const express = require('express');
const router = express.Router();
const db2 = require('./db'); // Импорт модуля базы данных


router.post('/cards', async (req, res) => {
    try {
        const { userId, /* Другие данные карты */ } = req.body;

        // Выполните SQL-запрос для создания карты в базе данных
        const query = 'INSERT INTO cards (user_id, /* Другие поля */) VALUES ($1, /* Другие значения */) RETURNING card_id';
        const result = await db2.one(query, [userId, /* Значения */]);

        res.status(201).json({ message: 'Card created successfully', cardId: result.card_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/cards/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;
        const { /* Получите данные для обновления из req.body */ } = req.body;

        // Выполните SQL-запрос для обновления карты в базе данных
        const query = 'UPDATE cards SET /* Укажите поля и значения для обновления */ WHERE card_id = $1';
        await db2.none(query, [cardId]);

        res.status(200).json({ message: 'Card updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/cards/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;

        // Выполните SQL-запрос для удаления карты из базы данных
        const query = 'DELETE FROM cards WHERE card_id = $1';
        await db2.none(query, [cardId]);

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db4 = require('./db'); // Импорт модуля базы данных

router.post('/users', async (req, res) => {
    try {
        const { first_name, last_name, email, password, user_type, address, phone, profile_picture } = req.body;

        // Выполните SQL-запрос для создания пользователя в базе данных
        const query = 'INSERT INTO users (first_name, last_name, email, password, user_type, address, phone, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id';
        const result = await db4.one(query, [first_name, last_name, email, password, user_type, address, phone, profile_picture]);

        res.status(201).json({ message: 'User created successfully', userId: result.user_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { /* Получите данные для обновления из req.body */ } = req.body;

        // Выполните SQL-запрос для обновления пользователя в базе данных
        const query = 'UPDATE users SET /* Укажите поля и значения для обновления */ WHERE user_id = $1';
        await db4.none(query, [userId]);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Выполните SQL-запрос для удаления пользователя из базы данных
        const query = 'DELETE FROM users WHERE user_id = $1';
        await db4.none(query, [userId]);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db3 = require('./db'); // Импорт модуля базы данных

router.post('/orders', async (req, res) => {
    try {
        const { userId, cartId, /* Другие данные заказа */ } = req.body;

        // Выполните SQL-запрос для создания заказа в базе данных
        const query = 'INSERT INTO orders (user_id, cart_id, /* Другие поля */) VALUES ($1, $2, /* Другие значения */) RETURNING id';
        const result = await db3.one(query, [userId, cartId, /* Значения */]);

        res.status(201).json({ message: 'Order created successfully', orderId: result.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { /* Получите данные для обновления из req.body */ } = req.body;

        // Выполните SQL-запрос для обновления заказа в базе данных
        const query = 'UPDATE orders SET /* Укажите поля и значения для обновления */ WHERE id = $1';
        await db3.none(query, [orderId]);

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        // Выполните SQL-запрос для удаления заказа из базы данных
        const query = 'DELETE FROM orders WHERE id = $1';
        await db3.none(query, [orderId]);

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
const db = require('./db'); // Подключаем модуль базы данных


class ProductItemModel {
    constructor() {
        this.tableName = 'products';
    }

    async createProductItem(productItemData) {
        try {
            const query = `
                INSERT INTO ${this.tableName} (name, description, category, brand, price, stockquantity, condition, attributes, images, sellerid, productlocation, addeddate)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING *;
            `;
            const result = await db.one(query, [
                productItemData.name,
                productItemData.description,
                productItemData.category,
                productItemData.brand,
                productItemData.price,
                productItemData.stockquantity,
                productItemData.condition,
                productItemData.attributes,
                productItemData.images,
                productItemData.sellerid,
                productItemData.productlocation,
                productItemData.addeddate,
            ]);

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProductItem(productItemId) {
        try {
            const query = `
                SELECT * FROM ${this.tableName}
                WHERE id = $1;
            `;
            const result = await db.one(query, [productItemId]);

            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateProductItem(productItemId, updatedData) {
        try {
            const query = `
                UPDATE ${this.tableName}
                SET name = $1, description = $2, category = $3, brand = $4, price = $5, stockquantity = $6, condition = $7, attributes = $8, images = $9, sellerid = $10, productlocation = $11
                WHERE id = $12
                RETURNING *;
            `;
            const result = await db.one(query, [
                updatedData.name,
                updatedData.description,
                updatedData.category,
                updatedData.brand,
                updatedData.price,
                updatedData.stockquantity,
                updatedData.condition,
                updatedData.attributes,
                updatedData.images,
                updatedData.sellerid,
                updatedData.productlocation,
                productItemId,
            ]);

            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductItem(productItemId) {
        try {
            const query = `
                DELETE FROM ${this.tableName}
                WHERE id = $1
                RETURNING *;
            `;
            const result = await db.one(query, [productItemId]);

            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductItemModel;
const pgp = require('pg-promise')();
const DATABASE_URL = "postgresql://postgres:159159159@localhost/rus-marketplace";
const connection = pgp(DATABASE_URL);

module.exports = connection;
const express = require('express');
const router = express.Router();
const db1 = require('./db'); // Импорт модуля базы данных

router.post('/carts', async (req, res) => {
    try {
        const { userId } = req.body;

        // Выполните SQL-запрос для создания корзины в базе данных
        const query = 'INSERT INTO carts (user_id) VALUES ($1) RETURNING id';
        const result = await db1.one(query, [userId]);

        res.status(201).json({ message: 'Cart created successfully', cartId: result.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/carts/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const { /* Получите данные для обновления из req.body */ } = req.body;

        // Выполните SQL-запрос для обновления корзины в базе данных
        const query = 'UPDATE carts SET /* Укажите поля и значения для обновления */ WHERE id = $1';
        await db1.none(query, [cartId]);

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/carts/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;

        // Выполните SQL-запрос для удаления корзины из базы данных
        const query = 'DELETE FROM carts WHERE id = $1';
        await db1.none(query, [cartId]);

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
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