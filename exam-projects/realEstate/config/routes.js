const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const realEstateController = require('../controllers/realEstate');

module.exports = (app) => {
   app.use(authController);
   app.use(homeController);
   app.use(realEstateController);

   app.get('*', (req, res) => {
      res.render('404', { title: 'Page Not Found' })
   })
}