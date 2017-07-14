
module.exports = {

	name : "purge",
	triggers : ["purge", "prune", "delete"],
	description : "deletes messages in bulk",
  parseArgs : true,

	arguments : [
		{ name : "number", required : true }
	],

	code : function(data, args) {

		data.msg.channel.send("deleting " + args.number + " messages...");

	}

};
