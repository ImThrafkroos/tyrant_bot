
const fs = require('fs');

class DBManager {

	constructor(location) {
		
		this.location = location;
		
	}

	open(callback, save) {

		var error, data;
		
		try {
			
			data = require(this.location);
			
		} catch (err) {

			error = err;
			
		}

		if (!data) return console.log("BIG PROBLEM, CHECK DBManager IMMEDIATELY");

		var returned = callback(error, data);

		if (!data) return console.log("EXTREMELY BIG PROBLEM DETECTED, EMPTY DATA AFTER CALLBACK");

		if (save) {
			this.save(data);
		}

		return returned;

	}

	save(data) {

		console.log("Saving data to file... data: \n\t" + data);

		fs.writeFile(this.location, JSON.stringify(data), (err) => {
		
    	if (err) throw err;

		});
	}

	// #todo: consider using eval to search for something in a specific part of the json file
	// #todo: create 2 basic methods ("edit", and "access"), that allow to either edit or simply access
	// 				part of the database.

	/*
		example: dbManager.access({
			location : 'servers.<id>', save : false }, (server) => {
			var memberRoleId = server.memberRole;
		});
	*/

	/*
	access(options, callback) {

		this.open((err, data) => {

			if (err) throw err;
			var evalString1 = `return data.${options.location};`
			var evalString2 = `data.${options.location} = newdata;`
			var newdata = eval(evalString);
			callback(newdata);
			eval(evalString2);
			
		}, !!options.save);
		
	}
	*/

	createInRecord(params) {

		var record = params.in;
		var id = params.id;

		this.open((err, data) => {

			if (err) throw err;
			if (!data[record]) return console.log(`The requested record (${record}) is nonexistent`);
			if (!this.checkForId({ in : record, id : id })) data[record][id] = {};
			
		});
	}

	checkForId(params) {

		var output = false;
		var record = params.in;
		var id = params.id;

		this.open((err, data) => {

			if (err) throw err;
			if (!data[record]) return output = false;
			if (data[record][id]) output = true;

		}, false);

		return output;
		
	}

	getById(params) {

		var output;
		var record = params.in;
		var id = params.id;

		this.open((err, data) => {

			if (err) throw err;
			if (!data[record]) return console.log(`The requested record (${record}) is nonexistent`);
			output = data[record][id];
			
		});

		return output;
		
	}
	
}

module.exports = DBManager;
