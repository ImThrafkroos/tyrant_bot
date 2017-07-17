
// load the command module to create a factory/storage

const CommandModule = require('./command_module.js');

// load the helper library

const Helper = require('./helper_module.js');

class CommandSystem {

	constructor(client, opt) {

		this.setOptions(opt);
		this.commandModules = [];
		this.client = client;
		
	}

	setOptions(opt) {

		this.options = opt;

	}
	
	createModule(name, options = {}) {

		var prefix = (options.prefix !== undefined) ? options.prefix : this.options.config.defaultPrefix;
		var moduleAuthChecker = options.requirements || function(data) { return true; };
		var beforeAction = options.beforeAction;
		
		this.commandModules.push(new CommandModule(prefix, name, !!this.options.log, moduleAuthChecker, beforeAction));

	}

	start() {

		this.client.on('message', (msg) => {

			if (msg.author.id !== this.client.user.id) {

				var obj = {

					client : this.client,
					msg : msg,
					dbManager : this.options.dbManager,
					Helper : Helper

				};
				
				this.interServerCommunication(msg);
				this.stdCommands(obj);
				this.evalCommand(obj);
				this.helpCommand(msg);
				
			}
		});
	}

	interServerCommunication(msg) {

		const SHName = "s3rverhub";

		if (msg.channel.name === SHName) {

			this.client.channels.forEach((ch) => {

				if (ch.name === SHName && ch != msg.channel) {

					ch.send(`**${msg.author.username}:** ${msg.cleanContent}`);

				}

			});
		}
	}

	stdCommands(data) {

		this.commandModules.forEach((module) => {

			if (data.msg.content.startsWith(module.prefix)) {

				module.run(data);
						
			}

		});

	}

	evalCommand(data) {
		
		var client = this.client;

		if (data.msg.content.startsWith('eval ')) {

			if (data.msg.author.id !== this.options.config.owner_id) {

				data.msg.reply("no");
				return;

			}

			try {
					
				eval(data.msg.content.split(" ").slice(1).join(" "));

			} catch(err) {

				data.msg.channel.send(`\`ERROR\` \`\`\`xl\n${Helper.clean(err)}\n\`\`\``);

			}

		}

	}

	helpCommand(msg) {

		if (msg.cleanContent === `@${this.client.user.username} help`) {

			this.sendHelp(msg.author);

		}
		
	}

	sendHelp(author) {

		var message = "";

		this.commandModules.forEach((module) => {

			message += `**${module.name.toUpperCase()}** (prefix: '${module.prefix}')\n\n\n`;

			module.commands.forEach((command) => {
				message += command.help() + "\n\n";
			});

			message += "\n";

		});

		author.send(message);

	}
}

module.exports = CommandSystem;
