
// importing required modules

const Discord = require('discord.js');

Discord.Guild.prototype.getRole = function(opt) {

	var match = this.roles.forEach((role) => {

		if (role.name == opt.name || role.id == opt.id) return role;

	});

	return match;
	
};

const client = new Discord.Client();

// loading config json file

const config = require('./config.json');

// instantiating DBManager class object

const dbManager = new (require('./db_manager.js'))('./database.json');

const commandSystem = new (require('./command_system.js'))({

	// giving optional settings to the command system

	prefix : '> ',
	config : config,
	dbManager : dbManager

});

// connection/disconnection warnings

client.on("ready", () => {
  console.log('client connected');
});

client.on('disconnect', () => {
	console.log("client disconnected");
});

// running logging preparation processes

console.log("\nStarting tests:\n");

commandSystem.createModule('administration', {

	requirements : (data) => {

		return data.msg.author.id == config.owner_id;
		
	}
	
});

commandSystem.createModule('configuration', {

	prefix : 'config ',

	requirements : (data) => {

		return data.msg.member.permissions.has('ADMINISTRATOR');
		
	},

	beforeAction : (data) => {
		
		var server_id = data.msg.guild.id;
		
		if (!data.dbManager.open((err, db) => { if (err) throw err; return !!db.servers[server_id] })) {

			data.msg.channel.send("server not present in the database. adding...")
			data.dbManager.open((err, db) => { if (err) throw err; db.servers[server_id] = {} }, true);
			data.msg.channel.send("The current server has been added to the database");

		}	
	}

});

commandSystem.createModule('automatic', {

	prefix : ''
	
})

commandSystem.createModule('random');

commandSystem.createModule('economy', {

	prefix : '$ '
	
});

commandSystem.createModule('info', {

	prefix : 'info '
	
});

commandSystem.createModule('management', {

	prefix : '.'
	
});

commandSystem.run(client);

console.log("Tests completed, starting client connection\n");

// logging in

client.login(config.token).catch((err) => {
	console.log("An error has occurred during login...");
});
