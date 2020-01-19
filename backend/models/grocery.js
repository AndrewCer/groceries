const mongoose = require('mongoose');
 
const GrocerySchema = new mongoose.Schema(
  {
    count: Number,
    done:  Boolean,
    name: String,
  }
);

const Grocery = mongoose.model('Grocery', GrocerySchema);

module.exports = Grocery;