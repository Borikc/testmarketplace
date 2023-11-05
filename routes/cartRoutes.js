const express = require('express');
const router = express.Router();
const db1 = require('./db'); // Импорт модуля базы данных

// Создание корзины
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

// Обновление корзины
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

// Удаление корзины
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

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Создать корзину
 *     tags:
 *       - Корзины
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartCreate' # Ссылка на схему корзины
 *     responses:
 *       201:
 *         description: Корзина создана успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cartId:
 *                   type: integer
 */

// Маршрут для обновления корзины
/**
 * @swagger
 * /carts/{cartId}:
 *   put:
 *     summary: Обновить корзину
 *     tags:
 *       - Корзины
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: Идентификатор корзины
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartUpdate' # Ссылка на схему обновления корзины
 *     responses:
 *       200:
 *         description: Корзина обновлена успешно
 *       404:
 *         description: Корзина не найдена
 */

// Маршрут для удаления корзины
/**
 * @swagger
 * /carts/{cartId}:
 *   delete:
 *     summary: Удалить корзину
 *     tags:
 *       - Корзины
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: Идентификатор корзины
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Корзина удалена успешно
 *       404:
 *         description: Корзина не найдена
 */
