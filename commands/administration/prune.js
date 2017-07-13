
module.exports = {

	name : "purge",
	triggers : ["purge", "prune"],
	description : "deletes messages in bulk",

	arguments : [
		{ name : "number", required : true }
	],

	code : function(data, args) {

		data.msg.channel.send("purging " + args[0] + " messages...");

	}

};
