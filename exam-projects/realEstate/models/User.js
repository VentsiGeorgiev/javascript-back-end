const { Schema, model, Types: { ObjectId } } = require('mongoose');

//[x] TODO change user model according to exam description
// TODO add validation

const userSchema = new Schema({
   name: { type: String, required: true },
   username: { type: String, required: true },
   hashedPasword: { type: String, required: true }
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