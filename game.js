var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


// START THE GAME


$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})





$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);


});




function playSound(name){
  var audio = new Audio("sounds/"+name +".mp3");
  audio.play();

}

function animatePress(currentColour){

    $("#"+ currentColour).addClass("pressed");


  setTimeout(function () {
    $("#"+ currentColour).removeClass("pressed");
  }, 100);

}

function nextSequence(){

  userClickedPattern = [];
  level++;
var randomNumber = Math.floor(Math.random()*4) ; // Random number (1-4)

var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
checkAnswer(level);

  $("h1").text("Level "+ level);


}



function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("succes");

    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }


  } else{
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");

    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}
