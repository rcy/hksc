var HKSC = require('./hksc');

var sc = HKSC.connect({host: 'localhost', port: 8899}, function(connection) {
  connection.send(0, 0, 0, 0);
});
