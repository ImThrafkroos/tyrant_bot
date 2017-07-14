
module.exports = {
	
	name : "kick",
	triggers : ["kick"],
	description : "kicks users from the server",
	parseArgs : true,

	arguments : [
		{ name : "members", required : true, multiple : true }
	],

	code : function(data, args) {
		
		data.Helper.parseMentions(args.members).members.forEach((arg) => {
			data.msg.channel.send(`<@${arg}>` + " has been kicked (not really tho)");
		});

	}

};
