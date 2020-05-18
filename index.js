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
    fillBoard(data.square, data.isTicTac);
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
      board[0][0] = playPiece;
      break;
    case "square2":
      board[0][1] = playPiece;
      break;
    case "square3":
      board[0][2] = playPiece;
      break;
    case "square4":
      board[1][0] = playPiece;
      break;
    case "square5":
      board[1][1] = playPiece;
      break;
    case "square6":
      board[1][2] = playPiece;
      break;
    case "square7":
      board[2][0] = playPiece;
      break;
    case "square8":
      board[2][1] = playPiece;
      break;
    case "square9":
      board[2][2] = playPiece;
      break;
  }
}

function findWinner(){
  
}
