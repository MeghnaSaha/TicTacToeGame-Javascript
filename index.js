var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
  console.log("Listening to requests on port 4000");
});

app.use(express.static("public"));

var io = socket(server);
io.on("connection",function(socket){
  console.log("Socket connection made at" , socket.id);
  socket.on("move", function(data){
    console.log(data)
    socket.broadcast.emit("move", data);
  });
});
