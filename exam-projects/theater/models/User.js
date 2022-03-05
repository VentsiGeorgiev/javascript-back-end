const { Schema, model, Types: { ObjectId } } = require('mongoose');

// [x] TODO change user model according to exam description
// TODO add validation

const userSchema = new Schema({
   username: { type: String, minlength: [3, 'Username must be at least 3 characters long'] },
   hashedPasword: { type: String, required: true },
   plays: { type: [ObjectId], req: 'Play', default: [] }
});

userSchema.index({ username: 1 }, {
   unique: true,
   collation: {
      locale: 'en',
      strength: 2
   }
});

const User = model('User', userSchema);

module.exports = User;