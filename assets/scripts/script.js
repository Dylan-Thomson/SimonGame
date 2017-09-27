$(function() {
    initGameButtonListeners();
    initControlButtonListeners();
});

var isOn = false;
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
    })
];

function initGameButtonListeners() {
    $(".btn-upper-left").on("click", function() {
        buttonClick(0);
    });
    $(".btn-upper-right").on("click", function() {
        buttonClick(1);
    });
    $(".btn-lower-left").on("click", function() {
        buttonClick(2)
    });
    $(".btn-lower-right").on("click", function() {
        buttonClick(3);
    });
}

function buttonClick(btn) {
    if(isPlayable() && isStarted) {
        playMove(btn);
        compareMove(btn);
    }
}

function initControlButtonListeners() {
    $(".start-btn").on("click", function() {
        if(isOn) {
            clearInterval(interval);
            isStarted = !isStarted;
            $(".start-btn").toggleClass("full-opacity");
            if(isStarted) {
                fadeToNewMsg("Here we go!");
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
            isStrict = !isStrict;
            $(".strict-btn").toggleClass("full-opacity");
        }
    });
    $("input:checkbox").on("change", function() {
        isOn = !isOn;
        $(".count-display").toggleClass("count-off");
        if($(this).is(":checked")) {
            isOn = false;
            Howler.mute(true);
            var counter = 0;
            var startInterval = setInterval(function() {
                Howler.mute(false);
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
            $(".msg").fadeTo("slow", 0);
            clearInterval(interval);
            isStrict = false;
            $(".strict-btn").removeClass("full-opacity");
            isStarted = false;
            $(".start-btn").removeClass("full-opacity");
            resetGameState();
        }
    });    
}

function addMoveToSequence() {
    sequence.push(Math.floor(Math.random() * 4));
    updateCountDisplay();
    placeInSequence = 0;
    playSequence();
}

function playSequence() {
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
    if(move !== sequence[placeInSequence]) {
        if(isStrict) {
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
            fadeToNewMsg("Winner!");
            resetGameState()
            $(".start-btn").trigger("click");
        }
        else if(placeInSequence > (sequence.length - 1)) {
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