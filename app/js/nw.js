var isNode = typeof global !== "undefined" && {}.toString.call(global) == '[object global]';
if (isNode) {
  var shoot = function() {
    var shootAdress = settings.osc.shootURI;
    var address = settings.osc.address;
    var port = settings.osc.port;
    var osc = require('node-osc');
    var client = new osc.Client(address, port);
    client.send(shootAdress, "");
  }
} else {
  var shoot = function() {
    console.log("shoot");
  }
}