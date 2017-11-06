// Enemies our player must avoid
let numRows = 6;
let numCols = 5;

class Enemy {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(array = [0, 101 / 2], speed = 0) {
        this.sprite = 'images/enemy-bug.png';
        this.x = array[0];
        this.y = array[1];
        this.speed = speed;
    }

    update(dt) {
        this.x += dt * this.speed;

    }
    //
    // Draw the enemy on the screen, required method for game
    // 
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = numCols / 2 * 83; //Engine.numCols/2 * 83; 
        this.y = (numRows - 2) * 101; //Engine.numCols/2 * 83;
    }

    update() {
        return true;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(e) {
        switch (e) {
            case 'left':
                if (this.x >= 101) {
                    this.x -= 101
                }
                break;

            case 'up':
                if (this.y >= 0) {
                    this.y -= 83;
                }
                break;

            case 'right':
                if (this.x <= 404) {
                    this.x += 101;
                }
                break;

            case 'down':
                if (this.y <= 321) {
                    this.y += 83;
                }
                break;
        }
    }
}

let allEnemies = [];
let player = new Player();





setInterval(() => {
    allEnemies.push(new Enemy([randStep(-500, -83, 100), randStep(101 / 2, 83 * 3, 83)], randStep(0, 400, 30)))
}, 300);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function randStep(min, max, step) {
    return min + (step * Math.floor(Math.random() * (max - min) / step));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
