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
    };
    App.prototype.draw = function (index) {
        var _this = this;
        this.turnCount++;
        if (this.turnCount > 9) {
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
            if (this.turnCount < 9) {
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
    };
    return App;
}());
var appInstance = new App();
appInstance.init();
