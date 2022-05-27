const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const hotelController = require('../controllers/hotel')

module.exports = (app) => {
   app.use(authController);
   app.use(homeController);
   app.use(hotelController);
}