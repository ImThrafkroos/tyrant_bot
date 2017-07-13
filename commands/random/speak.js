
module.exports = {

	name : "speak",
	triggers : ["say", "speak"],
	description : "echoes a message",

	arguments : [
		{ name : "number", required : true }
	],

	code : function(data, args) {
		
		data.msg.channel.send(args);
		data.msg.delete();
		
	}

};
