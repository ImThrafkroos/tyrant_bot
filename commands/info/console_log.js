
module.exports = {
	
	name : "console log",
	triggers : ["log"],
	description : "logs whatever message sent directly to the console",

	arguments : [
		{ name : "message", required : false, multiple : false }
	],

	code : function(data, args) {

		console.log(data.msg.content);

	}

};
