let gamePattern = []
let userClickedPattern = []
const buttonColours = [
  "red",
  "blue",
  "green",
  "yellow"
]
let level = 0;
let started = false;


$("body").on("keypress", function () {

  if (!started) {
    nextSequence();
    $("#level-title").text("Level 0")
    started = true;
  }
})

$("body").on("click", function () {

  if (!started) {
    nextSequence();
    $("#level-title").text("Level 0")
    started = true;
  }
})


$(".btn").on("click", function () {
  let userChosenColour = this.id
  userClickedPattern.push(userChosenColour)
  console.log(userChosenColour)
  makeSound(userChosenColour)
  buttonAnimation(userChosenColour)
  checkAnswer(userClickedPattern.length - 1)
})


function nextSequence() {
  userClickedPattern = []
  upgrade = level++
  $("#level-title").text("Level " + upgrade)
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour)
  // console.log(randomChosenColour)
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour)
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    let wrongSound = new Audio("sounds/wrong.mp3")
    wrongSound.play()
    document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart"
    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
  }
  // console.log("wrong");
}

function startOver() {
  level = 0;
  gamePattern = []
  started = false;
  // userClickedPattern = []
}

function buttonAnimation(currentKey) {
  let activeButton = document.querySelector("." + currentKey)
  activeButton.classList.add("pressed")
  setTimeout(function () {
    activeButton.classList.remove("pressed")
  }, 100)
}

function makeSound(key) {

  switch (key) {
    case "green":
      new Audio("sounds/green.mp3").play();
      break;

    case "red":
      new Audio("sounds/red.mp3").play();
      break;

    case "yellow":
      new Audio("sounds/yellow.mp3").play();
      break;

    case "blue":
      new Audio("sounds/blue.mp3").play();
      break;

    default:
  }

}
