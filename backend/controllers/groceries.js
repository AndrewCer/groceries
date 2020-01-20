const Grocery = require('../models/grocery')

async function findAll(ctx) {
  const groceries = await Grocery.find({});
  ctx.body = groceries;
}

async function find(ctx) {
  if (!ctx.params || !ctx.params.id) {
    throw new Error(400, 'No ID in request');
  }
  const entityId = ctx.params.id;
  const grocery = await Grocery.findById(entityId);
  ctx.body = grocery;
}


async function create(ctx) {
  const newGrocery = new Grocery(ctx.request.body);
  const savedGrocery = await newGrocery.save();
  ctx.body = savedGrocery
}

async function remove(ctx) {
  const id = ctx.params.id;
  const grocery = await Grocery.findById(id);

  const deletedGrocery = await grocery.remove();
  ctx.body = deletedGrocery;
}

async function update(ctx) {
  const id = ctx.params.id;
  const grocery = await Grocery.findById(id);

  const groveryUpdates = ctx.request.body;
  grocery.name = groveryUpdates.name;
  grocery.done = groveryUpdates.done;
  grocery.count = groveryUpdates.count;

  const updatedGrocery = await grocery.save();
  ctx.body = updatedGrocery;
}

module.exports = {
  findAll,
  find,
  create,
  remove,
  update
}
