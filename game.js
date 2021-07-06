var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//if some button is clicked
$(".btn").click(function(e){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    //check if clicked matches with gamepattern or not
});

//if some key is pressed
var keyPressed = false;
document.onkeypress = function (e) {
  if(keyPressed === false)
  nextSequence();
  keyPressed = true;
};

//at every new level new random color is added with other stuff
function nextSequence()
{
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor =  buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //wont auto play becuz google policy change
  playSound(randomChosenColor);
}

//play sound for clicked button
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//play animation for clicked button
function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function()
  {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

//check if answer is correct or not
function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel] != gamePattern[currentLevel])
  {
    playSound("wrong");
    $(document.body).addClass("game-over");
    setTimeout(function()
    {
      $(document.body).removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press any key to Restart");
    startOver();
  }

  else if(currentLevel === gamePattern.length - 1)
  setTimeout(function() { nextSequence(); }, 1000);
}

//if game over we change the variable to intial state
function startOver()
{
  keyPressed = false;
  level = 0;
  gamePattern = [];
}
