
module.exports = {

	name : "speak",
	triggers : ["say", "speak"],
	description : "echoes a message",

	arguments : [
		{ name : "message" }
	],

	code : function(data, args) {
		
		data.msg.channel.send(args);
		data.msg.delete();
		
	}

};
