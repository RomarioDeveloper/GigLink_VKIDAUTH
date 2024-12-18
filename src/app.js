require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const logger = require('./utils/logger');
const vkAuthRoutes = require('./routes/vkAuth');
const sequelize = require('./config/db');
const swaggerDocs = require('./swagger');

const app = express();
swaggerDocs(app);


app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(vkAuthRoutes);

const startApp = async () => {
    try {
        await sequelize.sync();
        logger.info('База данных синхронизирована');
        app.listen(process.env.PORT, () => logger.info(`Сервер запущен на порту ${process.env.PORT}`));
    } catch (error) {
        logger.error('Ошибка запуска приложения:', error);
    }
};

startApp();