var throwCounter = 0;
var roundCounter = 0;
var factor = 1;
//the main function called at page load
function playGame() {
prepareGame();
addListenerToButtons();
}
//set initial Values for Gameboard
function prepareGame(){
  var playerOne = "Jonas";
  var playerTwo = "Jakob";
  var initialScore = "10";
  document.getElementById('playerOne').innerHTML = playerOne;
  document.getElementById('playerTwo').innerHTML = playerTwo;
  document.getElementById('scoreOne').innerHTML = initialScore;
  document.getElementById('scoreTwo').innerHTML = initialScore;
}

//add Event Listener to all buttons
function addListenerToButtons(){
  for (var i = 1; i <= 20; i++ ){
    var buttonID = "b".concat(i.toString());
    document.getElementById(buttonID).addEventListener("click", function(){reduceScore(this.id)});
  }
  document.getElementById('b25').addEventListener("click",function(){reduceScore(this.id)});
  document.getElementById('b0').addEventListener("click",function(){reduceScore(this.id)});
  //triple and double
  document.getElementById('bD').addEventListener("click",function(){factor = 2;});
  document.getElementById('bT').addEventListener("click",function(){factor = 3;});

}

//reduce Score by thrown value
function reduceScore(buttonID){
    //keeping track of the rounds played
    if((throwCounter%3==0)&&(throwCounter!=0)){
      throwCounter=0;
      roundCounter ++;
    }
    //equivalent of throwing one round
    if(((throwCounter%3)!=0)||(throwCounter==0)){
      var value = parseInt(buttonID.replace('b',''));
      var score = (parseInt(document.getElementById(calculateCurrPlayer()).innerHTML))-(value * factor);
      document.getElementById(calculateCurrPlayer()).innerHTML = score.toString();
      checkForWin();
      factor = 1;
      throwCounter ++;
    }
}

//return the correct player based on the current round
function calculateCurrPlayer(){
  var currentRound = roundCounter;
  var players = ['scoreOne','scoreTwo'];
  return players[currentRound%2];
}

//check if the player has won the Game
function checkForWin(){
  if((parseInt(document.getElementById(calculateCurrPlayer()).innerHTML))==0){
    alert("This player has won the game "+calculateCurrPlayer());
    location.reload();
  }
}
