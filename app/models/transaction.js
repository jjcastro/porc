var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

// user schema 
var TransactionSchema   = new Schema({
	amount: String,
	currency: "COP",
	user: ObjectId
});

module.exports = mongoose.model('Transaction', TransactionSchema);