const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema(
  {
    count: { type: Number, required: true },
    done: { type: Boolean, required: true },
    name: { type: String, required: true },
  }
);

const Grocery = mongoose.model('Grocery', GrocerySchema);

module.exports = Grocery;