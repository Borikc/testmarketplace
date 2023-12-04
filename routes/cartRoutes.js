// File: routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const db1 = require('./db'); // Import the database module

/**
 * @swagger
 * tags:
 *   name: Корзины
 *   description: Управление корзинами пользователей
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         userid:
 *           type: integer
 *           description: Идентификатор пользователя, к которому привязана корзина
 *       required:
 *         - userid
 */

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Создать корзину
 *     tags: [Корзины]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
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
router.post('/carts', async (req, res) => {
    try {
        const { userid } = req.body;

        // Execute SQL query to create a cart in the database
        const query = 'INSERT INTO carts (userid) VALUES ($1) RETURNING id';
        const result = await db1.one(query, [userid]);

        res.status(201).json({ message: 'Cart created successfully', cartId: result.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /carts/{cartId}:
 *   put:
 *     summary: Обновить корзину
 *     tags: [Корзины]
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
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Корзина обновлена успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/carts/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const { /* Get update data from req.body */ } = req.body;

        // Execute SQL query to update the cart in the database
        const query = 'UPDATE carts SET /* Specify fields and values for update */ WHERE id = $1';
        await db1.none(query, [cartId]);

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /carts/{cartId}:
 *   delete:
 *     summary: Удалить корзину
 *     tags: [Корзины]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/carts/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;

        // Execute SQL query to delete the cart from the database
        const query = 'DELETE FROM carts WHERE id = $1';
        await db1.none(query, [cartId]);

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /carts/{cartId}:
 *   get:
 *     summary: Получить информацию о корзине по ID
 *     tags: [Корзины]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: Идентификатор корзины
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о корзине успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.get('/carts/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await getCart(cartId);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * Получить информацию о корзине по ID
 * @param {number} cartId - Идентификатор корзины
 * @returns {Promise<object|null>} Информация о корзине или null, если не найдено
 */
async function getCart(cartId) {
    try {
        const query = 'SELECT * FROM carts WHERE id = $1';
        const result = await db1.oneOrNone(query, [cartId]);
        return result;
    } catch (error) {
        console.error('Error in getCart:', error.message);
        throw error;
    }
}

module.exports = router;
