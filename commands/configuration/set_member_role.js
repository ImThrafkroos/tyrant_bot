
module.exports = {

	name : "set member roles",
	triggers : ["smbr"],
	description : "sets the member role",
	argCheck : true,

	arguments : [
		{ name : "role", required : true, multiple : true }
	]

};
