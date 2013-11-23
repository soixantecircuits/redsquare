var isNode = typeof global !== "undefined" && {}.toString.call(global) == '[object global]';

  var sendShoot = function() {
    if (isNode) {    
      var shootAdress = settings.osc.shootURI;
      var address = settings.osc.address;
      var port = settings.osc.port;
      var osc = require('node-osc');
      var client = new osc.Client(address, port);
      client.send(shootAdress, "");
    } else {
      console.log("shoot");
    }
    togglesShoot();
  }