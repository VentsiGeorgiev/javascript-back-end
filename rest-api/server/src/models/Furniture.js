const { model, Schema, Types: { ObjectId } } = require('mongoose');

const furniture = new Schema({
    make: { type: String, required: [true, 'Make is required'] },
    model: { type: String, required: [true, 'Model is required'] },
    year: { type: Number },
    description: { type: String },
    price: { type: Number },
    img: { type: String },
    material: { type: String },
    owner: { type: ObjectId, ref: 'User' }
});

const Furniture = model('Item', furniture);

module.exports = Furniture;