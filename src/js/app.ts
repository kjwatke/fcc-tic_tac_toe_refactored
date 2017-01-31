class App {
  private tiles: any[] = [];
  private tilesDisabled: boolean[] = [];
  private ctx: any[] = [];
  private gameOver: boolean = false;
  private numOfPlayers: number;
  private content: string[] = [];
  private playerChoice: string;
  private turnCount: number = 0;
  private map: number[] =
  [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
  ];

  public init(): void {
    this.cacheTiles();
    this.cacheCtx();
    this.manualReset();

    for (let i = 0; i < this.tiles.length; i += 1) {
      this.content[i] = '';
    }

    // Let the player select one player or two, set variable and then animate the overlay away, eventually removing it from document.
    const overlay = document.querySelector('.one-player-or-two');
    const onePlayer = document.querySelector('.one');
    onePlayer.addEventListener('click', () => {
      this.numOfPlayers = 1;
      overlay.classList.add('hide-overlay');
      setTimeout(() => {
        overlay.classList.add('remove-overlay');
        overlay.classList.remove('hide-overlay');
      }, 650);
    });

    const twoPlayer = document.querySelector('.two');
    twoPlayer.addEventListener('click', () => {
      this.numOfPlayers = 2;
      overlay.classList.add('hide-overlay');
      setTimeout(() => {
        overlay.classList.add('remove-overlay');
        overlay.classList.remove('hide-overlay');
      }, 650);
    });

    // Set playerChoice to x or o, depending on which button is clicked.
    const xOroOverlay: Element = document.querySelector('.choose-symbol');
    const xChoice: Element = document.querySelector('.x');
    xChoice.addEventListener('click', () => {
      this.playerChoice = 'x';
      xOroOverlay.classList.add('hide-overlay');
      setTimeout(() => {
        xOroOverlay.classList.add('remove-overlay');
      }, 650);
    });

    const oChoice: Element = document.querySelector('.o');
    oChoice.addEventListener('click', () => {
      this.playerChoice = 'o';
      xOroOverlay.classList.add('hide-overlay');
      setTimeout(() => {
        xOroOverlay.classList.add('remove-overlay');
      }, 650);
    });

  }

  public draw(index): void {
    this.turnCount++;
    if (this.turnCount > 9 || this.gameOver) {
      return;
    }
    const tile = this.tiles[index];
    if (!this.tilesDisabled[index]) {
      this.tilesDisabled[index] = true;
      tile.classList.add('fade-out-tile');
      // this.content[index] = this.playerChoice;
      this.tiles[index].style =
        'transform: rotateY(180deg); transition: transform 500ms ease-in';

      if (this.playerChoice === 'x') {
        this.drawX(index);
      } else if (this.playerChoice === 'o') {
        this.drawO(index);
      }

      this.checkWin();

      if (this.turnCount < 9 && !this.gameOver) {
        this.computerTurn();
      } else {
        return;
      }
    }
  }

  private drawX(index): void {
    this.content[index] = 'x';
    this.tilesDisabled[index] = true;
    const timeout = this.playerChoice === 'x'
      ? 300
      : 1200;
    setTimeout(() => {
      this.ctx[index].lineCap = 'round';
      this.ctx[index].lineWidth = 5;
      this.ctx[index].beginPath();
      this.ctx[index].moveTo(20, 20);
      this.ctx[index].lineTo(80, 80);
      this.ctx[index].moveTo(80, 20);
      this.ctx[index].lineTo(20, 80);
      this.ctx[index].stroke();
      this.ctx[index].closePath();
      }, timeout);

    this.checkWin();
  }

  private drawO(index): void {
    const animateDelay = this.playerChoice === 'x'
      ? 1000
      : 0;
    const drawDelay = this.playerChoice === 'x'
      ? 1200
      : 300;
    this.turnCount++;
    this.tilesDisabled[index] = true;
    this.content[index] = 'o';

    setTimeout(() => {
      this.tiles[index].classList.add('fade-out-tile');
      this.tiles[index].style =
      'transform: rotateY(180deg); transition: transform 500ms ease-out';
    }, animateDelay);

    setTimeout(() => {
      this.ctx[index].beginPath();
      this.ctx[index].lineWidth = 5;
      this.ctx[index].arc(50, 50, 34, 0, Math.PI * 2, false);
      this.ctx[index].stroke();
      this.ctx[index].closePath();
    }, drawDelay);

    this.checkWin();
  }

  private cacheTiles(): void {
    for (let i = 0; i < 9; i += 1) {
      this.tiles[i] = document.querySelector(`.canvas${i}`);
      this.tilesDisabled[i] = false;

    }
  }

  private handleComputerAnimation(index, delay): void {
    setTimeout(() => {
      this.tiles[index].classList.add('fade-out-tile');
      this.tiles[index].style =
      'transform: rotateY(180deg); transition: transform 500ms ease-out';
    }, delay);
  }

  private cacheCtx(): void {
    for (let i = 0; i < 9; i += 1) {
      this.ctx[i] = this.tiles[i].getContext('2d');
    }
  }

  private computerTurn(): void {
    const rand = Math.floor(Math.random() * 9);

    if (rand === 0 && !this.tilesDisabled[0]) {
      if (this.playerChoice === 'x') {
        this.drawO(0);
      } else {
        this.handleComputerAnimation(0, 1000);
        this.drawX(0);
      }
    } else if (rand === 1 && !this.tilesDisabled[1]) {
      if (this.playerChoice === 'x') {
        this.drawO(1);
      } else {
        this.handleComputerAnimation(1, 1000);
        this.drawX(1);
      }
    } else if (rand === 2 && !this.tilesDisabled[2]) {
      if (this.playerChoice === 'x') {
        this.drawO(2);
      } else {
        this.handleComputerAnimation(2, 1000);
        this.drawX(2);
      }
    } else if (rand === 3 && !this.tilesDisabled[3]) {
      if (this.playerChoice === 'x') {
        this.drawO(3);
      } else {
        this.handleComputerAnimation(3, 1000);
        this.drawX(3);
      }
    } else if (rand === 4 && !this.tilesDisabled[4]) {
      if (this.playerChoice === 'x') {
        this.drawO(4);
      } else {
        this.handleComputerAnimation(4, 1000);
        this.drawX(4);
      }
    } else if (rand === 5 && !this.tilesDisabled[5]) {
      if (this.playerChoice === 'x') {
        this.drawO(5);
      } else {
        this.handleComputerAnimation(5, 1000);
        this.drawX(5);
      }
    } else if (rand === 6 && !this.tilesDisabled[6]) {
      if (this.playerChoice === 'x') {
        this.drawO(6);
      } else {
        this.handleComputerAnimation(6, 1000);
        this.drawX(6);
      }
    } else if (rand === 7 && !this.tilesDisabled[7]) {
      if (this.playerChoice === 'x') {
        this.drawO(7);
      } else {
        this.handleComputerAnimation(7, 1000);
        this.drawX(7);
      }
    } else if (rand === 8 && !this.tilesDisabled[8]) {
      if (this.playerChoice === 'x') {
        this.drawO(8);
      } else {
        this.handleComputerAnimation(8, 1000);
        this.drawX(8);
      }
    } else {
      this.computerTurn();
    }
  }

  private checkWin(): string {

    if ( (this.content[0] === 'x') &&
         (this.content[1] === 'x') &&
         (this.content[2] === 'x') ) {
           this.gameOver = true;
           this.handleGameover('x');
           return;

    } else if ( (this.content[3] === 'x') &&
         (this.content[4] === 'x') &&
         (this.content[5] === 'x') ) {
           this.gameOver = true;
           this.handleGameover('x');
           return;

    } else if ( (this.content[6] === 'x') &&
         (this.content[7] === 'x') &&
         (this.content[8] === 'x') ) {
           this.gameOver = true;
           this.handleGameover('x');
           return;

    } else if ( (this.content[0] === 'x') &&
         (this.content[3] === 'x') &&
         (this.content[6] === 'x') ) {
           this.gameOver = true;
           this.handleGameover('x');
           return;

    } else if ( (this.content[1] === 'x') &&
         (this.content[4] === 'x') &&
         (this.content[7] === 'x') ) {
           this.gameOver = true;
           this.handleGameover('x');
           return;

    } else if ( (this.content[2] === 'x') &&
         (this.content[5] === 'x') &&
         (this.content[8] === 'x') ) {
           this.gameOver = true;
           this.handleGameover('x');
           return;

    } else if ( (this.content[0] === 'x') &&
         (this.content[4] === 'x') &&
         (this.content[8] === 'x') ) {
           this.gameOver = true;
           this.handleGameover('x');
           return;

    } else if ( (this.content[2] === 'x') &&
         (this.content[4] === 'x') &&
         (this.content[6] === 'x') ) {
           this.gameOver = true;
           this.handleGameover('x');
           return;

    } else if ( (this.content[0] === 'o') &&
         (this.content[1] === 'o') &&
         (this.content[2] === 'o') ) {
           this.gameOver = true;
           this.handleGameover('o');
           return;

    } else if ( (this.content[3] === 'o') &&
         (this.content[4] === 'o') &&
         (this.content[5] === 'o') ) {
           this.gameOver = true;
           this.handleGameover('o');
           return;

    } else if ( (this.content[6] === 'o') &&
         (this.content[7] === 'o') &&
         (this.content[8] === 'o') ) {
           this.gameOver = true;
           this.handleGameover('o');
           return;

    } else if ( (this.content[0] === 'o') &&
         (this.content[3] === 'o') &&
         (this.content[6] === 'o') ) {
           this.gameOver = true;
           this.handleGameover('o');
           return;

    } else if ( (this.content[1] === 'o') &&
         (this.content[4] === 'o') &&
         (this.content[7] === 'o') ) {
           this.gameOver = true;
           this.handleGameover('o');
           return;

    } else if ( (this.content[2] === 'o') &&
         (this.content[5] === 'o') &&
         (this.content[8] === 'o') ) {
           this.gameOver = true;
           this.handleGameover('o');
           return;

    } else if ( (this.content[0] === 'o') &&
         (this.content[4] === 'o') &&
         (this.content[8] === 'o') ) {
           this.gameOver = true;
           this.handleGameover('o');
           return;

    } else if ( (this.content[2] === 'o') &&
         (this.content[4] === 'o') &&
         (this.content[6] === 'o') ) {
           this.gameOver = true;
           this.handleGameover('o');
           return;

    }

    if (this.turnCount === 9 && !this.gameOver) {
      this.handleGameover('tie');
      this.gameOver = true;
      return;
    }
  }

  private handleGameover(winner): void {

    // If x or o passed in, alert players of winner, else, alert of tie game.
    if (winner !== 'tie') {
      setTimeout(() => {
        console.log(`game over! ${winner} won`);
      }, 700);
    } else {
      setTimeout(() => {
        console.log(`game over! Tie game`);
      }, 700);
    }

    // Game is over, wipe board.
    setTimeout(() => {
      this.clearBoard();
    }, 1500);

  }

  // Apply styles to tiles when hovered over, depending on if they are enabled or disabled.
  private hover(index): void {

    // If button hasn't been clicked yet, apply styles.
    if (!this.tilesDisabled[index]) {
      this.tiles[index].style = `
        background: #90ee90;
        transition: background 400ms ease-in
      `;
    } else if (this.tilesDisabled[index]) {    // Else, apply different styles.
      this.tiles[index].style = `
        background: #f00;
        transition: background 400ms ease-in;
      `;
    }
  }

  // Remove styles added on hover when user moves mouse out of tile area.
  private removeHover(index): void {
    // If button hasn't been clicked yet, apply styles.
    if (!this.tilesDisabled[index]) {
      this.tiles[index].style = `
        background: #87ceeb;
        transition: background 300ms ease-out;
      `;
    } else if (this.tilesDisabled[index]) {    // Else, apply different styles.
      this.tiles[index].style = `
        background: #87ceeb;
        transition: background 300ms ease-out;
      `;
    }
  }

  private clearBoard(): void {

    // Set an '' to for each possible tile. This will avoid sparse arrays later.
    for (let i = 0; i < 9; i += 1) {
      this.content[i] = '';
    }

    // Game is over, loop through array and reset each button to be enabled.
    this.tilesDisabled.forEach((item, index) => {
      this.tilesDisabled[index] = false;
    });

    // Game is over, loop through each of our tiles and clear the drawing of X/O.
    this.ctx.forEach((item, index) => {
      item.clearRect(0, 0, 100, 100);
    });

    // Loop though each tile and remove the styles to return the opacity to 1.
    this.tiles.forEach((item) => {
      item.classList.remove('fade-out-tile');
    });

    // Set values back to defaults, removing this break the ability to play a new game after a win or tie.
    this.gameOver = false;
    this.turnCount = 0;

  }

  private manualReset(): void {
    const resetBtn = document.querySelector('.reload');
    resetBtn.addEventListener('click', () => {

      // Confirm the user actually wants to clear game and reset state.
      const clear: string = prompt('Are you sure you want to clear games ?' +
                            'This will clear the board and the score' +
                            'Enter y to continue, anything else to abort');
      if (clear.toLowerCase() === 'y') {
        // Player confirmed, clear the game score and board.
        this.clearBoard();
      }
    });
  }

}

const appInstance = new App();
appInstance.init();
