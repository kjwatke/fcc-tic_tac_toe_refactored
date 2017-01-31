class App {
  private tiles: any[] = [];
  private tilesDisabled: boolean[] = [];
  private ctx: any[] = [];
  private gameOver: boolean = false;
  private content: string[] = [];
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
      this.content[index] = 'x';
      this.tiles[index].style =
        'transform: rotateY(180deg); transition: transform 500ms ease-in';

      // Draw an X.
      setTimeout(() => {
        this.ctx[index].lineCap = 'round';
        this.ctx[index].lineWidth = 3;
        this.ctx[index].beginPath();
        this.ctx[index].moveTo(20, 20);
        this.ctx[index].lineTo(80, 80);
        this.ctx[index].moveTo(80, 20);
        this.ctx[index].lineTo(20, 80);
        this.ctx[index].stroke();
        this.ctx[index].closePath();
      }, 300);

      this.checkWin();

      if (this.turnCount < 9 && !this.gameOver) {
        this.computerTurn();
      } else {
        return;
      }
    }
  }

  private cacheTiles(): void {
    for (let i = 0; i < 9; i += 1) {
      this.tiles[i] = document.querySelector(`.canvas${i}`);
      this.tilesDisabled[i] = false;

    }
  }

  private cacheCtx(): void {
    for (let i = 0; i < 9; i += 1) {
      this.ctx[i] = this.tiles[i].getContext('2d');
    }
  }

  private computerTurn(): void {
    const rand = Math.floor(Math.random() * 9);

    if (rand === 0 && !this.tilesDisabled[0]) {
      this.drawOSteps(0);
    } else if (rand === 1 && !this.tilesDisabled[1]) {
      this.drawOSteps(1);
    } else if (rand === 2 && !this.tilesDisabled[2]) {
      this.drawOSteps(2);
    } else if (rand === 3 && !this.tilesDisabled[3]) {
      this.drawOSteps(3);
    } else if (rand === 4 && !this.tilesDisabled[4]) {
      this.drawOSteps(4);
    } else if (rand === 5 && !this.tilesDisabled[5]) {
      this.drawOSteps(5);
    } else if (rand === 6 && !this.tilesDisabled[6]) {
      this.drawOSteps(6);
    } else if (rand === 7 && !this.tilesDisabled[7]) {
      this.drawOSteps(7);
    } else if (rand === 8 && !this.tilesDisabled[8]) {
      this.drawOSteps(8);
    } else {
      this.computerTurn();
    }
  }

  private drawOSteps(index) {
    this.turnCount++;
    this.tilesDisabled[index] = true;
    this.content[index] = 'o';
    setTimeout(() => {
      this.tiles[index].classList.add('fade-out-tile');
      this.tiles[index].style =
      'transform: rotateY(180deg); transition: transform 500ms ease-out';
    }, 1000);

    setTimeout(() => {
      this.ctx[index].beginPath();
      this.ctx[index].lineWidth = 3;
      this.ctx[index].arc(50, 50, 34, 0, Math.PI * 2, false);
      this.ctx[index].stroke();
      this.ctx[index].closePath();
    }, 1200);

    this.checkWin();

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
      console.log(`game over! ${winner} won`);
    } else {
      console.log('game over! tie game!');
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
    for (let i = 0; i < 9; i += 1) {
      this.content[i] = '';
    }

    this.tilesDisabled.forEach((item, index) => {
      this.tilesDisabled[index] = false;
    });

    this.ctx.forEach((item, index) => {
      item.clearRect(0, 0, 100, 100);
    });

    this.tiles.forEach((item) => {
      item.classList.remove('fade-out-tile');
    });

    this.gameOver = false;
    this.turnCount = 0;

  }

  private manualReset(): void {
    const resetBtn = document.querySelector('.reload');
    resetBtn.addEventListener('click', () => {
      this.clearBoard();
    });
  }

}

const appInstance = new App();
appInstance.init();
