var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// user schema 
var TransactionSchema = new Schema({
  name:        { type: String, required: true },
  description: String,

  date:        { type: Date, default: Date.now },
  username:    { type: String, required: true },
  
  isExpense:   Boolean,
  amount:       { type: Number, required: true },
  currency:    { type: String, default: "COP" },

  tags: [{ name: String, color: String }]
});

module.exports = TransactionSchema;