var throwCounter = 0;
var roundCounter = 0;
var factor = 1;
var lastScoreOne = 0;
var lastScoreTwo = 0;
var avgOne = 0;
var avgTwo = 0;
var startScore = 30;

//used for calculating the average
var throwsOne = 0;
var throwsTwo = 0;
//the main function called at page load
function playGame() {
prepareGame();
addListenerToButtons();
}
//set initial Values for Gameboard
function prepareGame(){
  var playerOne = "Jonas";
  var playerTwo = "Spieler2";
  var initialScore = startScore.toString();
  document.getElementById('playerOne').innerHTML = playerOne;
  document.getElementById('playerTwo').innerHTML = playerTwo;
  document.getElementById('scoreOne').innerHTML = initialScore;
  document.getElementById('scoreTwo').innerHTML = initialScore;
  document.getElementById('playerOne').style.color="red";
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
      //save score after every round for restore after throwing to many points
      if (calculateCurrPlayer()=='scoreOne'){
        lastScoreOne = parseInt(document.getElementById(calculateCurrPlayer()).innerHTML);
      }else{
        lastScoreTwo = parseInt(document.getElementById(calculateCurrPlayer()).innerHTML);
      }
      throwCounter=0;
      roundCounter ++;
    }
    //equivalent of throwing one round
    if(((throwCounter%3)!=0)||(throwCounter==0)){
      var value = parseInt(buttonID.replace('b',''));
      var score = (parseInt(document.getElementById(calculateCurrPlayer()).innerHTML))-(value * factor);
      document.getElementById(calculateCurrPlayer()).innerHTML = score.toString();
      calculateAverage();
      checkForBust();
      checkForWin();


      factor = 1;
      throwCounter ++;
    }
}

//return the correct players score html element based on the current round
function calculateCurrPlayer(){
  var ret = '';
  if(currentPlayer=="playerOne"){
    ret = 'scoreOne';
  }else{
    ret = 'scoreTwo';
  }
  return ret;
}

//check if the player has won the Game
function checkForWin(){
  if((parseInt(document.getElementById(calculateCurrPlayer()).innerHTML))==0){
    if(calculateCurrPlayer() == 'scoreOne'){
      let avg = ((startScore/throwsOne)*3);
      document.getElementById('averageOne').innerHTML = "Avg: "+avg.toFixed(2);
    }else{
      let avg = ((startScore/throwsTwo)*3);
      document.getElementById('averageTwo').innerHTML = "Avg: "+avg.toFixed(2);
    }
    alert("Congratulations! You won the Game! ");
  }
}

//check if player has busted
function checkForBust(){
  var player="";
  if((parseInt(document.getElementById(calculateCurrPlayer()).innerHTML))<0){
    if(calculateCurrPlayer()=='scoreOne'){
      player = lastScoreOne;
      //pushes counter to next 3
      if(throwsOne % 3 != 0){
        throwsOne = throwsOne + (3-(throwsOne%3));
      }
      let avg = ((startScore - player)/(throwsOne))*3;
      let avgRound = avg.toFixed(2);
      document.getElementById('averageOne').innerHTML = "Avg: " + avgRound.toString();
    }
    else{
    player = lastScoreTwo;
      if(throwsTwo % 3 != 0){
      throwsTwo = throwsTwo + (3-(throwsTwo%3));
      }
      let avg = ((startScore - player)/(throwsTwo))*3;
      let avgRound = avg.toFixed(2);
      document.getElementById('averageTwo').innerHTML = "Avg: " + avgRound.toString();
    }
    var diffToNextRound = throwCounter%3;
    throwCounter=throwCounter+(2-diffToNextRound);
    alert("Busted!!! Next Player.")
    document.getElementById(calculateCurrPlayer()).innerHTML = player.toString();
  }
}

function calculateAverage(){
  if(currentPlayer=="playerOne"){
    throwsOne ++;
    if (throwsOne % 3 ==0){
      let avg = ((startScore - parseInt(document.getElementById(calculateCurrPlayer()).innerHTML))/(throwsOne))*3;
      let avgRound = avg.toFixed(2);
      document.getElementById('averageOne').innerHTML = "Avg: " + avgRound.toString();
    }
    }else{
    throwsTwo ++;
    if(throwsTwo % 3 == 0){
      let avg = ((startScore - parseInt(document.getElementById(calculateCurrPlayer()).innerHTML))/(throwsTwo))*3;
      let avgRound = avg.toFixed(2);
      document.getElementById('averageTwo').innerHTML = "Avg: " + avgRound.toString();
    }
  }

}
