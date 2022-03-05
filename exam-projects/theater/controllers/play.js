const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createPlay, updatePlay, deleteById, getPlayById, likePlay } = require('../services/play');
const mapErrors = require('../util/mappers');


// # create
router.get('/create', isUser(), (req, res) => {
   res.render('create', { title: 'Create Play', data: {} });
})

router.post('/create', isUser(), async (req, res) => {
   const play = {
      title: req.body.title,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
      isPublic: Boolean(req.body.isPublic),
      owner: req.session.user._id,
   };

   try {
      await createPlay(play);
      res.redirect('/');
   } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      res.render('create', { title: 'Create Play Offer', data: play, errors });
   }
});

// # edit
router.get('/edit/:id', preload(), isOwner(), (req, res) => {
   res.render('edit', { title: 'Edit Offer' })
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
   const id = req.params.id;

   const play = {
      title: req.body.title,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
      isPublic: Boolean(req.body.isPublic),
   };


   try {
      await updatePlay(id, play);
      res.redirect('/play/' + id);
   } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      play._id = id;
      res.render('edit', { title: 'Create', play, errors })
   }

});

// # delete
router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
   await deleteById(req.params.id);
   res.redirect('/');
});

// # join / like
router.get('/like/:id', isUser(), async (req, res) => {
   const id = req.params.id;
   const userId = req.session.user?._id;
   // console.log(`controllers id: ${id}`);
   // console.log(`controllers userId: ${userId}`);
   try {
      await likePlay(id, userId)
   } catch (err) {
      console.error(err);
   } finally {
      res.redirect('/play/' + id);
   }

});



module.exports = router;