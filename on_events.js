
var subscribe = function(client, db) {
  
  client.on('ready', () => {
    console.log('client connected');
  });

  client.on('disconnect', () => {
    console.log("client disconnected");
  });
  
}

module.exports = subscribe;
