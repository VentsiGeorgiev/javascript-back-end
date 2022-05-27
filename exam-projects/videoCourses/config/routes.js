const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const videoController = require('../controllers/video');


module.exports = (app) => {
   app.use(authController);
   app.use(homeController);
   app.use(videoController);
}