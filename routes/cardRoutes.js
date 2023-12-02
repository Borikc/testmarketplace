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
 *         userid:
 *           type: integer
 *           description: Идентификатор пользователя, которому принадлежит карта
 *       required:
 *         - userid
 *         - cardid
 *         - cardnumber
 *         - cardholdername
 *         - expirymonth
 *         - expiryyear
 *         - cvv
 *         - billingaddress
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
        const { userId, cardId, cardNumber, expiryMonth, expiryYear, cardHolderName, cvv, billingAddress } = req.body;

        // Валидация параметров запроса (пример использования Joi)
        // const validationSchema = Joi.object({ userId: Joi.number().integer(), ... });
        // const validationResult = validationSchema.validate(req.body);
        // if (validationResult.error) {
        //   return res.status(400).json({ message: 'Invalid request parameters' });
        // }

        // Выполните SQL-запрос для создания карты в базе данных
        const query = 'INSERT INTO cards (userid, cardid, cardnumber, expirymonth, expiryyear, cardholdername, cvv, billingaddres) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING card_id';
        const result = await db2.one(query, [userId, cardId, cardNumber, expiryMonth, expiryYear, cardHolderName, cvv, billingAddress]);

        res.status(201).json({ message: 'Card created successfully', cardId: result.card_id });
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
