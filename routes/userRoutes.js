const express = require('express');
const router = express.Router();
const db4 = require('./db'); // Импорт модуля базы данных

// Создание пользователя
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

// Обновление пользователя
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

// Удаление пользователя
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

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать пользователя
 *     tags:
 *       - Пользователи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate' # Ссылка на схему пользователя
 *     responses:
 *       201:
 *         description: Пользователь создан успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: integer
 */

