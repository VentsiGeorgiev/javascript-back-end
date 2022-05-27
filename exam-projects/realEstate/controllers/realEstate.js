const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createX, updateX, deleteById, getXById, likeX } = require('../services/x');
const mapErrors = require('../util/mappers');


// # create
router.get('/create', isUser(), (req, res) => {
   res.render('create', { title: 'Create Details', data: {} });
})

router.post('/create', isUser(), async (req, res) => {
   const realEstate = {
      title: req.body.title,
      homeName: req.body.homeName,
      type: req.body.type,
      year: req.body.year,
      city: req.body.city,
      image: req.body.image,
      description: req.body.description,
      available: req.body.available,
      owner: req.session.user._id,
   };

   try {
      await createX(realEstate);
      res.redirect('/');
   } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      res.render('create', { title: 'Create Real Estate', data: realEstate, errors });
   }
});

// # edit
// -След като са направени промените - отиди в services/x - и там направи updateX - existing
router.get('/edit/:id', preload(), isOwner(), (req, res) => {
   res.render('edit', { title: 'Edit Offer' })
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
   const id = req.params.id;

   const realEstate = {
      homeName: req.body.homeName,
      type: req.body.type,
      year: req.body.year,
      city: req.body.city,
      image: req.body.image,
      description: req.body.description,
      available: req.body.available,
   };


   try {
      await updateX(id, realEstate);
      res.redirect('/details/' + id);
   } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      realEstate._id = id;
      res.render('edit', { title: 'Create', realEstate, errors })
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
      await likeX(id, userId)
   } catch (err) {
      console.error(err);
   } finally {
      res.redirect('/details/' + id);
   }

});



module.exports = router;



