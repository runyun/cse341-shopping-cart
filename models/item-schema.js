const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user_id: String,
  name: String,
  amount: Number,
  color: String,
  from_country: String,
  to_country: String,
  purchase_date: Date,
  is_paid: Boolean
},
{ versionKey: false }
);

const item = mongoose.model('Item', itemSchema);

module.exports = item;