const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllXs } = require('../services/x');

const router = require('express').Router();

router.get('/', async (req, res) => {
   res.render('home', { title: 'Home' });
});

router.get('/gallery', async (req, res) => {
   const arts = await getAllXs(req.query.orderBy);
   res.render('gallery', { title: 'Gallery', arts });
});

// # details
// # catalog details 
router.get('/gallery/:id', preload(true), (req, res) => {
   const art = res.locals.art;
   art.people = art.users.map(b => b.username).join(', ');
   art.people = art.users.map(b => b.username).join(', ');
   console.log(`People who rented: ${art.people}`);

   if (req.session.user) {
      // console.log(` --==## user id ${req.session.user._id}`);
      // console.log(` --==## play owner id ${play.owner._id}`);
      art.hasUser = true;
      art.isOwner = req.session.user._id == art.owner._id;

      if (art.users.some(x => x._id == req.session.user._id)) {
         art.isShared = true;
      }
   }
   res.render('details', { title: 'Art Details' })
})

// # my post page / profile
router.get('/profile', isUser(), async (req, res) => {
   const hotels = await getAllXs();
   res.render('profile', { title: 'Home', hotels })
});

module.exports = router;