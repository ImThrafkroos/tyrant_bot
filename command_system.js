const CommandModule = require('./command_module.js');

const config = require('./config.json');

class CommandSystem {

	constructor(opt) {

		this.setOptions(opt);
		this.commandModules = [];
		
	}

	setOptions(opt) {

		this.options = opt || {
			prefix : '> '
		};
		
	}
	
	createModule(name, prefix) {
		this.commandModules.push(new CommandModule(prefix || this.options.prefix, name));
	}

	run(client) {
		client.on('message', (msg) => {
			this.commandModules.forEach((module) => {
				if (msg.content.startsWith(module.prefix)) {
					module.run(msg);
				}
			});

			if (msg.content.startsWith('eval')) {
				if (msg.author.id !== config.owner_id) {
					msg.reply("no");
				}

				try {
					var evaled = eval(msg.content.slice(5));

					if (typeof evaled !== "string") {
						evaled = require('util').inspect(evaled);
					}

					msg.channel.sendCode(xl, clean(evaled));
				} catch (err) {
					message.channel
				}
			}
		});
		
	}
}

module.exports = CommandSystem;