const express = require('express');
const { loginVK, callbackVK } = require('../controllers/vkAuthController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: VK ID Authentication
 */

/**
 * @swagger
 * /auth/vk:
 *   get:
 *     summary: Перенаправление пользователя на страницу аутентификации VK
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Перенаправление на VK для аутентификации.
 *       500:
 *         description: Ошибка сервера.
 */
router.get('/auth/vk', loginVK);

/**
 * @swagger
 * /auth/vk/callback:
 *   get:
 *     summary: Обработка ответа от VK после аутентификации
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Успешный вход пользователя через VK.
 *       401:
 *         description: Ошибка аутентификации.
 *       500:
 *         description: Ошибка сервера.
 */
router.get('/auth/vk/callback', callbackVK, (req, res) => {
    res.send('Вы успешно вошли через VK!');
});

module.exports = router;
