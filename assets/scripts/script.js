// Document Ready
$(function() {
    initGameButtonListeners();
    initControlButtonListeners();
});

var isOn = $("input:checkbox").is(":checked");
var isStrict = false;
var isStarted = false;
var sequence = [];
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
        }
    });
    $(".btn-upper-right").on("click", function() {
        if(isOn) {
            console.log(".btn-upper-right clicked");
            playMove(1);
        }
    });
    $(".btn-lower-left").on("click", function() {
        if(isOn) {
            console.log(".btn-lower-left clicked");
            playMove(2);
        }
    });    
    $(".btn-lower-right").on("click", function() {
        if(isOn) {
            console.log(".btn-lower-right clicked");
            playMove(3);

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