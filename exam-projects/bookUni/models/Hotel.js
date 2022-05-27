const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

// TODO* add validations
const hotelSchema = new Schema({
   name: { type: String, minlength: [4, 'The name should be at least 4 characters'] },
   city: { type: String, minlength: [3, 'The city should be at least 3 characters long'] },
   imgUrl: {
      type: String, validate: {
         validator(value) {
            return URL_PATTERN.test(value)
         },
         message: 'Image must be a valid URL'
      }
   },
   freeRooms: { type: Number, required: [true, 'Free room is required and must be between 1 and 100'], min: 1, max: 100 },
   users: { type: [ObjectId], ref: 'User', default: [] },
   owner: { type: ObjectId, ref: 'User', required: true },
});

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;

// •	The name should be at least 4 characters
// •	The city should be at least 3 characters long
// •	The imageUrl should starts with http or https
// •	The number of free rooms should be between 1 and 100
