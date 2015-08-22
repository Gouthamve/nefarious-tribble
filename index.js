var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var GoogleSpreadsheet = require("google-spreadsheet");
var mongoose = require('mongoose');

var Team = require('./models/team');

mongoose.connect("mongodb://localhost/nvision_api")

app.use(cors());
app.use(bodyParser.json())

var sheet = new GoogleSpreadsheet(
	'1AnIQidAGKILuAp0qVC5gvlkfgqwKooej0naoMs4V0ok');

var creds = require('./workshop-fa52caa19ac8.json');

sheet.useServiceAccountAuth(creds, function(err) {
	var addTeamToSheet = function(team) {
		var teamRow = {};
		for (i = 0; i < team.length; i++) {
			teamRow["name_" + (i + 1)] = team[i].fname;
			teamRow["cname_" + (i + 1)] = team[i].cname;
			teamRow["phone_" + (i + 1)] = team[i].phone;
			teamRow["email_" + (i + 1)] = team[i].email;
		}
		sheet.addRow(1, teamRow);
	}

	app.post('/workshop', function(req, res, next) {
		var newTeam = new Team({
			members: req.body
		});
		newTeam.save(function(err) {
			if (err) {
				console.log(err)
				res.json({
					success: false
				})
			} else if (newTeam.members.length && newTeam.members[0].fname) {
				res.json({
					success: true
				})
				addTeamToSheet(req.body);
			} else {
				console.log(newTeam.members.length, newTeam.members[0].fname)
				res.json({
					success: false
				})
			}
		})
	});

	app.listen(3000, function() {
		console.log('CORS-enabled web server listening on port 80');
	});

})
