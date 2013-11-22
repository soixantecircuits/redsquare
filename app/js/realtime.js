var tryreconnect;
var delay = 1000;

if(typeof(io) != "undefined"){
  var socket = io.connect(settings.socketIO.server+":"+settings.socketIO.port,{"force new connection":true});
  if(!socket.socket.connected)
    tryreconnect = setInterval(function reconnection(){
      if(!socket.socket.connected)
        socket = io.connect(settings.socketIO.server+":"+settings.socketIO.port, {"force new connection":true});
      
      if(socket.socket.connected) {
        socket.on('new-image', function (data) {
          var src = "file://"+data.src;
          displayImage(src);
        });
        clearInterval(tryreconnect);
      } else {
        console.warn("Trying to reconnect...in: ", delay);
      }
    },delay);  
} else {
  console.warn("No Websocket connection, verify server is running.");
}