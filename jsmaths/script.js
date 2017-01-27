var dif;

function makeXSubject() {
    document.getElementById("hint").style.visibility = "hidden";
    document.getElementById("equation").innerHTML = randomInt(dif) + "y = " + randomInt(dif) + "x " + randomSign() + " " + randomInt(dif);
    document.getElementById("instruction").innerHTML = "Rearrange to make x the subject of the equation";
    document.getElementById("hint").innerHTML = "Move all the x terms to one side";
}

function findYInter() {
    document.getElementById("hint").style.visibility = "hidden";
    document.getElementById("equation").innerHTML = randomInt(dif) + "y = " +
        randomInt(dif) + "x " + randomSign() + " " + randomInt(dif);
    document.getElementById("instruction").innerHTML = "Find the y intercept";
    document.getElementById("hint").innerHTML = "Find y when x = 0";
}

function expandPower1() {
    document.getElementById("hint").style.visibility = "hidden";
    document.getElementById("equation").innerHTML = "(" + randomInt(dif) + "x " +
        randomSign() + " " + randomInt(dif) + ") (" + randomInt(dif) + "y " + randomSign()
        + " " + randomInt(dif) + ")";
    document.getElementById("instruction").innerHTML = "Expand and simplify";
    document.getElementById("hint").innerHTML = "Multiply each term on the left by each term on the right separately";
}

function setDiff(diffLvl) {
    if (diffLvl == 1) {
        dif = 5;
    }
    else if (diffLvl == 2) {
        dif = 9;
    }
    else if (diffLvl == 3){
        dif = 16;
    }
    return dif;
}

function toggleHint() {
    if (document.getElementById("hint").style.visibility == "hidden") {
        document.getElementById("hint").style.visibility = "visible";
    }
    else {
        document.getElementById("hint").style.visibility = "hidden";
    }

}

function randomInt(max) {
    var randInt = Math.floor((Math.random() * max) + 1);
    return randInt;
}

function randomSign() {
    var randInt = Math.floor((Math.random() * 2) + 1);
    var sign;
    if (randInt == 1) {
        sign = "+";
    }
    else {
        sign = "-";
    }
    return sign;
}

window.onload = function() {
    var label = document.getElementById("equation");
    dif = setDiff(2);
}
