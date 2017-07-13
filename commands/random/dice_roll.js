
module.exports = {

	name : "dice roll",
	triggers : ["roll"],
	description : "rolls a die",

	arguments : [
		{ name : "number", required : true }
	],

	code : function(data, args) {

		data.msg.channel.send(Math.random() * 6 + 1);

	}

};
