
module.exports = {

  CommandSystem : require('./command_system.js'),
  DBManager : require('./db_manager.js'),
  Discord : require('discord.js'),
  
  start : function(commandSystem, client, token) {
    
    commandSystem.start();
    
    client.login(token).catch((err) => {
      console.log("An error has occurred during login...");
    });
    
  }
};
