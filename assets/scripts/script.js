// Document Ready
$(function() {
    initGameButtonListeners();
    initControlButtonListeners();
});

Howler.mobileAutoEnable = true;

var isOn = $("input:checkbox").is(":checked");
var isStrict = false;
var isStarted = false;
var isBoardDisabled = false;
var sequence = [];
var placeInSequence = 0;
var interval;
var movesToWin = 20;
var sounds = [
    new Howl({
        src: ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"]
    }),
    new Howl({
        src: ["https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"]
    }),
    new Howl({
        src: ["https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"]
    }),
    new Howl({
        src: ["https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"]
    }),
    // new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    // new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    // new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    // new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
];

function initGameButtonListeners() {
    $(".btn-upper-left").on("click", function() {
        if(isPlayable() && isStarted) {
            console.log(".btn-upper-left clicked");
            playMove(0);
            compareMove(0);
        }
    });
    $(".btn-upper-right").on("click", function() {
        if(isPlayable() && isStarted) {
            console.log(".btn-upper-right clicked");
            playMove(1);
            compareMove(1);
        }
    });
    $(".btn-lower-left").on("click", function() {
        if(isPlayable() && isStarted) {
            console.log(".btn-lower-left clicked");
            playMove(2);
            compareMove(2);
        }
    });    
    $(".btn-lower-right").on("click", function() {
        if(isPlayable() && isStarted) {
            console.log(".btn-lower-right clicked");
            playMove(3);
            compareMove(3);
        }
    });    
}

function initControlButtonListeners() {
    $(".start-btn").on("click", function() {
        if(isOn) {
            clearInterval(interval);
            console.log(".start-btn clicked");
            isStarted = !isStarted;
            console.log("isStarted = " + isStarted);
            $(".start-btn").toggleClass("full-opacity");
            if(isStarted) {
                fadeToNewMsg("Here we go!");
                sounds.forEach(function(sound) {
                    sound.muted = false;
                });
                addMoveToSequence();
            }
            else {
                fadeToNewMsg("Click Start!");
                resetGameState();
            }
        }
    });
    $(".strict-btn").on("click", function() {
        if(isPlayable()) {
            console.log(".strict-btn clicked");
            isStrict = !isStrict;
            console.log("isStrict = " + isStrict);
            $(".strict-btn").toggleClass("full-opacity");
        }
    });
    $("input:checkbox").on("change", function() {
        isOn = !isOn;
        $(".count-display").toggleClass("count-off");
        if($(this).is(":checked")) {
            console.log("on", isOn);

            isOn = false;
            // Howler.mute(true);
            // sounds.forEach(function(sound) {
                // sound.play();
            // });

            var counter = 0;
            var startInterval = setInterval(function() {
                // sounds[counter].mute(false);
                // Howler.mute(false);
                sounds[counter].play();
                flashLight(counter);
                counter++;
                if(counter > 3) {
                    clearInterval(startInterval);
                    isOn = true;
                }
            }, 200);
            $(".msg").text("Click start!");
            $(".msg").fadeTo("slow", 1);

        }
        else {
            console.log("off", isOn);
            $(".msg").fadeTo("slow", 0);

            isStrict = false;
            $(".strict-btn").removeClass("full-opacity");
            isStarted = false;
            $(".start-btn").removeClass("full-opacity");
            resetGameState();
        }
    });    
}

function addMoveToSequence() {
    console.log("addMoveToSequence()");
    sequence.push(Math.floor(Math.random() * 4));
    updateCountDisplay();
    placeInSequence = 0;
    playSequence();
}

function playSequence() {
    console.log("playSequence()", sequence);
    isBoardDisabled = true;
    var counter = 0;
    interval = setInterval(function() {
        playMove(sequence[counter]);
        counter++;
        if(counter >= sequence.length) {
            clearInterval(interval);
            isBoardDisabled = false;
        }
    }, 1000);
}

function playMove(btn) {
    console.log("playMove() ." + btn);
    flashLight(btn);
    sounds[btn].play();

}

function flashLight(btn) {
    $("." + btn).toggleClass("full-opacity");
    setTimeout(function() {
        $("." + btn).toggleClass("full-opacity");
    }, 200);
}

function compareMove(move) {
    console.log("compareMove()", move, sequence[placeInSequence]);
    if(move !== sequence[placeInSequence]) {
        if(isStrict) {
            console.log("You have lost, press start to play again.")
            fadeToNewMsg("You lose!");
            setTimeout(function() {
                resetGameState();
                $(".start-btn").trigger("click");
            }, 1000);
        }
        else {
            fadeToNewMsg("Wrong!");
            placeInSequence = 0;
            playSequence();            
        }
    }
    else {
        placeInSequence++;
        if(sequence.length == movesToWin && placeInSequence > (sequence.length - 1)) {
            console.log("Winner!");
            fadeToNewMsg("Winner!");
            resetGameState()
            $(".start-btn").trigger("click");
        }
        else if(placeInSequence > (sequence.length - 1)) {
            console.log("placeInSequence = " + placeInSequence + " count-1 = " + (sequence.length - 1));
            addMoveToSequence();
            if($(".msg").css("opacity") > 0) {
                $(".msg").fadeTo("slow", 0);
            }
        }       
    }
}

function isPlayable() {
    return isOn && !isBoardDisabled;
}

function updateCountDisplay() {
    if(sequence.length <= 0) {
        $(".count-display").text("--");
    }
    else {
        $(".count-display").text(sequence.length);
    }
}

function resetGameState() {
    sequence = [];
    updateCountDisplay();

}

function fadeToNewMsg(msg) {
    if($(".msg").css("opacity") > 0) {
        $(".msg").fadeTo("slow", 0, function() {
            $(".msg").text(msg);
            $(".msg").fadeTo("slow", 1);
        });
    }
    else {
        $(".msg").text(msg);
        $(".msg").fadeTo("slow", 1);
    }
}