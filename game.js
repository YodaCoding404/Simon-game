const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (e) {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
  const isEqual = gamePattern[currentLevel] == userClickedPattern[currentLevel];
  if (isEqual) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    wrongSound();
    $("body").addClass("game-over");
    $("h1").text(`Press A Key to Start
  `);

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
};

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  const random = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[random];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
};

const animatePress = (currentColour) => {
  $(`.${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`.${currentColour}`).toggleClass("pressed");
  }, 100);
};

const playSound = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const wrongSound = () => {
  const wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
