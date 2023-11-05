const express = require('express');
const router = express.Router();
const db2 = require('./db'); // Импорт модуля базы данных

// Создание карты
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

// Обновление карты
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

// Удаление карты
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

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Создать карту
 *     tags:
 *       - Карты
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CardCreate' # Ссылка на схему карты
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

// Другие маршруты для карт
