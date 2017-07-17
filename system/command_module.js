
const fs = require('fs');
const path = require('path');

const Command = require('./command.js');

const Helper = require('./helper_module.js');

class CommandModule {

	constructor(pf, nm, log, moduleAuthChecker, moduleBeforeAction) {

		this.prefix = pf;
		this.name = nm;
		this.log = log;
		this.folderPath = './commands/' + this.name + '/';
		this.moduleAuthChecker = moduleAuthChecker;
		this.moduleBeforeAction = moduleBeforeAction;

		if (this.log) console.log("Module created, data:", [this.prefix, this.name, this.folderPath], '\n');

		this.loadCommands();

		// Some (excessive) logging for bug-catching

		//console.log(this);
		//console.log(this.commands);

	}

	loadCommands() {

		this.commands = [];
		this.folderPath = path._makeLong(this.folderPath);
		
		var files = fs.readdirSync(this.folderPath).forEach((file) => {

			var loc = path.join(this.folderPath, file);

			// editing the cmdObj object
			
			var cmdObj = require(loc);
			
			cmdObj.log = this.log;

			var actions = [];

			if (cmdObj.beforeAction) {

				if (cmdObj.beforeAction.code) {

					actions.push(cmdObj.beforeAction.code);
					delete cmdObj.beforeAction.code; // deleting a (now) useless property

				}
			} else cmdObj.beforeAction = {};

			if (!cmdObj.beforeAction.exclusive) actions.push(this.moduleBeforeAction);

			// reverting the array to make sure the module beforeAction runs first

			cmdObj.beforeAction.actions = actions.reverse();

			// declaring the beforeAction.run() method

			cmdObj.beforeAction.run = function(data) {

				this.actions.forEach((action) => {

					if (action) action(data);

				});
			};
			
			this.commands.push(new Command(this.prefix, loc, cmdObj, this.moduleAuthChecker));

		});

		if (this.log){
			
			this.commands.forEach((cmd) => {
				console.log('"' + cmd.name + '" command has been loaded');
			});
	
			console.log();
			
		}
	}

	run(data) {

		this.commands.forEach((cmd) => {

			var text = data.msg.content.slice(this.prefix.length).trim();
			var check = false;
			var help = false;

			if (text.startsWith("help")) {

				help = true;
				text = text.split(" ").slice(1).join(" ");
				
			}

			cmd.triggers.forEach((t) => {

				if (text.startsWith(t)) {
					
					check = true;

				}

			});

			if (check) {

				// The actual command or help part

				if (help) {
					
					cmd.sendHelp(data.msg);

				} else {

					if (this.log) console.log('the command module tried running the "' + cmd.name + '" command');

					// Running the command while using the return value in a switch statement
					var returnValue = cmd.exec(data, this.parseArgs(cmd, text));
					
					if (data.log) switch (returnValue) {
						case 0:
							console.log("command execution failed");
							break;
						case 1:
							console.log("command execution was successful");
							break;
						case 2:
							console.log("command access denied");
							break;
						case 3:
							console.log("error during argument checking.\nformat:", cmd.format)
							break;
						default:
							console.log("an unexpected error occurred, check the run() method in command_module");
							break;
					}
				}
			}
		});
	}

	parseArgs(cmd, text) {

		if (!cmd.parseArgs) return text; // set the returned value if not to be parsed.
		
		var match, myRegex = /\w+:(\[?.+\]?|\S+)/g, args = [], output = {};
		
		while (match = myRegex.exec(text)) {
			args.push(match[0]);
		}

		cmd.arguments.forEach((cmdArg) => {

			var value;

			args.forEach((arg) => {
				
				var n = 1;

				if (!arg.startsWith(cmdArg.name + ':')) return; // stop the execution if not the right argument

				value = arg.split(':')[1] // extract the part after the colon and assign it to 'value'

				if (cmdArg.multiple) value = /\[(.+)\]/.exec(value)[1].trim().split(' '); // if multiple, remove the '[]'
				
			});

			output[cmdArg.name] = value; // assign to this the refined value.
			
		});

		return output
		
	}

}

module.exports = CommandModule;
