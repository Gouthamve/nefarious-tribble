var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
	fname: String,
	cname: String,
	phone: String,
	email: String
});

module.exports = mongoose.model('Member', memberSchema);
