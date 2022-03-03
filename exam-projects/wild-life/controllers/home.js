const { isUser } = require('../middleware/guards');
const { getPosts, getPostById, getPostsByAuthor } = require('../services/post');
const { postViewModel } = require('../util/mappers');

const router = require('express').Router();

// # home
router.get('/', (req, res) => {
   res.render('home', { title: 'Home page' })
});

// # catalog
router.get('/catalog', async (req, res) => {
   const posts = (await getPosts()).map(postViewModel);
   res.render('catalog', { title: 'Catalog', posts })
});

// # catalog details 
router.get('/catalog/:id', async (req, res) => {
   const id = req.params.id;
   const post = postViewModel(await getPostById(id));

   if (req.session.user) {
      post.hasUser = true;
      if (req.session.user._id == post.author._id) {
         post.isAuthor = true;
      } else {
         //[x] TODO check votes

         post.hasVoted = post.votes.find(v => v._id == req.session.user._id) != undefined;
      }
   }

   res.render('details', { title: post.title, post })
})

// # my post page / profile
router.get('/profile', isUser(), async (req, res) => {
   const posts = (await getPostsByAuthor(req.session.user._id)).map(postViewModel);
   res.render('profile', { title: 'My posts', posts })
})

module.exports = router;