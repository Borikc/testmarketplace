const express = require('express');
const router = express.Router();
const db2 = require('./db'); // Импорт модуля базы данных

/**
 * @swagger
 * tags:
 *   name: Карты
 *   description: Управление банковскими картами пользователей
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           description: Идентификатор пользователя, которому принадлежит карта
 *       required:
 *         - user_id
 */

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Создать карту
 *     tags: [Карты]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: Карта создана успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cardId:
 *                   type: integer
 */
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

/**
 * @swagger
 * /cards/{cardId}:
 *   put:
 *     summary: Обновить карту
 *     tags: [Карты]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         description: Идентификатор карты
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: Карта обновлена успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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

/**
 * @swagger
 * /cards/{cardId}:
 *   delete:
 *     summary: Удалить карту
 *     tags: [Карты]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         description: Идентификатор карты
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Карта удалена успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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
