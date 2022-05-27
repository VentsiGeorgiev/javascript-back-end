const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createX, updateX, deleteById, getXById, shareX } = require('../services/x');
const mapErrors = require('../util/mappers');


// # create
router.get('/create', isUser(), (req, res) => {
   res.render('create', { title: 'Create Art Offer', data: {} });
})

router.get('/create', isUser(), (req, res) => {
   res.render('gallery', { title: 'Gallery' });
})

router.post('/create', isUser(), async (req, res) => {
   const art = {
      title: req.body.title,
      technique: req.body.technique,
      imgUrl: req.body.imgUrl,
      certificate: req.body.certificate,
      owner: req.session.user._id,
      users: req.body.users,
   };

   try {
      await createX(art);
      res.redirect('/gallery');
   } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      res.render('create', { title: 'Create Art Offer', data: art, errors });
   }
});

// # edit
// -След като са направени промените - отиди в services/x - и там направи updateX - existing
router.get('/edit/:id', preload(), isOwner(), (req, res) => {
   res.render('edit', { title: 'Edit Offer' })
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
   const id = req.params.id;

   const art = {
      title: req.body.title,
      technique: req.body.technique,
      imgUrl: req.body.imgUrl,
      certificate: req.body.certificate,
   };


   try {
      await updateX(id, art);
      res.redirect('/gallery/' + id);
   } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      art._id = id;
      res.render('edit', { title: 'Create', art, errors })
   }

});

// # delete
router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
   await deleteById(req.params.id);
   res.redirect('/');
});

// # join / like
router.get('/share/:id', isUser(), async (req, res) => {
   const id = req.params.id;
   const userId = req.session.user?._id;
   // console.log(`controllers id: ${id}`);
   // console.log(`controllers userId: ${userId}`);
   try {
      await shareX(id, userId)
   } catch (err) {
      console.error(err);
   } finally {
      res.redirect('/gallery/' + id);
   }

});



module.exports = router;
