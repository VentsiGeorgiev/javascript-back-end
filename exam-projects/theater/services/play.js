const Play = require('../models/Play');

async function getAllPlays(orderBy) {
   let sort = { createdAt: -1 };
   if (orderBy == 'likes') {
      sort = { users: 'desc' };
   }
   return Play.find({ isPublic: true }).sort(sort).lean();
}

async function getPlayById(id) {
   return Play.findById(id).populate('owner').lean();
};

async function getPlayAndUsers(id) {
   return Play.findById(id).populate('owner').populate('users').lean();
};

async function createPlay(play) {
   const result = new Play(play);
   await result.save();
}

async function updatePlay(id, play) {
   const existring = await Play.findById(id);

   existring.title = play.title;
   existring.description = play.description;
   existring.imgUrl = play.imgUrl;
   existring.isPublic = Boolean(play.isPublic);

   await existring.save();
}

async function deleteById(id) {
   await Play.findByIdAndDelete(id);
}

async function likePlay(playId, userId) {

   const play = await Play.findById(playId);
   console.log(play.users.length);
   if (play.users.includes(userId)) {
      throw new Error('User has already liked the play')
   }


   play.users.push(userId);
   await play.save();
}



module.exports = {
   getAllPlays,
   getPlayById,
   getPlayAndUsers,
   createPlay,
   updatePlay,
   deleteById,
   likePlay
}