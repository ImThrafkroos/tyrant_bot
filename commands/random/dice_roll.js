
module.exports = {

	name : "dice roll",
	triggers : ["roll"],
	description : "rolls a die",

	arguments : [
		{ name : "sides", required : false }
	],

	code : function(data, args) {

		data.msg.channel.send(Math.random() * (args.sides || 6) + 1);

	}

};
