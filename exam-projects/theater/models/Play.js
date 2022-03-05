const { Schema, model, Types: { ObjectId } } = require('mongoose');

// TODO* add validations
const playSchema = new Schema({
   title: { type: String, minlength: [1, 'You can not have empty fields'] },
   description: { type: String, minlength: [1, 'You can not have empty fields'] },
   imgUrl: { type: String, minlength: [1, 'You can not have empty fields'] },
   isPublic: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now },
   owner: { type: ObjectId, ref: 'User', required: true },
   users: { type: [ObjectId], ref: 'User', default: [] },
});

const Play = model('Play', playSchema);

module.exports = Play;