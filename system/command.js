
const Helper = require('./helper_module.js');

class Command {
	
	constructor(prefix, location, cmdObj, modAuthChecker) {

		this.initialize(prefix, location, cmdObj, modAuthChecker);

	}

	initialize(prefix, location, cmdObj, modAuthChecker) {

		this.prefix = prefix;
		this.location = location;
		this.name = cmdObj.name || "unnamed command";
		this.description = cmdObj.description || "default command description";
		this.triggers = cmdObj.triggers || [];
		this.arguments = cmdObj.arguments || [];
		this.argCheck = !!cmdObj.argCheck;
		this.parseArgs = !!cmdObj.parseArgs;
		this.log = cmdObj.log;
		this.authCheck = cmdObj.authCheck || modAuthChecker;
		this.beforeAction = cmdObj.beforeAction; // always guaranteed to have a value

		this.code = cmdObj.code || function(d, a) {
			
			console.log("empty command run, location: " + this.location)

		};

		this.buildFormat(cmdObj);

	}

	buildFormat(cmd) {
		
		if (cmd.format) return this.format = this.prefix + cmd.format;

		this.format = `${this.prefix}${this.triggers[0]}`;
		
		this.arguments.forEach((arg) => {

			var ob = '[';
			var cb = ']';

			if (arg.required) {

				ob = '<';
				cb = '>'
				
			}
			
			this.format += ` ${ob}"${arg.name}"`;
			
			if (this.parseArgs) {
				
				this.format += ':';
				this.format += arg.multiple ? '(' : '';
				this.format += `${ob}**value`;
				this.format += arg.multiple ? `1**${cb} **...**)` : `**${cb}`;
				
			}
			
			this.format += cb;

		});
		
	}

	exec(data, args) {
		
		if (this.authCheck(data)) {

			if (!this.checkArgs(this.arguments, args)) return 3;

			this.beforeAction.run(data);
			this.code(data, args);
			if (this.log) this.cLog();
			
			return 1;

		} else {

			msg.channel.send("Not authorized");
			return 2;

		}

	}

	checkArgs(cmdArgs, args) {

		if (!this.parseArgs) return true;

		if (!args) return false;

		cmdArgs.forEach((cmdArg) => {

			if (cmdArg.required) if (!args[cmdArg.name]) return false;
			
		});

		return true;

	}

	cLog() {
		console.log(`the "${this.name}" command was executed`);
	}

	help() {
		return `*${this.name}: ${this.description}.*\nformat: ${this.format}`;
	}

	sendHelp(msg) {
		msg.channel.send(this.help(), { reply : msg.author.user });
	}
	
}

module.exports = Command;
