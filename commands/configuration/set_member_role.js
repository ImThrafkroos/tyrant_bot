
module.exports = {

	name : "set member roles",
	triggers : ["smbr"],
	description : "sets the member role",

	arguments : [
		{ name : "role", required : true, multiple : true }
	]

};
