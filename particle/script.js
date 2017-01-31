/**
 * Created by DaNinjaKid on 01/04/2015.
 */

var
    xCord = 400,
    yCord = 225,
    particleNum = 5, // Default particle number
    maxLife = 100, // Default life span
    grav = 0, // Default gravity
    xSpeedMod = 10, // Default X Speed Modifier
    ySpeedMod = 10, // Default Y Speed Modifier
    saturation = 100, // Default saturation value
    lightness = 50, // Default lightness value
    particleAlpha = 0.9, // Default particle alpha value
    backgroundAlpha = 0.2, // Default background alpha value
    hueColour1 = 1, // Default Starting colour hue
    hueColour2 = 1, // Default Starting colour hue 2
    hueToneMod = 0; // Default Tone Modifier




function startPage() {
    // Creates variables
    var canvas = document.createElement("Canvas"),
        c = canvas.getContext("2d"),
        particles = {},
        particleIndex = 0;

    // Canvas size
    canvas.width = 800;
    canvas.height = 450;
    // document.body.appendChild(canvas);
    document.getElementById("canvasCell").appendChild(canvas);

    // Initialises canvas as black
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);


    // Creates class Particle - Starting location and values
    function Particle() {
        // Particle starting values
        this.x = xCord;
        this.y = yCord;
        this.vx = (Math.random() * xSpeedMod) - (xSpeedMod / 2);
        this.vy = (Math.random() * ySpeedMod) - (ySpeedMod / 2);
        this.grav = grav;
        particleIndex++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0; // Start lifespan of particles
        this.maxLife = maxLife;

        // If loop looks ugly as bawls, deal with it
        // hsla function( Hue, Saturation, Lightness, Alpha) - Particle Colour
        if (document.getElementById("randomColour").checked){
            this.colour = "hsla(" + parseInt(Math.random() * 360, 10) + "," + saturation + "%," + lightness + "%," + particleAlpha + ")";
        }
        else {

            // hueToneMod check
            if (parseInt(document.getElementById("hueToneMod").value) >= 1){
                hueMod = parseInt(Math.random() * hueToneMod);
            }
            else {
                hueMod = 0;
            }

            hueNumSelect = parseInt(Math.random() * 10);
            // Random hueColour select
            if (hueNumSelect == 1){

                this.colour = "hsla(" + (hueColour1 + hueMod) + "," + saturation + "%," + lightness + "%," + particleAlpha + ")";
            }
            if (hueNumSelect == 2){
                this.colour = "hsla(" + (hueColour2 + hueMod) + "," + saturation + "%," + lightness + "%," + particleAlpha + ")";
            }

        }

    }


    // Creates physics of particles and colour
    Particle.prototype.draw = function () {
        // Defines particle physics and life rules
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.grav;
        this.life++;
        // Particle life check
        if (this.life >= this.maxLife) {
            delete particles[this.id]
        }
        c.fillStyle = this.colour; // Particle colour reference
        c.fillRect(this.x, this.y, 10, 10); // Particle start location and size
    };


    // Draws particles and redraws canvas
    setInterval(function () {
        c.globalCompositeOperation = "source-over"; // Enables colour combination
        c.fillStyle = "rgba(0,0,0," + backgroundAlpha + ")"; // Background colour
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Creates particle IDs up to particle num
        for (var n = 0; n < particleNum; n++) {
            new Particle();
        }

        // Draws particles up to ID
        if (colourCombination.checked){
            c.globalCompositeOperation = "lighter"; // Enables colour combination
        }

        for (var i in particles) {
            particles[i].draw();
        }

    }, 30);

}

function refresh(){
    particleNum = parseInt(document.getElementById("partNum").value);
    maxLife = parseInt(document.getElementById("maxLife").value);
    grav = parseInt(document.getElementById("gravity").value) / 10;
    xSpeedMod = parseInt(document.getElementById("xSpeedMod").value);
    ySpeedMod = parseInt(document.getElementById("ySpeedMod").value);
    xCord = parseInt(document.getElementById("xCord").value);
    yCord = parseInt(document.getElementById("yCord").value);

    hueColour1 = parseInt(document.getElementById("hueColour1").value);
    hueColour2 = parseInt(document.getElementById("hueColour2").value);
    hueToneMod = parseInt(document.getElementById("hueToneMod").value);

    saturation = parseInt(document.getElementById("saturation").value);
    lightness = parseInt(document.getElementById("lightness").value);
    particleAlpha = parseInt(document.getElementById("particleAlpha").value) / 100;
    backgroundAlpha = parseInt(document.getElementById("backgroundAlpha").value) / 100;



    document.getElementById("gravValue").innerHTML = grav.toString();
    document.getElementById("partValue").innerHTML = particleNum.toString();
    document.getElementById("xSpeedModValue").innerHTML = xSpeedMod.toString();
    document.getElementById("ySpeedModValue").innerHTML = ySpeedMod.toString();
    document.getElementById("xCordValue").innerHTML = xCord.toString();
    document.getElementById("yCordValue").innerHTML = yCord.toString();
    document.getElementById("partLifeValue").innerHTML = maxLife.toString();

    document.getElementById("hueColourValue1").innerHTML = hueColour1.toString();
    document.getElementById("hueColourValue2").innerHTML = hueColour2.toString();
    document.getElementById("hueToneModValue").innerHTML = hueToneMod.toString();

    document.getElementById("saturationValue").innerHTML = saturation.toString() + "%";
    document.getElementById("lightnessValue").innerHTML = lightness.toString() + "%";
    document.getElementById("particleAlphaValue").innerHTML = Math.round(particleAlpha.toString() * 100) + "%";
    document.getElementById("backgroundAlphaValue").innerHTML = Math.round(backgroundAlpha.toString() * 100) + "%";
}


    /*
    ORANGE BALL FUNCTION

     // Initialises starting positions, velocities and gravity
     var posX = 30,
        posY = canvas.height / 2,
        velX = 15,
        velY = -10,
        gravity = 1;
        x = 20;
        y = 20;


    setInterval(function(){
        // Reprint canvas
     c.fillStyle = "black";
     c.fillRect(0, 0, canvas.width, canvas.height);
     c.fillStyle = "white";
     c.fillRect(12, 0, 576, 250);

        // Adds to the positions of the shape, using velocity and gravity
        posX += velX;
        posY += velY;

        // If the ball is in the top 80% of the canvas
        if (posY > canvas.height * 0.8) {
            // Flips Y velocity below 1/5 of canvas height - (bounces and lowers Y height by 0.2/20%)
            velY *= -0.8;
            // X velocity reduced - (decrease x speed by 0.1/10%)
            velX *= 0.9;
            // Y position reduced - (decrease height by 0.2/20%)
            posY = canvas.height * 0.8;
        }
        // Adds gravity to ensure the ball always moves down in height
        velY += gravity;

        if (posX > canvas.width * 0.96) {
            velX *= -1;
        }
        else if (posX < canvas.width * 0.04) {
            velX *= -1;
        }

        // Starts path to draw circle
     c.beginPath();
     c.fillStyle = "orange";
        // Use arc method to draw a circle
        // content.arc(x, y, radius, startAngle, endAngle, anticlockwise)
     c.arc(posX, posY, 10, 0, Math.PI * 2, true);
        // Closes the path
     c.closePath();
        // Fills the path in with the fillStyle
     c.fill();

    }, 30);
    */




