const { Schema, model, Types: { ObjectId } } = require('mongoose');

// !TODO! add validations
const courseSchema = new Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   imgUrl: { type: String, required: true },
   isPublic: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now },
   owner: { type: ObjectId, ref: 'User', required: true },
   users: { type: [ObjectId], ref: 'User', default: [] },
});

const Course = model('Course', courseSchema);

module.exports = Course;

// •	Title - string(required),
// •	Description - string(required),
// •	Image Url - string(required),
// •	Is Public - boolean, default - false,
// •	Created at – Date or String, required,
// •	Users Enrolled - a collection of Users
