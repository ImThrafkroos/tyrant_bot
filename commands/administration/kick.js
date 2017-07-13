
module.exports = {
	
	name : "kick",
	triggers : ["kick"],
	description : "kicks users from the server",
	parseArgs : true,
	argCheck : true,

	arguments : [
		{ name : "members", required : true, multiple : true }
	],

	code : function(data, args) {

		args.forEach((arg) => {
			data.msg.channel.send(arg + " has been kicked (not really tho)");
		});

		//msg.mentions.members.forEach((member) => {

			//if (member.kickable) {
				
				//member.kick;

			//}
			
		//});

	}

};
