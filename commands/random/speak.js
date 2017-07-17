
module.exports = {

	name : "speak",
	triggers : ["say", "speak"],
	description : "echoes a message",

	arguments : [
		{ name : "message" }
	],

	code : function(data, args) {
		
		data.msg.channel.send(args.split(' ').slice(1).join(' '));
		data.msg.delete();
		
	}

};
