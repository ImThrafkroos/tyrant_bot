const fs = require('fs');

class CommandModule {

	constructor(pf, nm) {

		this.prefix = pf;
		this.name = nm;
		this.folderPath = './commands/' + this.name + '/';

		console.log("Module created properly, data:", [this.prefix, this.name, this.folderPath], '\n');

		this.loadCommands();

	}

	loadCommands() {

		this.commands = [];
		
		var files = fs.readdirSync(this.folderPath).forEach((file) => {
			this.commands.push(new (require(this.folderPath + file)));
		});

		this.commands.forEach((cmd) => {
			console.log('"' + cmd.name + '" command has been loaded');
		});

		console.log();

	}

	run(msg) {
		this.commands.forEach((cmd) => {
			var text = msg.content.slice(this.prefix.length);
			var check = false;

			cmd.triggers.forEach((t) => {
				if (text.startsWith(t)) {
					check = true;
				}
			});

			if (check) {
				cmd.run(msg, text.split(" ").slice(1));
			}
		});
	}

}

module.exports = CommandModule;