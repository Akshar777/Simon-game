
var buttonColors=['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern=[];
var start= false;
var level = 0;

$(document).keypress(function(){
  if(!start){
    $('h1').text('level '+level);
    nextSequence();
    start=true;
  }
});


$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});


  function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence(){
  userClickedPattern= [];
  level++;
  $('h1').text('level '+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor){
  $('#' + currentColor).addClass('pressed');
  setTimeout(function(){
    $('#' + currentColor).removeClass('pressed');
  },100);
}


function playSound(name){

    var audioButton = new Audio("sounds/" + name + '.mp3');
    audioButton.play();
}


function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
