// !TODO! # ! change model name !
// const modelName = 'x'
// const modelName = 'RealEstate';
const X = require('../models/RealEstate');

async function getAllXs(orderBy) {
   let sort = { createdAt: -1 };
   if (orderBy == 'likes') {
      sort = { users: 'desc' };
   }
   // return X.find({ isPublic: true }).sort(sort).lean();
   return X.find({}).lean();
}

async function getXById(id) {
   return X.findById(id).populate('owner').populate('users', 'username').lean();
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
   existring.homeName = x.homeName;
   existring.type = x.type;
   existring.year = x.year;
   existring.city = x.city;
   existring.image = x.image;
   existring.description = x.description;
   existring.available = x.available;

   await existring.save();
}

async function deleteById(id) {
   await X.findByIdAndDelete(id);
}

async function likeX(xId, userId) {
   const x = await X.findById(xId);

   if (x.users.includes(userId)) {
      throw new Error('User has already rent the property!')
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
   likeX
}