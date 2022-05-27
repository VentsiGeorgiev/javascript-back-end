// [x] !TODO! # ! change model name !
// const modelName = 'x'
const modelName = 'Course';
const X = require(`../models/${modelName}`);

async function getAllXs(orderBy) {
   let sort = { createdAt: -1 };
   if (orderBy == 'likes') {
      sort = { users: 'desc' };
   }
   return X.find({ isPublic: true }).sort(sort).lean();
}

async function getXById(id) {
   return X.findById(id).populate('owner').lean();
};

async function getXAndUsers(id) {
   return X.findById(id).populate('owner').populate('users').lean();
};

async function createX(x) {
   const result = new X(x);
   await result.save();
}

async function updateX(id, x) {
   const existring = await X.findById(id);

   existring.title = x.title;
   existring.description = x.description;
   existring.imgUrl = x.imgUrl;
   existring.isPublic = Boolean(x.isPublic);

   await existring.save();
}

async function deleteById(id) {
   await X.findByIdAndDelete(id);
}

async function likeX(videoId, userId) {

   const video = await X.findById(videoId);
   console.log(video.users.length);
   if (video.users.includes(userId)) {
      throw new Error('User has already liked the video')
   }


   video.users.push(userId);
   await video.save();
}



module.exports = {
   getAllXs,
   getXById,
   getXAndUsers,
   createX,
   updateX,
   deleteById,
   likeX
}