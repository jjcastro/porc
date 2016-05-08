var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt 	 = require('bcrypt-nodejs');

// user schema 
var TransactionSchema = new Schema({
  name:        { type: String, required: true },
  description: String,

  date:        { type: Date, default: Date.now }
  _userId:     { type: Schema.Types.ObjectId, required: true },
  
  amount: { 
    isExpense: Boolean,
    value:     { type: Number, required: true },
    currency:  { type: String, default: "COP" }
  },

  tags: [{ name: String, color: String }]
});

module.exports = mongoose.model('Transaction', TransactionSchema);