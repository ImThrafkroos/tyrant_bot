// load the command module to create a factory/storage

const CommandModule = require('./command_module.js');
const Helper = require('./helper_module.js');

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
					return;
				}

				try {
					var evaled = eval(msg.content.slice(5));

					if (typeof evaled !== "string") {
						evaled = require('util').inspect(evaled);
					}

					msg.channel.sendCode("xl", Helper.clean(evaled));
				} catch(err) {
					msg.channel.send(`\`ERROR\` \`\`\`xl\n${Helper.clean(err)}\n\`\`\``);
				}
			}
		});
		
	}
}

module.exports = CommandSystem;