var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStatus = true;

$("body").keypress(function(){
    if (gameStatus){
    $("#level-title").text("Level " + level);
    nextSequence();
    }
    gameStatus = false;
});

$(".btn").on("click", function(){
    var userChosenColour = this.id;
    var userChosenSound = "./sounds/" + userChosenColour + ".mp3";
    playSound(userChosenSound);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var buttonSound = "./sounds/" + randomChosenColour + ".mp3";
    $("."+randomChosenColour).fadeOut().fadeIn();
    playSound(buttonSound);
}

function playSound(name){
    var audio = new Audio(name);
    audio.play()
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed")
    }, 100);
}