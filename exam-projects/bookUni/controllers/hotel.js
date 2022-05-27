const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createX, updateX, deleteById, getXById, likeX } = require('../services/x');
const mapErrors = require('../util/mappers');

// # create
router.get('/create', isUser(), (req, res) => {
   res.render('create', { title: 'Create', data: {} });
});

router.post('/create', isUser(), async (req, res) => {
   const hotel = {
      name: req.body.name,
      city: req.body.city,
      freeRooms: req.body.freeRooms,
      imgUrl: req.body.imgUrl,
      owner: req.session.user._id,
   };

   try {
      await createX(hotel);
      res.redirect('/');
   } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      res.render('create', { title: 'Create Offer', data: hotel, errors });
   }
});

// # edit
router.get('/edit/:id', preload(), isOwner(), (req, res) => {
   res.render('edit', { title: 'Edit Offer' })
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
   const id = req.params.id;

   const hotel = {
      name: req.body.name,
      city: req.body.city,
      imgUrl: req.body.imgUrl,
      freeRooms: req.body.freeRooms,
   };


   try {
      await updateX(id, hotel);
      res.redirect('/details/' + id);
   } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      hotel._id = id;
      res.render('edit', { title: 'Create', hotel, errors })
   }

});

// # delete
router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
   await deleteById(req.params.id);
   res.redirect('/');
});


// # join / like
router.get('/booking/:id', isUser(), async (req, res) => {
   const id = req.params.id;
   const userId = req.session.user?._id;
   // console.log(`controllers id: ${id}`);
   // console.log(`controllers userId: ${userId}`);
   try {
      await likeX(id, userId)
   } catch (err) {
      console.error(err);
   } finally {
      res.redirect('/details/' + id);
   }

});



module.exports = router;