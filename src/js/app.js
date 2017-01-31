var App = (function () {
    function App() {
        this.tiles = [];
        this.tilesDisabled = [];
        this.ctx = [];
        this.gameOver = false;
        this.content = [];
        this.turnCount = 0;
        this.map = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        ];
    }
    App.prototype.init = function () {
        var _this = this;
        this.cacheTiles();
        this.cacheCtx();
        this.manualReset();
        for (var i = 0; i < this.tiles.length; i += 1) {
            this.content[i] = '';
        }
        // Let the player select one player or two, set variable and then animate the overlay away, eventually removing it from document.
        var overlay = document.querySelector('.one-player-or-two');
        var onePlayer = document.querySelector('.one');
        onePlayer.addEventListener('click', function () {
            _this.numOfPlayers = 1;
            overlay.classList.add('hide-overlay');
            setTimeout(function () {
                overlay.classList.add('remove-overlay');
                overlay.classList.remove('hide-overlay');
            }, 650);
        });
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
        xChoice.addEventListener('click', function () {
            _this.playerChoice = 'x';
            xOroOverlay.classList.add('hide-overlay');
            setTimeout(function () {
                xOroOverlay.classList.add('remove-overlay');
            }, 650);
        });
        var oChoice = document.querySelector('.o');
        oChoice.addEventListener('click', function () {
            _this.playerChoice = 'o';
            xOroOverlay.classList.add('hide-overlay');
            setTimeout(function () {
                xOroOverlay.classList.add('remove-overlay');
            }, 650);
        });
    };
    App.prototype.draw = function (index) {
        this.turnCount++;
        if (this.turnCount > 9 || this.gameOver) {
            return;
        }
        var tile = this.tiles[index];
        if (!this.tilesDisabled[index]) {
            this.tilesDisabled[index] = true;
            tile.classList.add('fade-out-tile');
            // this.content[index] = this.playerChoice;
            this.tiles[index].style =
                'transform: rotateY(180deg); transition: transform 500ms ease-in';
            if (this.playerChoice === 'x') {
                this.drawX(index);
            }
            else if (this.playerChoice === 'o') {
                this.drawO(index);
            }
            this.checkWin();
            if (this.turnCount < 9 && !this.gameOver) {
                this.computerTurn();
            }
            else {
                return;
            }
        }
    };
    App.prototype.drawX = function (index) {
        var _this = this;
        this.content[index] = 'x';
        this.tilesDisabled[index] = true;
        var timeout = this.playerChoice === 'x'
            ? 300
            : 1200;
        setTimeout(function () {
            _this.ctx[index].lineCap = 'round';
            _this.ctx[index].lineWidth = 5;
            _this.ctx[index].beginPath();
            _this.ctx[index].moveTo(20, 20);
            _this.ctx[index].lineTo(80, 80);
            _this.ctx[index].moveTo(80, 20);
            _this.ctx[index].lineTo(20, 80);
            _this.ctx[index].stroke();
            _this.ctx[index].closePath();
        }, timeout);
        this.checkWin();
    };
    App.prototype.drawO = function (index) {
        var _this = this;
        var animateDelay = this.playerChoice === 'x'
            ? 1000
            : 0;
        var drawDelay = this.playerChoice === 'x'
            ? 1200
            : 300;
        this.turnCount++;
        this.tilesDisabled[index] = true;
        this.content[index] = 'o';
        setTimeout(function () {
            _this.tiles[index].classList.add('fade-out-tile');
            _this.tiles[index].style =
                'transform: rotateY(180deg); transition: transform 500ms ease-out';
        }, animateDelay);
        setTimeout(function () {
            _this.ctx[index].beginPath();
            _this.ctx[index].lineWidth = 5;
            _this.ctx[index].arc(50, 50, 34, 0, Math.PI * 2, false);
            _this.ctx[index].stroke();
            _this.ctx[index].closePath();
        }, drawDelay);
        this.checkWin();
    };
    App.prototype.cacheTiles = function () {
        for (var i = 0; i < 9; i += 1) {
            this.tiles[i] = document.querySelector(".canvas" + i);
            this.tilesDisabled[i] = false;
        }
    };
    App.prototype.handleComputerAnimation = function (index, delay) {
        var _this = this;
        setTimeout(function () {
            _this.tiles[index].classList.add('fade-out-tile');
            _this.tiles[index].style =
                'transform: rotateY(180deg); transition: transform 500ms ease-out';
        }, delay);
    };
    App.prototype.cacheCtx = function () {
        for (var i = 0; i < 9; i += 1) {
            this.ctx[i] = this.tiles[i].getContext('2d');
        }
    };
    App.prototype.computerTurn = function () {
        var rand = Math.floor(Math.random() * 9);
        if (rand === 0 && !this.tilesDisabled[0]) {
            if (this.playerChoice === 'x') {
                this.drawO(0);
            }
            else {
                this.handleComputerAnimation(0, 1000);
                this.drawX(0);
            }
        }
        else if (rand === 1 && !this.tilesDisabled[1]) {
            if (this.playerChoice === 'x') {
                this.drawO(1);
            }
            else {
                this.handleComputerAnimation(1, 1000);
                this.drawX(1);
            }
        }
        else if (rand === 2 && !this.tilesDisabled[2]) {
            if (this.playerChoice === 'x') {
                this.drawO(2);
            }
            else {
                this.handleComputerAnimation(2, 1000);
                this.drawX(2);
            }
        }
        else if (rand === 3 && !this.tilesDisabled[3]) {
            if (this.playerChoice === 'x') {
                this.drawO(3);
            }
            else {
                this.handleComputerAnimation(3, 1000);
                this.drawX(3);
            }
        }
        else if (rand === 4 && !this.tilesDisabled[4]) {
            if (this.playerChoice === 'x') {
                this.drawO(4);
            }
            else {
                this.handleComputerAnimation(4, 1000);
                this.drawX(4);
            }
        }
        else if (rand === 5 && !this.tilesDisabled[5]) {
            if (this.playerChoice === 'x') {
                this.drawO(5);
            }
            else {
                this.handleComputerAnimation(5, 1000);
                this.drawX(5);
            }
        }
        else if (rand === 6 && !this.tilesDisabled[6]) {
            if (this.playerChoice === 'x') {
                this.drawO(6);
            }
            else {
                this.handleComputerAnimation(6, 1000);
                this.drawX(6);
            }
        }
        else if (rand === 7 && !this.tilesDisabled[7]) {
            if (this.playerChoice === 'x') {
                this.drawO(7);
            }
            else {
                this.handleComputerAnimation(7, 1000);
                this.drawX(7);
            }
        }
        else if (rand === 8 && !this.tilesDisabled[8]) {
            if (this.playerChoice === 'x') {
                this.drawO(8);
            }
            else {
                this.handleComputerAnimation(8, 1000);
                this.drawX(8);
            }
        }
        else {
            this.computerTurn();
        }
    };
    App.prototype.checkWin = function () {
        if ((this.content[0] === 'x') &&
            (this.content[1] === 'x') &&
            (this.content[2] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
            return;
        }
        else if ((this.content[3] === 'x') &&
            (this.content[4] === 'x') &&
            (this.content[5] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
            return;
        }
        else if ((this.content[6] === 'x') &&
            (this.content[7] === 'x') &&
            (this.content[8] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
            return;
        }
        else if ((this.content[0] === 'x') &&
            (this.content[3] === 'x') &&
            (this.content[6] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
            return;
        }
        else if ((this.content[1] === 'x') &&
            (this.content[4] === 'x') &&
            (this.content[7] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
            return;
        }
        else if ((this.content[2] === 'x') &&
            (this.content[5] === 'x') &&
            (this.content[8] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
            return;
        }
        else if ((this.content[0] === 'x') &&
            (this.content[4] === 'x') &&
            (this.content[8] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
            return;
        }
        else if ((this.content[2] === 'x') &&
            (this.content[4] === 'x') &&
            (this.content[6] === 'x')) {
            this.gameOver = true;
            this.handleGameover('x');
            return;
        }
        else if ((this.content[0] === 'o') &&
            (this.content[1] === 'o') &&
            (this.content[2] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
            return;
        }
        else if ((this.content[3] === 'o') &&
            (this.content[4] === 'o') &&
            (this.content[5] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
            return;
        }
        else if ((this.content[6] === 'o') &&
            (this.content[7] === 'o') &&
            (this.content[8] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
            return;
        }
        else if ((this.content[0] === 'o') &&
            (this.content[3] === 'o') &&
            (this.content[6] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
            return;
        }
        else if ((this.content[1] === 'o') &&
            (this.content[4] === 'o') &&
            (this.content[7] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
            return;
        }
        else if ((this.content[2] === 'o') &&
            (this.content[5] === 'o') &&
            (this.content[8] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
            return;
        }
        else if ((this.content[0] === 'o') &&
            (this.content[4] === 'o') &&
            (this.content[8] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
            return;
        }
        else if ((this.content[2] === 'o') &&
            (this.content[4] === 'o') &&
            (this.content[6] === 'o')) {
            this.gameOver = true;
            this.handleGameover('o');
            return;
        }
        if (this.turnCount === 9 && !this.gameOver) {
            this.handleGameover('tie');
            this.gameOver = true;
            return;
        }
    };
    App.prototype.handleGameover = function (winner) {
        var _this = this;
        // If x or o passed in, alert players of winner, else, alert of tie game.
        if (winner !== 'tie') {
            setTimeout(function () {
                console.log("game over! " + winner + " won");
            }, 700);
        }
        else {
            setTimeout(function () {
                console.log("game over! Tie game");
            }, 700);
        }
        // Game is over, wipe board.
        setTimeout(function () {
            _this.clearBoard();
        }, 1500);
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
    };
    App.prototype.manualReset = function () {
        var _this = this;
        var resetBtn = document.querySelector('.reload');
        resetBtn.addEventListener('click', function () {
            // Confirm the user actually wants to clear game and reset state.
            var clear = prompt('Are you sure you want to clear games ?' +
                'This will clear the board and the score' +
                'Enter y to continue, anything else to abort');
            if (clear.toLowerCase() === 'y') {
                // Player confirmed, clear the game score and board.
                _this.clearBoard();
            }
        });
    };
    return App;
}());
var appInstance = new App();
appInstance.init();
