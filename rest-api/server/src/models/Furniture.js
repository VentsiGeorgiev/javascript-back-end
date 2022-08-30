const { model, Schema } = require('mongoose');

const furniture = new Schema({
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    description: { type: String },
    price: { type: Number },
    img: { type: String },
    material: { type: String }
});

const Furniture = model('Item', furniture);

module.exports = Furniture;