const router = require('express').Router();
const { isUser, isGuest } = require('../middleware/guards');
const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');



// # register
router.get('/register', isGuest(), (req, res) => {
   res.render('register', { title: 'Register Page' });
});
// [x] TODO check form action, method, field names
router.post('/register', isGuest(), async (req, res) => {
   try {
      if (req.body.password.trim() == '') {
         throw new Error('Password is required');
      } else if (req.body.password != req.body.repass) {
         throw new Error('Passwrods don\'t match');
      }

      const user = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
      req.session.user = user;
      res.redirect('/'); // [x] TODO check redirect requirements
   } catch (err) {
      console.error(err);
      // [x] TODO send error messages
      const errors = mapErrors(err);
      const data = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email
      }
      res.render('register', { title: 'Register Page', data, errors });
   }

})


// # login
router.get('/login', isGuest(), (req, res) => {
   res.render('login', { title: 'Login Page' });
});
// [x] TODO check form action, method, field names
router.post('/login', isGuest(), async (req, res) => {
   try {
      const user = await login(req.body.email, req.body.password);
      req.session.user = user;
      res.redirect('/'); //[x] TODO check redirect requirements
   } catch (err) {
      console.error(err);
      // [x] TODO send error messages
      const errors = mapErrors(err);
      res.render('login', { title: 'Login Page', data: { email: req.body.email }, errors });
   }
})

// # logout
router.get('/logout', isUser(), (req, res) => {
   delete req.session.user;
   res.redirect('/');
});


module.exports = router;