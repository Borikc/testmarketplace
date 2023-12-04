const express = require('express');
const router = express.Router();
const db = require('./db'); // Подключаем модуль базы данных

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Название товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         brand:
 *           type: string
 *           description: Бренд товара
 *         price:
 *           type: number
 *           description: Цена товара
 *         stockquantity:
 *           type: integer
 *           description: Количество товара в наличии
 *         condition:
 *           type: string
 *           description: Состояние товара
 *         attributes:
 *           type: string
 *           description: Атрибуты товара
 *         images:
 *           type: string
 *           description: Ссылка на изображение товара
 *         sellerid:
 *           type: integer
 *           description: Идентификатор продавца
 *         productlocation:
 *           type: string
 *           description: Местоположение товара
 *         addeddate:
 *           type: string
 *           format: date
 *           description: Дата добавления товара
 *       required:
 *         - name
 *         - price
 *         - stockquantity
 *         - sellerid
 *         - addeddate
 *         - productlocation
 *         - condition
 *         - attributes
 *         - images
 *         - category
 *         - brand
 *         - description
 */

class ProductItemModel {
    constructor() {
        this.tableName = 'products';
    }

    /**
     * @swagger
     * /products:
     *   post:
     *     summary: Создать товар
     *     tags: [Товары]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProductItem'
     *     responses:
     *       201:
     *         description: Товар создан успешно
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 productId:
     *                   type: integer
     */
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

    /**
     * @swagger
     * /products/{productId}:
     *   get:
     *     summary: Получить информацию о товаре
     *     tags: [Товары]
     *     parameters:
     *       - in: path
     *         name: productId
     *         required: true
     *         description: Идентификатор товара
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Информация о товаре получена успешно
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProductItem'
     */
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

    /**
     * @swagger
     * /products/{productId}:
     *   put:
     *     summary: Обновить информацию о товаре
     *     tags: [Товары]
     *     parameters:
     *       - in: path
     *         name: productId
     *         required: true
     *         description: Идентификатор товара
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProductItem'
     *     responses:
     *       200:
     *         description: Информация о товаре обновлена успешно
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProductItem'
     */
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

    /**
     * @swagger
     * /products/{productId}:
     *   delete:
     *     summary: Удалить товар
     *     tags: [Товары]
     *     parameters:
     *       - in: path
     *         name: productId
     *         required: true
     *         description: Идентификатор товара
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Товар удален успешно
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProductItem'
     */
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
/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Получить информацию о товаре по ID
 *     tags: [Товары]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Идентификатор товара
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о товаре успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductItem'
 */
router.get('/products/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const productItemModel = new ProductItemModel();
        const product = await productItemModel.getProductItem(productId);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = ProductItemModel;
