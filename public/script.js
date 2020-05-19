var socket = io.connect("https://tac-tic-toe.glitch.me/");
const squares = document.querySelectorAll(".emptysquare");
const handle = document.getElementById("handle");
const winningMessage = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

var playerX = true;

function selectSquare(){
  socket.emit("move", {
    handle: handle.value,
    square: this.id,
    isTicTac: playerX
  });
  this.removeEventListener('click', selectSquare);
  if(playerX){
    this.setAttribute('src', 'https://cdn.glitch.com/1613f632-e960-433e-9ef8-9778ae67ee09%2Ftictac.jpg?v=1589836612833');
    playerX = false;
  }
  else{
    this.setAttribute('src', 'https://cdn.glitch.com/1613f632-e960-433e-9ef8-9778ae67ee09%2Ftoe.jpg?v=1589836195603');
    playerX = true;
  }
}

squares.forEach(square => square.addEventListener('click', selectSquare));

socket.on("move", function(data){
  document.getElementById(data.square).removeEventListener('click', selectSquare);
  if(data.isTicTac){
    document.getElementById(data.square).setAttribute('src', 'https://cdn.glitch.com/1613f632-e960-433e-9ef8-9778ae67ee09%2Ftictac.jpg?v=1589836612833');
    playerX = false;
  }else{
    document.getElementById(data.square).setAttribute('src', 'https://cdn.glitch.com/1613f632-e960-433e-9ef8-9778ae67ee09%2Ftoe.jpg?v=1589836195603');
    playerX = true;
  }
});

socket.on("gameEnd", function(data){
  if(data === "Draw") winningMessageTextElement.innerText = 'Draw!'
  if(data === "TicTac") winningMessageTextElement.innerText = 'Draw!'
  winningMessage.classList.add("show");
})





