const Grocery = require('../models/grocery')

async function findAll(ctx) {
  const groceries = await Grocery.find({});
  ctx.body = groceries;
}

async function find(ctx) {
  const entityId = ctx.request.body.id;
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
  grocery.done = !grocery.done;

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
