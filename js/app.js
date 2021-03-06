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
    App.prototype.init = function () {
        var _this = this;
        this.cacheTiles();
        this.cacheCtx();
        this.manualReset();
        this.updateScore();
        for (var i = 0; i < this.tiles.length; i += 1) {
            this.content[i] = '';
        }
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
        var xOroOverlay = document.querySelector('.choose-symbol');
        var xChoice = document.querySelector('.x');
        xChoice.addEventListener('click', function () {
            _this.playerChoice = 'x';
            _this.hideOMsg();
            _this.showXMsg();
            xOroOverlay.classList.add('hide-overlay');
            setTimeout(function () {
                xOroOverlay.classList.add('remove-overlay');
            }, 650);
        });
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
    App.prototype.draw = function (index) {
        if (this.turnCount > 9 || this.gameOver) {
            return;
        }
        var tile = this.tiles[index];
        if (!this.tilesDisabled[index]) {
            this.tilesDisabled[index] = true;
            tile.classList.add('fade-out-tile');
            this.animateTile(index);
            if (this.playerChoice === 'x') {
                this.drawX(index);
            }
            else if (this.playerChoice === 'o') {
                this.drawO(index);
            }
            this.checkWin();
            if (this.turnCount < 9 && !this.gameOver) {
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
    App.prototype.animateTile = function (index) {
        this.tiles[index].animate([
            {
                height: '100px',
                transform: ' rotateX(0deg) rotateY(0deg)',
                width: '100px',
            },
            {
                height: '50px',
                transform: ' rotateX(180deg) rotateY(180deg)',
                width: '50px',
            },
            {
                height: '100px',
                transform: 'rotateX(180deg) rotateY(180deg)',
                width: '100px',
            },
        ], {
            direction: 'alternate',
            duration: 1000,
            easing: 'ease-in-out',
            iterations: 1,
        });
    };
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
    App.prototype.drawO = function (index) {
        var _this = this;
        var animateDelay = this.playerChoice === 'x'
            ? 1200
            : 0;
        var drawDelay = this.playerChoice === 'x'
            ? 1400
            : 300;
        this.turnCount++;
        this.tilesDisabled[index] = true;
        this.content[index] = 'o';
        setTimeout(function () {
            _this.tiles[index].classList.add('fade-out-tile');
        }, animateDelay);
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
    App.prototype.cacheTiles = function () {
        for (var i = 0; i < 9; i += 1) {
            this.tiles[i] = document.querySelector(".canvas" + i);
            this.tilesDisabled[i] = false;
        }
    };
    App.prototype.handleComputerAnimation = function (index, delay) {
        var _this = this;
        this.compTurnAnimation = setTimeout(function () {
            _this.animateTile(index);
            _this.tiles[index].classList.add('fade-out-tile');
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
    App.prototype.updateScore = function () {
        var xScoreboard = document.querySelector('.span-x-score');
        xScoreboard.innerHTML = String(this.xScore);
        var oScoreboard = document.querySelector('.span-o-score');
        oScoreboard.innerHTML = String(this.oScore);
    };
    App.prototype.handleGameover = function (winner) {
        var _this = this;
        if (winner === 'x' && winner !== 'tie') {
            this.winner = 'x';
        }
        else if (winner === 'o') {
            this.winner = 'o';
        }
        else {
            this.winner = '';
        }
        if (winner !== 'tie') {
            setTimeout(function () {
                if (_this.winner === 'x') {
                    console.log('x' + ' won');
                    var winMsg = document.createElement('div');
                    winMsg.classList.add('x-won');
                    winMsg.innerHTML = 'X Player Won';
                    document.body.appendChild(winMsg);
                }
                else if (_this.winner === 'o') {
                    console.log('o' + ' won');
                    var winMsg = document.createElement('div');
                    winMsg.classList.add('o-won');
                    winMsg.innerHTML = 'O Player Won';
                    document.body.appendChild(winMsg);
                }
            }, 700);
        }
        else {
            setTimeout(function () {
                console.log("game over! Tie game");
            }, 700);
        }
        console.log('board: ', this.content);
        if (this.winner === 'x') {
            this.xScore += 1;
        }
        else if (this.winner === 'o') {
            this.oScore += 1;
        }
        setTimeout(function () {
            _this.updateScore();
        }, 1500);
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
        if (this.winner !== this.playerChoice && this.numOfPlayers === 1) {
            setTimeout(function () {
                _this.computerTurn();
            }, 2500);
        }
    };
    App.prototype.hover = function (index) {
        if (!this.tilesDisabled[index]) {
            this.tiles[index].style = "\n        background: #90ee90;\n        transition: background 400ms ease-in\n      ";
        }
        else if (this.tilesDisabled[index]) {
            this.tiles[index].style = "\n        background: #f00;\n        transition: background 400ms ease-in;\n      ";
        }
    };
    App.prototype.removeHover = function (index) {
        if (!this.tilesDisabled[index]) {
            this.tiles[index].style = "\n        background: #87ceeb;\n        transition: background 300ms ease-out;\n      ";
        }
        else if (this.tilesDisabled[index]) {
            this.tiles[index].style = "\n        background: #87ceeb;\n        transition: background 300ms ease-out;\n      ";
        }
    };
    App.prototype.hideXMsg = function () {
        var xMsg = document.querySelector('.x-turn');
        xMsg.animate([
            {
                transform: 'translateY(0px)',
            },
            {
                transform: 'translateY(50px)',
            },
        ], {
            direction: 'normal',
            duration: 800,
            easing: 'ease-in-out',
            fill: 'forwards',
            iterations: 1,
        });
    };
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
            iterations: 1,
        });
    };
    App.prototype.hideOMsg = function () {
        var oMsg = document.querySelector('.o-turn');
        oMsg.animate([
            {
                transform: 'translateY(0px)',
            },
            {
                transform: 'translateY(50px)',
            },
        ], {
            direction: 'normal',
            duration: 800,
            easing: 'ease-in-out',
            fill: 'forwards',
            iterations: 1,
        });
    };
    App.prototype.showOMsg = function () {
        var oMsg = document.querySelector('.o-turn');
        oMsg.animate([
            {
                transform: 'translateY(50px)',
            },
            {
                transform: 'translateY(0px)',
            },
        ], {
            direction: 'normal',
            duration: 800,
            easing: 'ease-in-out',
            fill: 'forwards',
            iterations: 1,
        });
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
        this.winner = '';
    };
    App.prototype.manualReset = function () {
        var _this = this;
        var resetBtn = document.querySelector('.reload');
        resetBtn.addEventListener('click', function () {
            var clear = prompt("\n                            Are you sure you want to clear games ?\n                            This will clear the board and the score.\n                            Enter y to continue, anything else to abort\n                          ");
            if (clear.toLowerCase() === 'y') {
                _this.clearBoard();
                _this.xScore = 0;
                _this.oScore = 0;
                _this.updateScore();
            }
        });
    };
    App.prototype.testMethod = function () {
        return 'hello world';
    };
    return App;
}());
var appInstance = new App();
appInstance.init();
