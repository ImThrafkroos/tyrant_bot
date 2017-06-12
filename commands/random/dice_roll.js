class DiceRollCommand {
	constructor(client) {
		arr = {
			name : 'roll',
			memberName : 'roll',
			description : 'roll a die'
		};
	}
	
	run(msg, args) {
		var num = Math.floor(Math.random() * 6) + 1;
		msg.reply("you rolled a " + num);
	}
}

module.exports = DiceRollCommand;