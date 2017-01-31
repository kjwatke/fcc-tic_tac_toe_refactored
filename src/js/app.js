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
        this.cacheTiles();
        this.cacheCtx();
        this.manualReset();
        for (var i = 0; i < this.tiles.length; i += 1) {
            this.content[i] = '';
        }
    };
    App.prototype.draw = function (index) {
        var _this = this;
        this.turnCount++;
        if (this.turnCount > 9 || this.gameOver) {
            return;
        }
        var tile = this.tiles[index];
        if (!this.tilesDisabled[index]) {
            this.tilesDisabled[index] = true;
            tile.classList.add('fade-out-tile');
            this.content[index] = 'x';
            this.tiles[index].style =
                'transform: rotateY(180deg); transition: transform 500ms ease-in';
            // Draw an X.
            setTimeout(function () {
                _this.ctx[index].lineCap = 'round';
                _this.ctx[index].lineWidth = 3;
                _this.ctx[index].beginPath();
                _this.ctx[index].moveTo(20, 20);
                _this.ctx[index].lineTo(80, 80);
                _this.ctx[index].moveTo(80, 20);
                _this.ctx[index].lineTo(20, 80);
                _this.ctx[index].stroke();
                _this.ctx[index].closePath();
            }, 300);
            this.checkWin();
            if (this.turnCount < 9 && !this.gameOver) {
                this.computerTurn();
            }
            else {
                return;
            }
        }
    };
    App.prototype.cacheTiles = function () {
        for (var i = 0; i < 9; i += 1) {
            this.tiles[i] = document.querySelector(".canvas" + i);
            this.tilesDisabled[i] = false;
        }
    };
    App.prototype.cacheCtx = function () {
        for (var i = 0; i < 9; i += 1) {
            this.ctx[i] = this.tiles[i].getContext('2d');
        }
    };
    App.prototype.computerTurn = function () {
        var rand = Math.floor(Math.random() * 9);
        if (rand === 0 && !this.tilesDisabled[0]) {
            this.drawOSteps(0);
        }
        else if (rand === 1 && !this.tilesDisabled[1]) {
            this.drawOSteps(1);
        }
        else if (rand === 2 && !this.tilesDisabled[2]) {
            this.drawOSteps(2);
        }
        else if (rand === 3 && !this.tilesDisabled[3]) {
            this.drawOSteps(3);
        }
        else if (rand === 4 && !this.tilesDisabled[4]) {
            this.drawOSteps(4);
        }
        else if (rand === 5 && !this.tilesDisabled[5]) {
            this.drawOSteps(5);
        }
        else if (rand === 6 && !this.tilesDisabled[6]) {
            this.drawOSteps(6);
        }
        else if (rand === 7 && !this.tilesDisabled[7]) {
            this.drawOSteps(7);
        }
        else if (rand === 8 && !this.tilesDisabled[8]) {
            this.drawOSteps(8);
        }
        else {
            this.computerTurn();
        }
    };
    App.prototype.drawOSteps = function (index) {
        var _this = this;
        this.turnCount++;
        this.tilesDisabled[index] = true;
        this.content[index] = 'o';
        setTimeout(function () {
            _this.tiles[index].classList.add('fade-out-tile');
            _this.tiles[index].style =
                'transform: rotateY(180deg); transition: transform 500ms ease-out';
        }, 1000);
        setTimeout(function () {
            _this.ctx[index].beginPath();
            _this.ctx[index].lineWidth = 3;
            _this.ctx[index].arc(50, 50, 34, 0, Math.PI * 2, false);
            _this.ctx[index].stroke();
            _this.ctx[index].closePath();
        }, 1200);
        this.checkWin();
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
            console.log("game over! " + winner + " won");
        }
        else {
            console.log('game over! tie game!');
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
        for (var i = 0; i < 9; i += 1) {
            this.content[i] = '';
        }
        this.tilesDisabled.forEach(function (item, index) {
            _this.tilesDisabled[index] = false;
        });
        this.ctx.forEach(function (item, index) {
            item.clearRect(0, 0, 100, 100);
        });
        this.tiles.forEach(function (item) {
            item.classList.remove('fade-out-tile');
        });
        this.gameOver = false;
        this.turnCount = 0;
    };
    App.prototype.manualReset = function () {
        var _this = this;
        var resetBtn = document.querySelector('.reload');
        resetBtn.addEventListener('click', function () {
            _this.clearBoard();
        });
    };
    return App;
}());
var appInstance = new App();
appInstance.init();
