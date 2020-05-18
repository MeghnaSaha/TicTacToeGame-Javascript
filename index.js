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
  socket.on("chat", function(data){
    console.log(data);
    io.sockets.emit("chat", data);
  });
  socket.on("typing", function(data){
    socket.broadcast.emit("typing", data);
  });
});
