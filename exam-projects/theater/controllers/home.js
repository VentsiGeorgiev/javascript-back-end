const preload = require('../middleware/preload');
const { getAllPlays } = require('../services/play');

const router = require('express').Router();

router.get('/', async (req, res) => {
   const plays = await getAllPlays(req.query.orderBy);
   res.render('home', { title: 'Home', plays });
});

// # details
// # catalog details 
router.get('/play/:id', preload(true), (req, res) => {
   const play = res.locals.play;
   play.likesCount = play.users.lenght;

   if (req.session.user) {
      // console.log(` --==## user id ${req.session.user._id}`);
      // console.log(` --==## play owner id ${play.owner._id}`);
      console.log(` --==## request body ${req.body}`);
      play.hasUser = true;
      play.isOwner = req.session.user._id == play.owner._id;

      if (play.users.some(x => x._id == req.session.user._id)) {
         play.isLiked = true;
      }
   }
   res.render('details', { title: 'Play' })
})

module.exports = router;