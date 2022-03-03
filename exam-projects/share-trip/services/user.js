const User = require('../models/User');
const { hash, compare } = require('bcrypt');

// [x] TODO add all fields required by the exam
async function register(email, password, gender) {
   const existing = await getUserByEmail(email);
   console.log(existing)

   if (existing) {
      throw new Error('Email is taken');
   }

   const hashedPasword = await hash(password, 10);

   const user = new User({
      email,
      hashedPasword,
      gender
   });

   await user.save();

   return user;
}

// [x] TODO change identifier
async function login(email, password) {
   const user = await getUserByEmail(email);

   if (!user) {
      throw new Error('Incorrect email or password');
   }

   const hasMatch = await compare(password, user.hashedPasword);
   if (!hasMatch) {
      throw new Error('Incorrect email or password');
   }

   return user;
}

// [x] TODO identify user by given identifier
async function getUserByEmail(email) {
   const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

   return user;
}

module.exports = {
   login,
   register
}