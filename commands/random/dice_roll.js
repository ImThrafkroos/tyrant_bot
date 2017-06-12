class DiceRollCommand {
	constructor(client) {
		this.name = "roll";
	}
	
	run(msg, args) {
		var num = Math.floor(Math.random() * 6) + 1;
		msg.reply("you rolled a " + num);
	}
}

module.exports = DiceRollCommand;