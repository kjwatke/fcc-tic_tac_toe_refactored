var App = (function () {
    function App() {
        this.content = [];
        this.ctx = [];
        this.gameOver = false;
        this.oScore = 0;
        this.tiles = [];
        this.tilesDisabled = [];
        this.turnCount = 0;
        this.xScore = 0;
        this.map = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        ];
    }
    // Set the game up to be played on initialization.
    App.prototype.init = function () {
        var _this = this;
        this.cacheTiles();
        this.cacheCtx();
        this.manualReset();
        this.updateScore();
        // Prevent sparse arrays from being created.
        for (var i = 0; i < this.tiles.length; i += 1) {
            this.content[i] = '';
        }
        // Let the player select one player or two, set variable and then animate the overlay away, eventually removing it from document.
        var overlay = document.querySelector('.one-player-or-two');
        var onePlayer = document.querySelector('.one');
        // Manage click for one player selection.
        onePlayer.addEventListener('click', function () {
            _this.numOfPlayers = 1;
            overlay.classList.add('hide-overlay');
            setTimeout(function () {
                overlay.classList.add('remove-overlay');
                overlay.classList.remove('hide-overlay');
            }, 650);
        });
        // Manage click for two player selection.
        var twoPlayer = document.querySelector('.two');
        twoPlayer.addEventListener('click', function () {
            _this.numOfPlayers = 2;
            overlay.classList.add('hide-overlay');
            setTimeout(function () {
                overlay.classList.add('remove-overlay');
                overlay.classList.remove('hide-overlay');
            }, 650);
        });
        // Set playerChoice to x or o, depending on which button is clicked.
        var xOroOverlay = document.querySelector('.choose-symbol');
        var xChoice = document.querySelector('.x');
        // Player chose to play as X, set the player up to play as X.
        xChoice.addEventListener('click', function () {
            _this.playerChoice = 'x';
            _this.hideOMsg();
            _this.showXMsg();
            xOroOverlay.classList.add('hide-overlay');
            setTimeout(function () {
                xOroOverlay.classList.add('remove-overlay');
            }, 650);
        });
        // Player chose to play as O, set the player up to play as O.
        var oChoice = document.querySelector('.o');
        oChoice.addEventListener('click', function () {
            _this.playerChoice = 'o';
            _this.hideXMsg();
            _this.showOMsg();
            xOroOverlay.classList.add('hide-overlay');
            setTimeout(function () {
                xOroOverlay.classList.add('remove-overlay');
            }, 650);
        });
    };
    // Will run when user clicks a tile.
    App.prototype.draw = function (index) {
        // Check if game is out of possible turns or gameOver has been set to false.
        if (this.turnCount > 9 || this.gameOver) {
            return;
        }
        var tile = this.tiles[index];
        // Tile that was clicked can't have been clicked before.
        // If it hasn't been clicked, disable the tile for future,
        // fade it out and run animateTile method.
        if (!this.tilesDisabled[index]) {
            this.tilesDisabled[index] = true;
            tile.classList.add('fade-out-tile');
            this.animateTile(index);
            // Pick the right symbol to draw based on users choice at beginning of game.
            if (this.playerChoice === 'x') {
                this.drawX(index);
            }
            else if (this.playerChoice === 'o') {
                this.drawO(index);
            }
            // After player chooses a tile, check to see if it's a winning pattern.
            this.checkWin();
            // If there is still an open tile available and the game isn't over
            if (this.turnCount < 9 && !this.gameOver) {
                // If single player game was selected, let the computer play. Else, switch to 2nd player.
                if (this.numOfPlayers === 1) {
                    this.computerTurn();
                }
                else if (this.numOfPlayers > 1) {
                    this.playerChoice = this.playerChoice === 'x'
                        ? 'o'
                        : 'x';
                }
            }
            else {
                return;
            }
        }
    };
    // Animate the tile when selected by a user or AI.
    App.prototype.animateTile = function (index) {
        this.tiles[index].animate([
            {
                height: '100px',
                transform: ' rotateX(0deg) rotateY(0deg)',
                width: '100px'
            },
            {
                height: '50px',
                transform: ' rotateX(180deg) rotateY(180deg)',
                width: '50px'
            },
            {
                height: '100px',
                transform: 'rotateX(180deg) rotateY(180deg)',
                width: '100px'
            },
        ], {
            direction: 'alternate',
            duration: 1000,
            easing: 'ease-in-out',
            iterations: 1
        });
    };
    // Draw 'X' symbol on a tile.
    App.prototype.drawX = function (index) {
        var _this = this;
        this.turnCount++;
        this.content[index] = 'x';
        this.tilesDisabled[index] = true;
        var timeout = this.playerChoice === 'x'
            ? 300
            : 1200;
        setTimeout(function () {
            _this.ctx[index].strokeStyle = 'white';
            _this.ctx[index].lineCap = 'round';
            _this.ctx[index].lineWidth = 5;
            _this.ctx[index].beginPath();
            _this.ctx[index].moveTo(20, 20);
            _this.ctx[index].lineTo(80, 80);
            _this.ctx[index].moveTo(80, 20);
            _this.ctx[index].lineTo(20, 80);
            _this.ctx[index].stroke();
            _this.ctx[index].closePath();
            _this.hideXMsg();
            _this.showOMsg();
        }, timeout);
    };
    // Draw 'O' symbol on a tile.
    App.prototype.drawO = function (index) {
        var _this = this;
        // Set a delay, if drawO is called by computer, we want a delay, to make the user think the AI is 'thinking'.
        // If it isn't, we want to delay the drawing but not the animation.
        var animateDelay = this.playerChoice === 'x'
            ? 1200
            : 0;
        var drawDelay = this.playerChoice === 'x'
            ? 1400
            : 300;
        this.turnCount++;
        this.tilesDisabled[index] = true;
        this.content[index] = 'o';
        // Fade out the tile.
        setTimeout(function () {
            _this.tiles[index].classList.add('fade-out-tile');
        }, animateDelay);
        // Draw 'O' onto tile.
        setTimeout(function () {
            _this.ctx[index].strokeStyle = 'black';
            _this.ctx[index].beginPath();
            _this.ctx[index].lineWidth = 5;
            _this.ctx[index].arc(50, 50, 34, 0, Math.PI * 2, false);
            _this.ctx[index].stroke();
            _this.ctx[index].closePath();
            _this.hideOMsg();
            _this.showXMsg();
        }, drawDelay);
    };
    // Store all the tiles html elements in an array for access later.
    App.prototype.cacheTiles = function () {
        for (var i = 0; i < 9; i += 1) {
            this.tiles[i] = document.querySelector(".canvas" + i);
            this.tilesDisabled[i] = false;
        }
    };
    // In charge of running the tile animation with a delay to look similar to when a user clicks.
    App.prototype.handleComputerAnimation = function (index, delay) {
        var _this = this;
        this.compTurnAnimation = setTimeout(function () {
            _this.animateTile(index);
            _this.tiles[index].classList.add('fade-out-tile');
        }, delay);
    };
    // Cache canvas context for each tile for use later.
    App.prototype.cacheCtx = function () {
        for (var i = 0; i < 9; i += 1) {
            this.ctx[i] = this.tiles[i].getContext('2d');
        }
    };
    /*
       Will be called whenever the computer needs to pick a tile to draw on.
        This will never be called if user selects a 2 player game.
        It checks to see that a tile is still enabled, animates the tile, draws,
        the correct symbol and calls checkWin to see if it's a winning pattern.
        If random num generated for tile selection is taken, it will call itself
        and keep trying until it is found.
     */
    App.prototype.computerTurn = function () {
        var rand = Math.floor(Math.random() * 9);
        if (rand === 0 && !this.tilesDisabled[0]) {
            if (this.playerChoice === 'x') {
                this.handleComputerAnimation(0, 1000);
                this.drawO(0);
                this.checkWin();
            }
            else {
                this.handleComputerAnimation(0, 1000);
                this.drawX(0);
                this.checkWin();
            }
        }
        else if (rand === 1 && !this.tilesDisabled[1]) {
            if (this.playerChoice === 'x') {
                this.handleComputerAnimation(1, 1000);
                this.drawO(1);
                this.checkWin();
            }
            else {
                this.handleComputerAnimation(1, 1000);
                this.drawX(1);
                this.checkWin();
            }
        }
        else if (rand === 2 && !this.tilesDisabled[2]) {
            if (this.playerChoice === 'x') {
                this.handleComputerAnimation(2, 1000);
                this.drawO(2);
                this.checkWin();
            }
            else {
                this.handleComputerAnimation(2, 1000);
                this.drawX(2);
                this.checkWin();
            }
        }
        else if (rand === 3 && !this.tilesDisabled[3]) {
            if (this.playerChoice === 'x') {
                this.handleComputerAnimation(3, 1000);
                this.drawO(3);
                this.checkWin();
            }
            else {
                this.handleComputerAnimation(3, 1000);
                this.drawX(3);
                this.checkWin();
            }
        }
        else if (rand === 4 && !this.tilesDisabled[4]) {
            if (this.playerChoice === 'x') {
                this.handleComputerAnimation(4, 1000);
                this.drawO(4);
                this.checkWin();
            }
            else {
                this.handleComputerAnimation(4, 1000);
                this.drawX(4);
                this.checkWin();
            }
        }
        else if (rand === 5 && !this.tilesDisabled[5]) {
            if (this.playerChoice === 'x') {
                this.handleComputerAnimation(5, 1000);
                this.drawO(5);
                this.checkWin();
            }
            else {
                this.handleComputerAnimation(5, 1000);
                this.drawX(5);
                this.checkWin();
            }
        }
        else if (rand === 6 && !this.tilesDisabled[6]) {
            if (this.playerChoice === 'x') {
                this.handleComputerAnimation(6, 1000);
                this.drawO(6);
                this.checkWin();
            }
            else {
                this.handleComputerAnimation(6, 1000);
                this.drawX(6);
                this.checkWin();
            }
        }
        else if (rand === 7 && !this.tilesDisabled[7]) {
            if (this.playerChoice === 'x') {
                this.handleComputerAnimation(7, 1000);
                this.drawO(7);
                this.checkWin();
            }
            else {
                this.handleComputerAnimation(7, 1000);
                this.drawX(7);
                this.checkWin();
            }
        }
        else if (rand === 8 && !this.tilesDisabled[8]) {
            if (this.playerChoice === 'x') {
                this.handleComputerAnimation(8, 1000);
                this.drawO(8);
                this.checkWin();
            }
            else {
                this.handleComputerAnimation(8, 1000);
                this.drawX(8);
                this.checkWin();
            }
        }
        else {
            this.computerTurn();
        }
    };
    /*
      Check for winning patterns. If winning pattern is currently on board,
      gameOver is now true and call handleGameover to create a new Game.
   */
    App.prototype.checkWin = function () {
        if ((this.content[0] === 'x') &&
            (this.content[1] === 'x') &&
            (this.content[2] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
        }
        else if ((this.content[3] === 'x') &&
            (this.content[4] === 'x') &&
            (this.content[5] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
        }
        else if ((this.content[6] === 'x') &&
            (this.content[7] === 'x') &&
            (this.content[8] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
        }
        else if ((this.content[0] === 'x') &&
            (this.content[3] === 'x') &&
            (this.content[6] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
        }
        else if ((this.content[1] === 'x') &&
            (this.content[4] === 'x') &&
            (this.content[7] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
        }
        else if ((this.content[2] === 'x') &&
            (this.content[5] === 'x') &&
            (this.content[8] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
        }
        else if ((this.content[0] === 'x') &&
            (this.content[4] === 'x') &&
            (this.content[8] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
        }
        else if ((this.content[2] === 'x') &&
            (this.content[4] === 'x') &&
            (this.content[6] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
        }
        else if ((this.content[0] === 'o') &&
            (this.content[1] === 'o') &&
            (this.content[2] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
        }
        else if ((this.content[3] === 'o') &&
            (this.content[4] === 'o') &&
            (this.content[5] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
        }
        else if ((this.content[6] === 'o') &&
            (this.content[7] === 'o') &&
            (this.content[8] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
        }
        else if ((this.content[0] === 'o') &&
            (this.content[3] === 'o') &&
            (this.content[6] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
        }
        else if ((this.content[1] === 'o') &&
            (this.content[4] === 'o') &&
            (this.content[7] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
        }
        else if ((this.content[2] === 'o') &&
            (this.content[5] === 'o') &&
            (this.content[8] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
        }
        else if ((this.content[0] === 'o') &&
            (this.content[4] === 'o') &&
            (this.content[8] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
        }
        else if ((this.content[2] === 'o') &&
            (this.content[4] === 'o') &&
            (this.content[6] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
        }
        if (this.turnCount >= 9 && !this.gameOver) {
            this.gameOver = true;
            this.handleGameover('tie');
        }
    };
    // Reset html of scoreboard to reflect values of xScore/oScore.
    App.prototype.updateScore = function () {
        // Set the X scoreboard.
        var xScoreboard = document.querySelector('.span-x-score');
        xScoreboard.innerHTML = String(this.xScore);
        // Set the O scoreboard.
        var oScoreboard = document.querySelector('.span-o-score');
        oScoreboard.innerHTML = String(this.oScore);
    };
    // Called whenever game is out of enabled tiles or winning pattern is found.
    App.prototype.handleGameover = function (winner) {
        var _this = this;
        // Update the winner of the game.'
        if (winner === 'x' && winner !== 'tie') {
            this.winner = 'x';
        }
        else if (winner === 'o') {
            this.winner = 'o';
        }
        else {
            this.winner = '';
        }
        // If x or o passed in, alert players of winner, else, alert of tie game.
        if (winner !== 'tie') {
            setTimeout(function () {
                var msg = document.createElement('div');
                msg.classList.add('game-over-msg');
                msg.innerHTML = "<span>" + _this.winner + " won</span>";
                document.body.appendChild(msg);
                msg.animate([
                    {
                        opacity: 0,
                        transform: 'translateX(200px)'
                    },
                    {
                        opacity: 1,
                        transform: 'translateX(-20px)'
                    },
                    {
                        opacity: 1,
                        transform: 'translateX(0px)'
                    },
                ], {
                    direction: 'alternate',
                    duration: 1200,
                    easing: 'ease-in-out',
                    iterations: 1
                });
                // Remove the message from game board.
                setTimeout(function () {
                    document.body.removeChild(msg);
                }, 2500);
            }, 1000);
        }
        else {
            setTimeout(function () {
                var msg = document.createElement('div');
                msg.classList.add('game-over-msg');
                msg.innerHTML = "<span>Tie Game</span>";
                document.body.appendChild(msg);
                msg.animate([
                    {
                        opacity: 0,
                        transform: 'translateX(200px)'
                    },
                    {
                        opacity: 1,
                        transform: 'translateX(-20px)'
                    },
                    {
                        opacity: 1,
                        transform: 'translateX(0px)'
                    },
                ], {
                    direction: 'alternate',
                    duration: 1200,
                    easing: 'ease-in-out',
                    iterations: 1
                });
                // Remove the message from game board.
                setTimeout(function () {
                    document.body.removeChild(msg);
                }, 2500);
            }, 1000);
        }
        // Update the scoreboard.
        if (this.winner === 'x') {
            this.xScore += 1;
        }
        else if (this.winner === 'o') {
            this.oScore += 1;
        }
        // Append score to scoreboard.
        setTimeout(function () {
            _this.updateScore();
        }, 1500);
        // Game is over, wipe board.q
        setTimeout(function () {
            if (_this.winner === 'x') {
                _this.hideOMsg();
                _this.showXMsg();
            }
            else {
                _this.hideXMsg();
                _this.showOMsg();
            }
            _this.clearBoard();
        }, 2100);
        // If user won, do nothing for now.
        // If computer won, make it go first for next game.
        if (this.winner !== this.playerChoice && this.numOfPlayers === 1) {
            setTimeout(function () {
                _this.computerTurn();
            }, 2500);
        }
    };
    // Apply styles to tiles when hovered over, depending on if they are enabled or disabled.
    App.prototype.hover = function (index) {
        // If button hasn't been clicked yet, apply styles.
        if (!this.tilesDisabled[index]) {
            this.tiles[index].style = "\n        background: #90ee90;\n        transition: background 400ms ease-in\n      ";
        }
        else if (this.tilesDisabled[index]) {
            this.tiles[index].style = "\n        background: #f00;\n        transition: background 400ms ease-in;\n      ";
        }
    };
    // Remove styles added on hover when user moves mouse out of tile area.
    App.prototype.removeHover = function (index) {
        // If button hasn't been clicked yet, apply styles.
        if (!this.tilesDisabled[index]) {
            this.tiles[index].style = "\n        background: #87ceeb;\n        transition: background 300ms ease-out;\n      ";
        }
        else if (this.tilesDisabled[index]) {
            this.tiles[index].style = "\n        background: #87ceeb;\n        transition: background 300ms ease-out;\n      ";
        }
    };
    // Animate the 'player x turn' down behind the game board.
    App.prototype.hideXMsg = function () {
        var xMsg = document.querySelector('.x-turn');
        xMsg.animate([
            {
                transform: 'translateY(0px)'
            },
            {
                transform: 'translateY(50px)'
            },
        ], {
            direction: 'normal',
            duration: 800,
            easing: 'ease-in-out',
            fill: 'forwards',
            iterations: 1
        });
    };
    // Animate the 'player x turn' up above game board.
    App.prototype.showXMsg = function () {
        var xMsg = document.querySelector('.x-turn');
        xMsg.animate([
            { transform: 'translateY(50px)' },
            { transform: 'translateY(0px)' },
        ], {
            direction: 'normal',
            duration: 800,
            easing: 'ease-in-out',
            fill: 'forwards',
            iterations: 1
        });
    };
    // Animate the 'player o turn' banner behind the game board.
    App.prototype.hideOMsg = function () {
        var oMsg = document.querySelector('.o-turn');
        oMsg.animate([
            {
                transform: 'translateY(0px)'
            },
            {
                transform: 'translateY(50px)'
            },
        ], {
            direction: 'normal',
            duration: 800,
            easing: 'ease-in-out',
            fill: 'forwards',
            iterations: 1
        });
    };
    // Animate the 'player o turn' above game board.
    App.prototype.showOMsg = function () {
        var oMsg = document.querySelector('.o-turn');
        oMsg.animate([
            {
                transform: 'translateY(50px)'
            },
            {
                transform: 'translateY(0px)'
            },
        ], {
            direction: 'normal',
            duration: 800,
            easing: 'ease-in-out',
            fill: 'forwards',
            iterations: 1
        });
    };
    // When game is over or reset button is pressed, reset values and wipe board.
    App.prototype.clearBoard = function () {
        var _this = this;
        // Set an '' to for each possible tile. This will avoid sparse arrays later.
        for (var i = 0; i < 9; i += 1) {
            this.content[i] = '';
        }
        // Game is over, loop through array and reset each button to be enabled.
        this.tilesDisabled.forEach(function (item, index) {
            _this.tilesDisabled[index] = false;
        });
        // Game is over, loop through each of our tiles and clear the drawing of X/O.
        this.ctx.forEach(function (item, index) {
            item.clearRect(0, 0, 100, 100);
        });
        // Loop though each tile and remove the styles to return the opacity to 1.
        this.tiles.forEach(function (item) {
            item.classList.remove('fade-out-tile');
        });
        // Set values back to defaults, removing this break the ability to play a new game after a win or tie.
        this.gameOver = false;
        this.turnCount = 0;
        // Remove winner.
        this.winner = '';
    };
    // Reset game board, score, all variables assoicated with game.
    // This will only be used when player hits reset button.
    App.prototype.manualReset = function () {
        var _this = this;
        var resetBtn = document.querySelector('.reload');
        resetBtn.addEventListener('click', function () {
            // Confirm the user actually wants to clear game and reset state.
            var clear = prompt("\n                            Are you sure you want to clear games ?\n                            This will clear the board and the score.\n                            Enter y to continue, anything else to abort\n                          ");
            if (clear.toLowerCase() === 'y') {
                // Player confirmed, clear the game score and board.
                _this.clearBoard();
                // Reset scores.
                _this.xScore = 0;
                _this.oScore = 0;
                _this.updateScore();
            }
        });
    };
    return App;
}());
var appInstance = new App();
appInstance.init();
