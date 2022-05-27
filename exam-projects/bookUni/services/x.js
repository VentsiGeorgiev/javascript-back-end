// !TODO! # ! change model name !
const modelName = 'Hotel';
const X = require(`../models/${modelName}`);

// async function getAllXs(orderBy) {
//    let sort = { createdAt: -1 };
//    if (orderBy == 'likes') {
//       sort = { users: 'desc' };
//    }
//    return X.find({ isPublic: true }).sort(sort).lean();
// }

async function getAllXs() {
   return X.find({}).lean();
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

   existring.name = x.name;
   existring.city = x.city;
   existring.freeRooms = x.freeRooms;
   existring.imgUrl = x.imgUrl;

   await existring.save();
}

async function deleteById(id) {
   await X.findByIdAndDelete(id);
}

async function likeX(xId, userId) {

   const x = await X.findById(xId);

   if (x.users.includes(userId)) {
      throw new Error('User has already liked!')
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