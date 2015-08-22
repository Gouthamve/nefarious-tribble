var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
	fname: String,
	cname: String,
	phone: String,
	email: String
});

var teamSchema = new Schema({
	members: [memberSchema]
});

module.exports = mongoose.model('Team', teamSchema);
