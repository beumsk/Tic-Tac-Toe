
// improve AI

var playerSign = "";
var compSign = "";
var grid = ["e","e","e", "e","e","e", "e","e","e"];
var turn = 0;
var isFinished = false;

var dark = document.querySelector("#dark");
var message = document.querySelector("#message");
var playX = document.querySelector("#playX");
var playO = document.querySelector("#playO");
var plays = document.querySelectorAll(".play");

playX.addEventListener("click", startGame);
playO.addEventListener("click", startGame);

// choose sign
function startGame(e) {
  clearInterval(checkPageInterval);
  dark.classList.add("hidden");
  playerSign = e.target.getAttribute("data-sign");
  compSign = playerSign === "x" ? "o" : "x";
  for (var i=0; i<plays.length; i++) {
    plays[i].addEventListener("click", playerMove);
  }
}

// player move
function playerMove(e) {
  e.target.innerHTML = playerSign;
  e.target.classList.remove("playable");
  grid[e.target.id] = playerSign;
  turn++;
  checker("player");
  if (turn < 8 && !isFinished) {
    setTimeout(function() {
      compMove();
    }, 200);
  }
  e.target.removeEventListener("click", playerMove);
}

// AI move
function compMove() {
  var randd = rand(plays.length);
  while (grid[randd] === playerSign || grid[randd] === compSign) {
    randd = rand(plays.length);
  }
  plays[randd].innerHTML = compSign;
  plays[randd].classList.remove("playable");
  plays[randd].removeEventListener("click", playerMove);
  grid[randd] = compSign;
  turn++;
  setTimeout(function() {
    checker("comp");
  }, 100);
}

// end game checker (win, lose, tie)
function checker(whoo) {
  // win
  if ( (whoo === "player") && (gridCheck(playerSign)) ) {
    isFinished = true;
    setTimeout(function() {
      reset("You win!");
    }, 500);
  }
  // lose
  else if ( (whoo === "comp") && (gridCheck(compSign)) ) {
    setTimeout(function() {
      reset("You lose!");
    }, 500);
  }
  // tie
  else if (turn === 9) {
    setTimeout(function() {
      reset("You tie!");
    }, 500);
  }
}

// check grid
function gridCheck(sign) {
  return (
        (grid[0]===sign && grid[1]===sign && grid[2]===sign)
    ||  (grid[3]===sign && grid[4]===sign && grid[5]===sign)
    ||  (grid[6]===sign && grid[7]===sign && grid[8]===sign)
    ||  (grid[0]===sign && grid[3]===sign && grid[6]===sign)
    ||  (grid[1]===sign && grid[4]===sign && grid[7]===sign)
    ||  (grid[2]===sign && grid[5]===sign && grid[8]===sign)
    ||  (grid[0]===sign && grid[4]===sign && grid[8]===sign)
    ||  (grid[2]===sign && grid[4]===sign && grid[6]===sign)
  );
}

// reset func
function reset(msg) {
  playX.classList.add("hidden");
  playO.classList.add("hidden");
  message.textContent = msg;
  message.classList.remove("hidden");
  dark.classList.remove("hidden");
  grid = ["e","e","e", "e","e","e", "e","e","e"];
  turn = 0;
  isFinished = false;
  for (var j=0; j<plays.length; j++) {
    plays[j].innerHTML = "";
    plays[j].classList.add("playable");
    plays[j].removeEventListener("click", playerMove);
  }
  setTimeout(function() {
    playX.classList.remove("hidden");
    playO.classList.remove("hidden");
    message.classList.add("hidden");
  }, 1500);
}

// random func
function rand(num) {
  return Math.floor(Math.random() * num); 
}

// handle focus of the page
function checkPageFocus() {
  if (document.hasFocus()) {
    dark.classList.remove("hidden");
  }
  else {
    dark.classList.add("hidden");
  }
}
var checkPageInterval = setInterval(checkPageFocus, 300);
