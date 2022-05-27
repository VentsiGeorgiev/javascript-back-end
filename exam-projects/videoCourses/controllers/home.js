const { isOwner, isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllXs } = require('../services/x');

const router = require('express').Router();

router.get('/', async (req, res) => {
   const videos = await getAllXs(req.query.orderBy);
   res.render('home', { title: 'Home', videos });
});

// # details
// # catalog details
router.get('/details/:id', preload(true), (req, res) => {
   const video = res.locals.video;
   console.log(`---- ==== #### res.locals: ${res.locals}`);
   // video.likesCount = video.users.lenght;
   video.bookedCourses = video.users.map(b => b.title).join(', ');

   if (req.session.user) {
      // console.log(` --==## user id ${req.session.user._id}`);
      // console.log(` --==## video owner id ${video.owner._id}`);
      video.hasUser = true;
      video.isOwner = req.session.user._id == video.owner._id;

      if (video.users.some(x => x._id == req.session.user._id)) {
         video.isLiked = true;
      }
   }
   res.render('details', { title: 'Details' })
});

// # my post page / profile
router.get('/profile', isUser(), async (req, res) => {

   const videos = await getAllXs();
   res.render('profile', { title: 'Home', videos });
});

module.exports = router;