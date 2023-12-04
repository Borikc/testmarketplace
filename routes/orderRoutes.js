const express = require('express');
const router = express.Router();
const db3 = require('./db'); // Импорт модуля базы данных

/**
 * @swagger
 * tags:
 *   name: Заказы
 *   description: Управление заказами пользователей
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           description: Идентификатор пользователя, оформившего заказ
 *         cart_id:
 *           type: integer
 *           description: Идентификатор корзины, связанной с заказом
 *       required:
 *         - user_id
 *         - cart_id
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Создать заказ
 *     tags: [Заказы]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Заказ создан успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 orderId:
 *                   type: integer
 */
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

/**
 * @swagger
 * /orders/{orderId}:
 *   put:
 *     summary: Обновить заказ
 *     tags: [Заказы]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: Идентификатор заказа
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Заказ обновлен успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Удалить заказ
 *     tags: [Заказы]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: Идентификатор заказа
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заказ удален успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Получить информацию о заказе по ID
 *     tags: [Заказы]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: Идентификатор заказа
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о заказе успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get('/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        // Выполните SQL-запрос для получения информации о заказе по ID из базы данных
        const query = 'SELECT * FROM orders WHERE id = $1';
        const order = await db3.oneOrNone(query, [orderId]);

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
