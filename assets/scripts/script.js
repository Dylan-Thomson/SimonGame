// Document Ready
$(function() {
    initGameButtonListeners();
    initControlButtonListeners();
});

var isOn = $("input:checkbox").is(":checked");
var isStrict = false;
var isStarted = false;
var sequence = [];
var placeInSequence = 0;
var count = 0;
var sounds = [
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
];

function initGameButtonListeners() {
    $(".btn-upper-left").on("click", function() {
        if(isOn) {
            console.log(".btn-upper-left clicked");
            playMove(0);
            compareMove(0);
            placeInSequence++;
            //compare with current sequence
        }
    });
    $(".btn-upper-right").on("click", function() {
        if(isOn) {
            console.log(".btn-upper-right clicked");
            playMove(1);
            compareMove(1);
            placeInSequence++;
        }
    });
    $(".btn-lower-left").on("click", function() {
        if(isOn) {
            console.log(".btn-lower-left clicked");
            playMove(2);
            compareMove(2);
            placeInSequence++;
        }
    });    
    $(".btn-lower-right").on("click", function() {
        if(isOn) {
            console.log(".btn-lower-right clicked");
            playMove(3);
            compareMove(3);
            placeInSequence++;

        }
    });    
}

function initControlButtonListeners() {
    $(".start-btn").on("click", function() {
        if(isOn) {
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
        if(isOn) {
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
    sequence.push(Math.floor(Math.random() * 4));
    count++;
    placeInSequence = 0;
    playSequence();
}

function playSequence() {
    var counter = 0;
    var i = setInterval(function() {
        playMove(sequence[counter]);
        counter++;
        if(counter >= count) {
            clearInterval(i);
        }
    }, 1000);
}

function playMove(move) {
    console.log("." + move);
    sounds[move].play();
}

function compareMove(move) {
    if(move !== sequence[placeInSequence]) {
        console.log("YOU MESSED UP", move, sequence[placeInSequence]);
    }
}