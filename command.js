
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

		this.code = cmdObj.code || function(d, a) {
			
			console.log("empty command run, location: " + this.location)

		};

		this.authCheck = cmdObj.authCheck || modAuthChecker;

		this.beforeAction = cmdObj.beforeAction; // always guaranteed to have a value

		this.buildFormat();

	}

	buildFormat() {

		this.format = `${this.prefix}${this.triggers[0]}`;
		
		this.arguments.forEach((arg) => {

			var count = 1;
			var ob = '[';
			var cb = ']';

			if (arg.required) {

				ob = '<';
				cb = '>'
				
			}
			
			

			if (this.parseArgs) {

				this.format += ` ${ob}${arg.name}`;
				this.format += ':';
				this.format += arg.multiple ? '(' : '';
				this.format += `${ob}**value`;
				this.format += arg.multiple ? `1**${cb} **...**)` : `**${cb}`;
				
			} else {

				this.format += count > 1 ? ` | ${arg.name}` : `${ob}${arg.name}`

			}
			
			this.format += cb;

		});
		
	}

	exec(data, args) {
		
		if (this.authCheck(data)) {

			// #todo: create a method for adding prior argument-checking (optional, through a boolean)
			// consider after action as well

			if (this.argCheck) if (!this.checkArgs(this.arguments, args)) return 3;

			this.beforeAction.run(data);
			this.code(data, args);
			this.cLog();
			
			return 1;

		} else {

			msg.channel.send("no");
			return 2;

		}

	}

	checkArgs(cmdArgs, args) {

		if (this.parseArgs) {

			if (!args) return false;
			else return true;

		}

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
