const Furniture = require('../models/Furniture');

async function getAll() {
    return Furniture.find({});
}

async function getById(id) {
    return Furniture.findById(id);
}

async function create(item) {
    const result = new Furniture(item);

    await result.save();

    return result;
}

async function update(id, item) {
    const existing = await Furniture.findById(id);

    existing.make = item.make;
    existing.model = item.model;
    existing.year = item.year;
    existing.description = item.description;
    existing.price = item.price;
    existing.img = item.img;
    existing.material = item.material;

    await existing.save();

    return existing;
}

async function deleteById(id) {
    await Furniture.findByIdAndDelete(id);
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById
};