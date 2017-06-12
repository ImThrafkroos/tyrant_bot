// importing required modules and command system (while assigning it a default prefix)

const Discord = require('discord.js');
const client = new Discord.Client();
const commandSystem = new (require('./command_system.js'))({

	// giving optional settings to the command system

	prefix : '> '

});

// loading config json file

const config = require('./config.json');

// connection/disconnection warnings

client.on("ready", () => {
  console.log('client connected');
});

client.on('disconnect', () => {
	console.log("client disconnected");
});

// running logging preparation processes

console.log("\nStarting tests:\n");

commandSystem.createModule('administration');
commandSystem.createModule('random');
commandSystem.run(client);

console.log("Tests completed, starting client connection\n");

// logging in

client.login(config.token);