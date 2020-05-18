var socket = io.connect("https://tac-tic-toe.glitch.me/");

const squares = document.querySelectorAll(".emptysquare");

function selectSquare(){
  this.removeEventListener('click', selectSquare);
  this.setAttribute('src', 'https://cdn.glitch.com/1613f632-e960-433e-9ef8-9778ae67ee09%2Ftoe.jpg?v=1589836195603');
}

squares.forEach(square => square.addEventListener('click', selectSquare));

