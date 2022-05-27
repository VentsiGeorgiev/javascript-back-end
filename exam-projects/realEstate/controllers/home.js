const preload = require('../middleware/preload');
const { getAllXs } = require('../services/x');

const router = require('express').Router();

router.get('/', async (req, res) => {
   const realEstate = await getAllXs(req.query.orderBy);
   res.render('home', { title: 'Home', realEstate });

});


router.get('/details/:id', preload(true), (req, res) => {
   const realEstate = res.locals.realEstate;
   realEstate.people = realEstate.users.map(b => b.username).join(', ');
   console.log(`People who rented: ${realEstate.people}`);

   realEstate.left = realEstate.available - realEstate.users.length;
   // console.log(` realEstate.available: ${realEstate.available}`);
   // console.log(`realEstate.users: ${realEstate.users.length}`);
   // console.log(`realestate left: ${realEstate.left}`);



   if (req.session.user) {
      // console.log(` --==## user id ${req.session.user._id}`);
      // console.log(` --==## play owner id ${play.owner._id}`);
      realEstate.hasUser = true;
      realEstate.isOwner = req.session.user._id == realEstate.owner._id;

      if (realEstate.users.some(x => x._id == req.session.user._id)) {
         realEstate.isLiked = true;
      }
      if (realEstate.left == 0) {
         realEstate.noLeft = true;
      }
   }
   res.render('details', { title: 'Real Estate Details' })
})

module.exports = router;