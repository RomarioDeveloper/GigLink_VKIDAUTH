const passport = require('passport');
const { updateUserLoginInfo } = require('../services/vkService');
const User = require('../models/user');
const logger = require('../utils/logger');

require('dotenv').config();

const VKStrategy = require('passport-vkontakte').Strategy;

passport.use(new VKStrategy({
    clientID: process.env.VK_CLIENT_ID,
    clientSecret: process.env.VK_CLIENT_SECRET,
    callbackURL: process.env.VK_CALLBACK_URL,
}, async (accessToken, refreshToken, params, profile, done) => {
    try {
        const ip = profile.ip; // Замените на реальный IP-адрес пользователя
        const user = await updateUserLoginInfo(User, profile, ip);
        return done(null, user);
    } catch (error) {
        logger.error('Ошибка аутентификации через VK:', error);
        return done(error);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findByPk(id).then(user => done(null, user)).catch(done));

const loginVK = passport.authenticate('vkontakte');
const callbackVK = passport.authenticate('vkontakte', { failureRedirect: '/login' });

module.exports = { loginVK, callbackVK };
