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

var board = [['', '', ''],
            ['', '', ''],
            ['', '', '']];

function fillBoard(squareID, isX){
  if(isX){
    var playPiece = "X";
  }
  else{
    var playPiece = "O";
  }
  switch(squareID){
    case "square1":
      board[0][1] = playPiece;
      break;
      case "square1":
      board[0][1] = playPiece;
      break;
  }
}

function findWinner(){
  
}
