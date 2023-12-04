const express = require('express');
const router = express.Router();
const db4 = require('./db'); // Импорт модуля базы данных

/**
 * @swagger
 * tags:
 *   name: Пользователи
 *   description: Управление пользователями
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           description: Имя пользователя
 *         last_name:
 *           type: string
 *           description: Фамилия пользователя
 *         email:
 *           type: string
 *           description: Адрес электронной почты пользователя
 *         password:
 *           type: string
 *           description: Пароль пользователя
 *         user_type:
 *           type: string
 *           description: Тип пользователя (например, "customer" или "seller")
 *         address:
 *           type: string
 *           description: Адрес пользователя
 *         phone:
 *           type: string
 *           description: Номер телефона пользователя
 *         profile_picture:
 *           type: string
 *           description: Ссылка на изображение профиля пользователя
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *         - user_type
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать пользователя
 *     tags: [Пользователи]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
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

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Обновить пользователя
 *     tags: [Пользователи]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Идентификатор пользователя
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Пользователь обновлен успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: [Пользователи]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Идентификатор пользователя
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Пользователь удален успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Получить информацию о пользователе по ID
 *     tags: [Пользователи]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Идентификатор пользователя
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о пользователе успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Выполните SQL-запрос для получения информации о пользователе по ID из базы данных
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const user = await db4.oneOrNone(query, [userId]);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
