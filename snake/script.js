// Constant variables - In all caps
var
    COLS = 26,
    ROWS = 26,

// Directions
    DOWN = 0,
    UP = 1,
    RIGHT = 2,
    LEFT = 3,

// Array IDs
    EMPTY = 0,
    SNAKE = 1,
    FOOD = 2,

// KeyCodes
    KEY_LEFT = 37;
    KEY_UP = 38;
    KEY_RIGHT = 39;
    KEY_DOWN = 40;


var grid = {

    width : null,
    height : null,
    grid_name : null,

    init: function(d, c, r){
        this.width = c;
        this.height = r;
        this.grid_name = [];

        for (var x=0; x < c; x++){
            this.grid_name.push([]);
            for (var y=0; y < r; y++){
                this.grid_name[x].push(d);
            }
        }
    },

    set: function(val, x, y){
        this.grid_name[x][y] = val;
    },

    get: function(x, y){
        return this.grid_name[x][y];
    }

};

var snake = {

    direction : null,
    last : null,
    queue : null,

    init: function(d, x, y){
        this.direction = d;
        this.queue = [];
        this.insert(x, y);
    },

    insert: function(x, y){
        this.queue.unshift({x:x, y:y});
        this.last = this.queue[0];
    },

    remove: function(){
        return this.queue.pop();
    }

};



function setFood() {
    var empty = [];
    for (var x=0; x < grid.width; x++) {
        for (var y=0; y < grid.height; y++) {
            if (grid.get(x, y) === EMPTY) {
                empty.push({x: x, y: y});
            }
        }
    }
    var randpos = empty[Math.floor(Math.random()*(empty.length -1))];
    grid.set(FOOD, randpos.x, randpos.y);
}



function init(){
    grid.init(EMPTY, COLS, ROWS);
    if (score !== undefined){
        if (highscore < score){
            document.getElementById("highscore").innerHTML = ("Highscore: " + score);
            highscore = score;
        }
        alert("Game Over - You scored: " + score + " points");
        document.getElementById("score").innerHTML = "Score: 0";
    }
    score = 0;

    // Define Start Point
    var sp = {x:Math.floor(COLS/2), y:ROWS -3};
    snake.init(UP, sp.x, sp.y);
    grid.set(SNAKE, sp.x, sp.y);
    setFood();

}



function update(){
    frames++;

    if ((keystate[KEY_LEFT] || keystate[65]) && snake.direction !== RIGHT) snake.direction = LEFT;
    if ((keystate[KEY_UP] || keystate[87]) && snake.direction !== DOWN) snake.direction = UP;
    if ((keystate[KEY_RIGHT] || keystate[68]) && snake.direction !== LEFT) snake.direction = RIGHT;
    if ((keystate[KEY_DOWN] || keystate[83]) && snake.direction !== UP) snake.direction = DOWN;

    // Controls frames refresh rate
    if(frames%5 === 0){
        // Set variables for new position of snake
        var
            nx = snake.last.x,
            ny = snake.last.y;

        switch (snake.direction) {
            case LEFT:
                nx--;
                break;

            case RIGHT:
                nx++;
                break;

            case UP:
                ny--;
                break;

            case DOWN:
                ny++;
                break;
        }

        // Gameover state - Resets game
        if (0 > nx || nx > grid.width-1 ||
            0 > ny || ny > grid.height-1 ||
            grid.get(nx, ny) === SNAKE) {
                return init();
        }

        // Food collection - Increases tail length
        if (grid.get(nx, ny) === FOOD) {
            var tail = {x:nx, y:ny};
            score++;
            document.getElementById("score").innerHTML = "Score: " + score;
            setFood();
        }

        // Deletes end of tail to prevent infinite tail
            else {
                var tail = snake.remove();
                grid.set(EMPTY, tail.x, tail.y);
                tail.x = nx;
                tail.y = ny;
        }

        grid.set(SNAKE, tail.x, tail.y);
        snake.insert(tail.x, tail.y);

    }
}


function draw(){
    // Tile Width and Tile height calculation
    var tile_width = canvas.width/grid.width,
        tile_height = canvas.height/grid.height;

    for (var x=0; x < grid.width; x++) {
        for (var y=0; y < grid.height; y++) {
           switch (grid.get(x, y)) {
               // Case of the grid being a set number, fill with colour
               case EMPTY:
                   context.fillStyle = "#FFF";
                   break;

               case SNAKE:
                   context.fillStyle = "#228B22";
                   break;

               case FOOD:
                   context.fillStyle = "#FF3232";
                   break;
           }
            context.fillRect(x*tile_width, y*tile_height, tile_width, tile_height);
        }
    }
    context.fillStyle = "#000";
}


function loop(){
    update();
    draw();
    window.requestAnimationFrame(loop, canvas);
}

function startGame() {
    // Main init and game loop
    init();
    loop();
    document.getElementById("startButton").style.visibility = "hidden";
}


// Game Objects
var canvas, context, keystate, frames, score, highscore;

function main(){
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    canvas = document.createElement("canvas");
    canvas.width = COLS*20;
    canvas.height = ROWS*20;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);

    context.font = "14px Verdana";

    frames = 0;
    highscore = 0;
    keystate = {};
    document.addEventListener("keydown", function(evt) {
        keystate[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function(evt) {
        delete keystate[evt.keyCode];
    });

}


main();
