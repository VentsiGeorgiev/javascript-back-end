const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const playController = require('../controllers/play')

module.exports = (app) => {
   app.use(homeController);
   app.use(authController);
   app.use(playController);
}