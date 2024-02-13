var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStatus = true;
var keyLock = false;

$("body").keypress(function(){
    if (!keyLock){
        gameReset();
        if(gameStatus){
            nextSequence();
        }
    }
});

if (gameStatus){
    $(".btn").on("click", function(){
            var userChosenColour = this.id;
            var userChosenSound = "./sounds/" + userChosenColour + ".mp3";
            playSound(userChosenSound);
            userClickedPattern.push(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length-1);
    });
}

console.log(gamePattern);
console.log("userPattern",userClickedPattern);

function nextSequence(){
        userClickedPattern = [];
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        var buttonSound = "./sounds/" + randomChosenColour + ".mp3";
        $("."+randomChosenColour).fadeOut().fadeIn();
        playSound(buttonSound);
        $("#level-title").text("Level " + level);
        level++;
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        gameOver(); 
    }
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

function gameOver(wrongSound){
    var wrongSound = "./sounds/wrong.mp3";
    var wrongAudio = new Audio(wrongSound);
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200);
    gameStatus = false;
    keyLock = false;
    $("#level-title").text("Game Over! Press A Key to Start")
}

function gameReset(){
    gameStatus = true;
    level = 0; 
    keyLock = true;
    userClickedPattern = [];
    gamePattern = [];
}