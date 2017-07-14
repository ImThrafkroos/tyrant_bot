
// importing required modules and files

const Discord = require('discord.js');
const config = require('./config.json');
const lib = require('./tyrant_library.js');

// Instantiating classes

const client = new Discord.Client();
const dbManager = new lib.DBManager('./database.json');
const commandSystem = new lib.CommandSystem(client, {
	
	prefix : '> ',
	config : config,
	dbManager : dbManager,
	token : config.token
	
});

// Adding getRole method to the guild class

Discord.Guild.prototype.getRole = function(opt) {
	
	var match;

	this.roles.forEach((role) => {

		if (role.name == opt.name || role.id == opt.id) match = role;

	});

	return match;
	
};


// setting up client events and command modules

require('./on_events.js')(client, dbManager);
require('./initialize_modules.js')(client, commandSystem, config);

commandSystem.start();

client.login(config.token).catch((err) => {
	console.log("An error has occurred during login...");
});
