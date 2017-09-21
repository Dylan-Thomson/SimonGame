// Document Ready
$(function() {
    initGameButtonListeners();
    initControlButtonListeners();
});

var isOn = $("input:checkbox").is(":checked");
var isStrict = false;
var isStarted = false;
var isBoardDisabled = false;
var sequence = [];
var placeInSequence = 0;
var movesToWin = 5;
var count = 0;
var sounds = [
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
];

function initGameButtonListeners() {
    $(".btn-upper-left").on("click", function() {
        if(isPlayable()) {
            console.log(".btn-upper-left clicked");
            playMove(0);
            compareMove(0);
        }
    });
    $(".btn-upper-right").on("click", function() {
        if(isPlayable()) {
            console.log(".btn-upper-right clicked");
            playMove(1);
            compareMove(1);
        }
    });
    $(".btn-lower-left").on("click", function() {
        if(isPlayable()) {
            console.log(".btn-lower-left clicked");
            playMove(2);
            compareMove(2);
        }
    });    
    $(".btn-lower-right").on("click", function() {
        if(isPlayable()) {
            console.log(".btn-lower-right clicked");
            playMove(3);
            compareMove(3);
        }
    });    
}

function initControlButtonListeners() {
    $(".start-btn").on("click", function() {
        if(isPlayable()) {
            console.log(".start-btn clicked");
            isStarted = !isStarted;
            console.log("isStarted = " + isStarted);
            $(".start-light").toggleClass("hidden");
            if(isStarted) {
                addMoveToSequence();
            }
        }
    });
    $(".strict-btn").on("click", function() {
        if(isPlayable()) {
            console.log(".strict-btn clicked");
            isStrict = !isStrict;
            console.log("isStrict = " + isStrict);
            $(".strict-light").toggleClass("hidden");
        }
    });
    $("input:checkbox").on("change", function() {
        isOn = !isOn;
        $(".count-display").toggleClass("count-off");
        if($(this).is(":checked")) {
            console.log("on", isOn);
        }
        else {
            console.log("off", isOn);
            isStrict = false;
            $(".strict-light").addClass("hidden");
            isStarted = false;
            $(".start-light").addClass("hidden");
        }
    });    
}

function addMoveToSequence() {
    console.log("addMoveToSequence()");
    sequence.push(Math.floor(Math.random() * 4));
    count++;
    placeInSequence = 0;
    playSequence();
}

function playSequence() {
    console.log("playSequence()", sequence);
    isBoardDisabled = true;
    var counter = 0;
    var i = setInterval(function() {
        playMove(sequence[counter]);
        // console.log(isPlayable());
        counter++;
        if(counter >= count) {
            clearInterval(i);
            isBoardDisabled = false;
        }
    }, 1000);
}

function playMove(move) {
    console.log("playMove() ." + move);
    sounds[move].play();

}

function compareMove(move) {
    console.log("compareMove()", move, sequence[placeInSequence]);
    if(move !== sequence[placeInSequence]) {
        console.log("YOU MESSED UP", move, sequence[placeInSequence]);
        if(isStrict) {
            //reset count to zero, clear sequence, etc
        }
        else {
            placeInSequence = 0;
            playSequence();            
        }
    }
    else {
        placeInSequence++;
        if(sequence.length == movesToWin && placeInSequence > (sequence.length - 1)) {
            console.log("Winner!");
            sequence = [];
            count = 0;
            $(".start-btn").trigger("click");
        }
        else if(placeInSequence > (count - 1)) {
            console.log("placeInSequence = " + placeInSequence + " count-1 = " + (count - 1));
            addMoveToSequence();
        }       
    }
}

function isPlayable() {
    return isOn && !isBoardDisabled;
}