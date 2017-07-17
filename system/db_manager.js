
const fs = require('fs');

class DBManager {

	constructor(location) {
		
		this.location = '.' + location;
		
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
}

module.exports = DBManager;
