
module.exports = {

	name : "check server entry",
	triggers : ["cse"],
	description : "checks whether the server is included in the database",

	code : (data, args) => {
		data.msg.reply(data.dbManager.open((db) => { return !!db.servers[data.msg.guild.id] }).toString());
	}

};
