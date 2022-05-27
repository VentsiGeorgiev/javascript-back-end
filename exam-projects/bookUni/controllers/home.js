const preload = require('../middleware/preload');
const { getAllXs } = require('../services/x');

const router = require('express').Router();

router.get('/', async (req, res) => {
   const hotels = await getAllXs();
   res.render('home', { title: 'Home', hotels })
});

// # catalog details 
router.get('/details/:id', preload(true), (req, res) => {
   const hotel = res.locals.hotel;

   hotel.bookedHotels = hotel.users.map(b => b.name).join(', ');

   if (req.session.user) {
      // console.log(` --==## user id ${req.session.user._id}`);
      // console.log(` --==## play owner id ${play.owner._id}`);
      hotel.hasUser = true;
      hotel.isOwner = req.session.user._id == hotel.owner._id;

      if (hotel.users.some(x => x._id == req.session.user._id)) {
         hotel.isLiked = true;
      }
   }
   res.render('details', { title: 'Hotel details' })
})

// # my post page / profile
router.get('/profile', async (req, res) => {
   const hotels = await getAllXs();
   res.render('profile', { title: 'Home', hotels })
});


module.exports = router;