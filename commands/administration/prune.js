const Command = require("../../command.js");

class PruneCommand extends Command {

	constructor() {
		
		super({
			name : "",
			triggers : []
		});
	}

}

module.exports = PruneCommand;