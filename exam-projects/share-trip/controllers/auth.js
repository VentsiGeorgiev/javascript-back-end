const router = require('express').Router();
const { isUser, isGuest } = require('../middleware/guards');
const { register, login } = require('../services/user');
const mapErrors = require('../util/mappers');



// # register
router.get('/register', isGuest(), (req, res) => {
   res.render('register');
});
//[x] TODO check form action, method, field names
router.post('/register', isGuest(), async (req, res) => {
   try {
      if (req.body.password.trim().length < 4) {
         throw new Error('Passowrds must be at least 4 characters long');
      }
      if (req.body.password != req.body.repass) {
         throw new Error('Passowrds don\'t match');
      }

      const user = await register(req.body.email, req.body.password, req.body.gender);
      req.session.user = user;
      res.redirect('/'); // [x] TODO check redirect requirements
   } catch (err) {
      console.error(err);
      //[x] TODO send error messages
      const errors = mapErrors(err);
      const isMale = req.body.gender == 'male';
      res.render('register', { data: { email: req.body.email, isMale }, errors });
   }

})


// # login
router.get('/login', isGuest(), (req, res) => {
   res.render('login');
});
//[x] TODO check form action, method, field names
router.post('/login', isGuest(), async (req, res) => {
   try {
      const user = await login(req.body.email, req.body.password);
      req.session.user = user;
      res.redirect('/'); //[x] TODO check redirect requirements
   } catch (err) {
      console.error(err);
      // [x] TODO send error messages
      const errors = mapErrors(err);
      res.render('login', { data: { email: req.body.email }, errors });
   }
})

// # logout
router.get('/logout', isUser(), (req, res) => {
   delete req.session.user;
   res.redirect('/');
});


module.exports = router;