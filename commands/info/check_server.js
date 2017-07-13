
module.exports = {

	name : "check server entry",
	triggers : ["cse"],
	description : "checks whether the server is included in the database",

	code : (data, args) => {
		data.msg.reply(data.dbManager.checkForId({ in : 'servers', id : data.msg.guild.id }).toString());
	}

};
