const { Schema, model, Types: { ObjectId } } = require('mongoose');

// [x] TODO change user model according to exam description
// TODO add validation

const userSchema = new Schema({
   username: { type: String, minlength: [3, 'Username should be at least 4 characters'] },
   hashedPasword: { type: String, required: true },
   address: { type: String, minlength: [1, 'Address is required'], maxlength: [20, 'Address should be maximum 20 characters'] },
   publications: { type: [ObjectId], ref: 'User', default: [] },
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