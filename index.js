var express = require("express");
var server = express();

var port = process.env.PORT || 8080
server.listen(port, function(){
  console.log('now listening on port ' + port);
});