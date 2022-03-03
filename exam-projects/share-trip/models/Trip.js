const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const tripSchema = new Schema({
   start: { type: String, required: true, minlength: [4, 'Start point must be 4 characters'] },
   end: { type: String, required: true, minlength: [4, 'End point must be 4 characters'] },
   date: { type: String, required: true },
   time: { type: String, required: true },
   carImg: {
      type: String, required: true, validate: {
         validator(value) {
            return URL_PATTERN.test(value);
         },
         message: 'Car image must be valid URL'
      }
   },
   carBrand: { type: String, required: true, minlength: [4, 'Car brand must be 4 characters'] },
   seats: { type: Number, required: true, min: 0, max: 4 },
   price: { type: Number, required: true, min: 1, max: 50 },
   description: { type: String, required: true, minlength: [10, 'Description must be 4 characters'] },
   owner: { type: ObjectId, ref: 'User', required: true },
   buddies: { type: [ObjectId], ref: 'User', default: [] },
})

const Trip = model('Trip', tripSchema);

module.exports = Trip;