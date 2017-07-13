
// load the command module to create a factory/storage

const CommandModule = require('./command_module.js');

// load the helper library

const Helper = require('./helper_module.js');

class CommandSystem {

	constructor(opt) {

		this.setOptions(opt);
		this.commandModules = [];
		
	}

	setOptions(opt) {

		this.options = opt;

	}
	
	createModule(name, options = {}) {

		var prefix = (options.prefix !== undefined) ? options.prefix : this.options.config.defaultPrefix;
		var moduleAuthChecker = options.requirements || function(data) { return true; };
		var beforeAction = options.beforeAction;// || function(data) {}; // unnecessary after changes in code
		
		this.commandModules.push(new CommandModule(prefix, name, moduleAuthChecker, beforeAction));

	}

	run(client) {

		//console.log(this);

		client.on('message', (msg) => {

			if (msg.author.id !== client.user.id) {

				var obj = {

					client : client,
					msg : msg,
					dbManager : this.options.dbManager,
					Helper : Helper

				};

				// onMessageDebugging(client, msg);

				this.interServerCommunication(client, msg);
				this.stdCommands(obj);
				this.evalCommand(client, obj);
				this.helpCommand(client, msg);
				// this.subscribeAll(client);

			}
		});
	}

	// #todo: add guild-wide role checking to see if anyone is missing the member role
	// more comments just to make me notice this later
	// more commenting again
	// still more commenting

	/*
	subscribeAll(client) {

		this.subscribeToOnGuildMemberAdd(client)
		
	}

	subscribeToOnGuildMemberAdd(client) {

		client.on('guildMemberAdd', (member) => {

			dbManager.open((data) => {

				if (!data.servers[member.guild.id]) ;
				
				if (data.servers[member.guild.id].memberRole) {

					member.addRole(member.guild.getRole({ id : data.servers[member.guild.id].memberRole }));

				} else {

					member.guild.defaultChannel.send("No default role is set for new members");
					
				}
			});
		});

	}
	*/

	onMessageDebugging(client, msg) {

		// Echoing
		msg.reply(msg.content);

	}

	interServerCommunication(client, msg) {

		const SHName = "server_hub";

		if (msg.channel.name === SHName) {

			client.channels.forEach((ch) => {

				if (ch.name === SHName && ch != msg.channel) {

					ch.send(`**${msg.author.username}:** ${msg.cleanContent}`);

				}

			});
		}
	}

	stdCommands(data) {

		this.commandModules.forEach((module) => {

			if (data.msg.content.startsWith(module.prefix)) {
						
				console.log("the command system gave control to the " + module.name + " module");

				module.run(data);
						
			}

		});

	}

	evalCommand(client, data) {

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

	helpCommand(client, msg) {

		if (msg.cleanContent === `@${client.user.username} help`) {

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
