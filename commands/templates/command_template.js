
module.exports = {
	
	name : "",
	triggers : [""],
	description : "",
	parseArgs : false,
	argCheck : false,

	arguments : [
		{ name : "", required : false, multiple : false }
	],

	authCheck : function(data) {
		return true;
	},

	beforeAction : {

		exclusive : false,

		code : function(data) {
			// dummy code
		}
	},

	code : function(data, args) {
		// dummy code
	}

};
