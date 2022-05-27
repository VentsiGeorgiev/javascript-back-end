const { Schema, model, Types: { ObjectId } } = require('mongoose');

// TODO* add validations
const realEstateSchema = new Schema({
   homeName: { type: String, required: true },
   type: { type: String, required: true },
   year: { type: Number, required: true },
   city: { type: String, required: true },
   image: { type: String, required: true },
   description: { type: String, required: true },
   available: { type: Number, required: true },
   owner: { type: ObjectId, ref: 'User', required: true },
   users: { type: [ObjectId], ref: 'User', default: [] },
});

const RealEstate = model('RealEstate', realEstateSchema);

module.exports = RealEstate;
