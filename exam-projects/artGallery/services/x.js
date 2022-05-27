// !TODO! # ! change model name !
// const modelName = 'x'
const modelName = 'Art';
const X = require(`../models/${modelName}`);

async function getAllXs(orderBy) {
   let sort = { createdAt: -1 };
   if (orderBy == 'likes') {
      sort = { users: 'desc' };
   }
   // return X.find({ isPublic: true }).sort(sort).lean();
   return X.find({}).sort(sort).lean();
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
   existring.technique = x.technique;
   existring.imgUrl = x.imgUrl;
   existring.certificate = x.certificate;

   await existring.save();
}

async function deleteById(id) {
   await X.findByIdAndDelete(id);
}

async function shareX(xId, userId) {

   const x = await X.findById(xId);
   console.log(x.users.length);
   if (x.users.includes(userId)) {
      throw new Error('User has already shared!')
   }


   x.users.push(userId);
   await x.save();
}



module.exports = {
   getAllXs,
   getXById,
   getXAndUsers,
   createX,
   updateX,
   deleteById,
   shareX
}