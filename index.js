var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
  console.log("Listening to requests on port 4000");
});

app.set('view engine', 'ejs');
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

function drawYet(){
  var stillSpace = false;
  for(var i=0; i<3; i++){
    for(var j=0; j<3; j++){
      if(board[i][j] === ''){
        stillSpace = true;
        return stillSpace;
      }
    }
  }
  return stillSpace;
}

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
  var res = findWinner();
  if(res === "XXX"){
    io.sockets.emit("gameEnd", "TicTac");
    console.log("TicTac");
  }
  if(res === "OOO"){
    io.sockets.emit("gameEnd", "Toe");
  }
  var stillSpace = drawYet();
  if(!stillSpace){
    io.sockets.emit("gameEnd", "Draw");
    console.log("draww");
  }
}

function findWinner(){
  for(var i=0; i<3; i++){
    var res = board[i][0] + board[i][1] + board[i][2];
    if(res === "XXX"){
      return res;
    }
    if(res === "OOO"){
      return res;
    }
  }
  for(var j=0; j<3; j++){
    var res = board[0][j] + board[1][j] + board[2][j];
    if(res === "XXX"){
      return res;
    }
    if(res === "OOO"){
      return res;
    }
  }
  var res = board[0][0] + board[1][1] + board[2][2];
  if(res === "XXX"){
      return res;
    }
    if(res === "OOO"){
      return res;
    }
  var res = board[0][2] + board[1][1] + board[2][0];
  if(res === "XXX"){
      return res;
    }
    if(res === "OOO"){
      return res;
    }
  return null;
}
