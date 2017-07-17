
module.exports = {
	
	name : "", // The name of the command
	triggers : [""], // The list of triggers that run the command if matched
	description : "", // The command description
	format : "", // The command format (automatically generated if not specified)
	parseArgs : false, // Whether to parse the arguments or not

	// The list of arguments the command receives
	arguments : [
		{
			name : "", // The name of the argument
			required : false, // Whether the argument is required
			multiple : false // Whether this argument potentially takes more than 1 parameter
		}
	],

	// A bool-returning function that decides whether the command is to be run 
	// (can also be determined at module level, but is overriden if defined at command level)
	authCheck : function(data) {
		return true;
	},

	// Some action that can (but doesn't have to) be run before the command itself
	beforeAction : {

		exclusive : false, // Whether this before-action overrides the module level one (if not, both will be run)

		// The before-action code itself
		code : function(data) {
			// dummy code
		}
	},

	// The command code itself
	code : function(data, args) {
		// dummy code
	}

};
