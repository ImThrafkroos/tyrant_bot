
module.exports = function(client, commandSystem, config) {
  
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
    
  });

  commandSystem.createModule('random');

  commandSystem.createModule('info', {

    prefix : 'info '
    
  });

  commandSystem.createModule('management', {

    prefix : '.'
    
  });
  
}
