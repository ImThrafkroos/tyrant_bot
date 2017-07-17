
// Importing required modules and files

const lib = require('./system/tyrant_library.js');
const config = require('./data/config.json');

// Assigning constants

const client = new lib.Discord.Client();
const dbManager = new lib.DBManager('./data/database.json');
const commandSystem = new lib.CommandSystem(client, {
	
	prefix : '> ',
	config : config,
	dbManager : dbManager,
	token : config.token
	
});

// Adding getRole method to the guild class

lib.Discord.Guild.prototype.getRole = function(opt) {
	
	var match;

	this.roles.forEach((role) => {

		if (role.name == opt.name || role.id == opt.id) match = role;

	});

	return match;
	
};

// setting up client events and command modules

require('./on_events.js')(client, dbManager);
require('./initialize_modules.js')(client, commandSystem, config);

lib.start(commandSystem, client, config.token);
