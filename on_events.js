
var subscribe = function(client, db) {
  
  client.on('ready', () => {
    console.log('client connected');
    console.log();
  });

  client.on('disconnect', () => {
    console.log("client disconnected");
    console.log();
  });
  
}

module.exports = subscribe;
