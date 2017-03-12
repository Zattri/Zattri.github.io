var dif;

function makeXSubject() {
    resetVis();
    if (dif == 16) {
        var a = randIntN();
        var b = randIntN();
        var c = randIntN();
        var s1 = randSign();
    }
    else {
        var a = randIntF();
        var b = randIntF();
        var c = randIntF();
        var s1 = randSign();
    }
    document.getElementById("equation").innerHTML = a + "y = " + b + "x " + s1 + " " + c;
    document.getElementById("instruction").innerHTML = "Rearrange to make x the subject of the equation";
    document.getElementById("hint").innerHTML = "Move all the x terms to one side";
}

function findYInter() {
    resetVis();
    document.getElementById("equation").innerHTML = randIntC() + "y = " +
        randIntC() + "x " + randSign() + " " + randIntF();
    document.getElementById("instruction").innerHTML = "Find the y intercept";
    document.getElementById("hint").innerHTML = "Find y when x = 0";
}

function expandPower1() {
    resetVis();
    document.getElementById("equation").innerHTML = "(" + randIntC() + "x " +
        randSign() + " " + randIntF() + ") (" + randIntC() + "y " + randSign()
        + " " + randIntF() + ")";
    document.getElementById("instruction").innerHTML = "Expand and simplify";
    document.getElementById("hint").innerHTML = "Multiply each term on the left by each term on the right separately";
}


// Sets the difficulty level of the equations by adding in larger numbers
function setDiff(diffLvl) {
    diffLabel = document.getElementById("difficulty");
    if (diffLvl == 1) {
        dif = 5;
        diffLabel.innerHTML = "Difficulty - Easy";
    }
    else if (diffLvl == 2) {
        dif = 9;
        diffLabel.innerHTML = "Difficulty - Medium";
    }
    else if (diffLvl == 3){
        dif = 16;
        diffLabel.innerHTML = "Difficulty - Hard";
    }
    return dif;
}


// Toggles the hidden status of the hint
function toggleHint() {
    if (document.getElementById("hint").style.visibility == "hidden") {
        document.getElementById("hint").style.visibility = "visible";
    }
    else {
        document.getElementById("hint").style.visibility = "hidden";
    }

}

// Resets the visibility of the hint, question and instruction
function resetVis() {
    document.getElementById("equation").style.visibility = "visible";
    document.getElementById("instruction").style.visibility = "visible";
    document.getElementById("hint").style.visibility = "hidden";
}

// Gens random int - Can be negative | Includes 1
function randIntN() {
    var signInt = Math.floor((Math.random() * 4) + 1);
    randNum = randIntF();
    if (signInt == 4) {
        randNum *= -1;
    }
    return randNum;
}

// Gens random int - Cut out 1's
function randIntC() {
    var randInt = Math.floor((Math.random() * dif) + 1);
    if (randInt == 1) {
        randInt = "";
    }
    return randInt;
}

// Gens random int - Leave in 1
function randIntF() {
    var randInt = Math.floor((Math.random() * dif) + 1);
    return randInt;
}

// Gens random sign +/-
function randSign() {
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
    dif = setDiff(2);
}
