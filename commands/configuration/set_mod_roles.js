
module.exports = {

	name : "set mod roles",
	triggers : ["smdr"],
	description : "sets the mod roles",
	argCheck : true,
	parseArgs : true,

	arguments : [
		{ name : "role", required : true, multiple : true }
	]

};
