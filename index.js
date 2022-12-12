
var colours = ["red", "blue", "green", "yellow"];

var game = [];
var user = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    random();
    started = true;
  }
});

$(".btn").click(function() {

  var colr = $(this).attr("id");
  user.push(colr);

  playSound(colr);
  animate(colr);

  check(user.length-1);
});

function check(currentLevel) {

    if (game[currentLevel] === user[currentLevel]) {
      if (user.length === game.length){
        setTimeout(function () {
          random();
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


function random() {
  user = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColr = colours[randomNumber];
  game.push(randomColr);

  $("#" + randomColr).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColr);
}

function animate(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  game = [];
  started = false;
}
