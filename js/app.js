class GameBoard {
    // Dashboard-like class, contains all necessary 
    // game parameters
    constructor() {
        // GameBoard constants
        this.numRows = 6;
        this.numCols = 5;

        // Initialize game entities
        this.allEnemies = [];

        // Start new game
        this.setInputHandler();
        this.startGame();
    }

    startGame() {
        // Clear enemy list
        this.allEnemies = [];

        // enemyEmitter is an Enemy class generator, which creates
        // a new Enemy instance every 500ms, and removes unneeded instances
        this.enemyEmitter = setInterval(() => {
            currentGame.allEnemies.push(
                new Enemy(
                    [this.randStep(-500, -83, 100), this.randStep(101 / 2, 83 * 3, 83)],
                    this.randStep(100, 500, 20)));
            this.killInvisible();
        }, 500);
    }

    winGame() {
        // Stop new enemy creation
        clearInterval(this.enemyEmitter);
        for (let i in currentGame.allEnemies) {
            currentGame.allEnemies[i].stop();
        }
        alert('You won the game!');

        // Put player to the starting position and restart the game
        player.reset();
        this.startGame();
    }

    // Clear unreachable enemies by deleting coorresponding
    // class instance
    killInvisible() {
        for (let i in currentGame.allEnemies) {
            if (currentGame.allEnemies[i].x >= 505) {
                delete currentGame.allEnemies[i];
            }
        }
    }

    // Set keyboard input handler
    setInputHandler() {
        document.addEventListener('keyup', function(e) {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };
            player.handleInput(allowedKeys[e.keyCode]);
        });
    }

    // Random position generator with step
    randStep(min, max, step) {
        return min + (step * Math.floor(Math.random() * (max - min) / step));
    }
}

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

    stop() {
        this.speed = 0;
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        // Create player's sprite on the starting postition.
        this.sprite = 'images/char-boy.png';
        this.x = currentGame.numCols / 2 * 83;
        this.y = (currentGame.numRows - 2) * 101;
    }

    update() {
        // Check collision between player and an enemy.
        // Reset player's position if collision happend.
        for (let i in currentGame.allEnemies) {
            if ((this.y == currentGame.allEnemies[i].y + 21.5) && (Math.abs(this.x - currentGame.allEnemies[i].x) <= 83 * 0.85)) {
                this.x = currentGame.numCols / 2 * 83;
                this.y = (currentGame.numRows - 2) * 101;
            }
        }

        // Check player position, reaching the water row wins the game. 
        // Emitter stops and every enemy is frozen.
        if (this.y <= 0) {
            this.render();
            // Set timeout to render the last frame of the current game
            setTimeout((() => {
                currentGame.winGame();
            }), 1);
        }
    }

    // Render the player's sprite.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset() {
        // Reset player position on the screen
        player.x = currentGame.numCols / 2 * 83;
        player.y = (currentGame.numRows - 2) * 101;
    }

    // Input handle method. Uses switch to determine player's position relative to the canvas limits.
    handleInput(e) {
        switch (e) {
            case 'left':
                if (this.x >= 101) {
                    this.x -= 101;
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

// Initialize game and player
let currentGame = new GameBoard();
let player = new Player();
