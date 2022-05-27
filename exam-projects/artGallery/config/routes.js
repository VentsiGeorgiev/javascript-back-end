const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const artController = require('../controllers/art');

module.exports = (app) => {
   app.use(authController);
   app.use(homeController);
   app.use(artController);

   app.get('*', (req, res) => {
      res.render('404', { title: 'Page Not Found' })
   });
}