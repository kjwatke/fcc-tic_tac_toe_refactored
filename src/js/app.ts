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

      if (this.gameOver) {
        setTimeout(() => {
          alert('game over');
        }, 2000);
      }

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

    if (this.gameOver) {
      setTimeout(() => {
        alert('game over');
      }, 2000);
    }
  }

  private checkWin(): string {

    // X wins top row with tiles 0, 1, 2.
    if ( (this.content[0] === 'x') &&
         (this.content[1] === 'x') &&
         (this.content[2] === 'x') ) {
           console.log('x wins with top row');
           this.gameOver = true;
    }

    // X wins middle row with tiles 3, 4, 5.
    if ( (this.content[3] === 'x') &&
         (this.content[4] === 'x') &&
         (this.content[5] === 'x') ) {
           console.log('x wins with middle row');
           this.gameOver = true;
    }

    // X wins bottom row with tiles 6, 7, 8.
    if ( (this.content[6] === 'x') &&
         (this.content[7] === 'x') &&
         (this.content[8] === 'x') ) {
           console.log('x wins with bottom row');
           this.gameOver = true;
    }

    // X wins with left column, tiles 0, 3, 6.
    if ( (this.content[0] === 'x') &&
         (this.content[3] === 'x') &&
         (this.content[6] === 'x') ) {
           console.log('x wins with left column');
           this.gameOver = true;
    }

    // X wins with middle column, tiles 1, 4, 7.
    if ( (this.content[1] === 'x') &&
         (this.content[4] === 'x') &&
         (this.content[7] === 'x') ) {
           console.log('x wins with middle column');
           this.gameOver = true;
    }

    // X wins right column, tiles 2, 5, 8.
    if ( (this.content[2] === 'x') &&
         (this.content[5] === 'x') &&
         (this.content[8] === 'x') ) {
           console.log('x wins with bottom row');
           this.gameOver = true;
    }

    // X wins diagonal going from left to right, tiles 0, 4, 8.
    if ( (this.content[0] === 'x') &&
         (this.content[4] === 'x') &&
         (this.content[8] === 'x') ) {
           console.log('x wins diagonal going from left to right');
           this.gameOver = true;
    }

    // X wins diagonal going from right to left, tiles 2, 4, 6;
    if ( (this.content[2] === 'x') &&
         (this.content[4] === 'x') &&
         (this.content[6] === 'x') ) {
           console.log('x wins with bottom row');
           this.gameOver = true;
    }

    // Handle o winning.
        // X wins top row with tiles 0, 1, 2.
    if ( (this.content[0] === 'o') &&
         (this.content[1] === 'o') &&
         (this.content[2] === 'o') ) {
           console.log('o wins with top row');
           this.gameOver = true;
    }

    // o wins middle row with tiles 3, 4, 5.
    if ( (this.content[3] === 'o') &&
         (this.content[4] === 'o') &&
         (this.content[5] === 'o') ) {
           console.log('o wins with middle row');
           this.gameOver = true;
    }

    // o wins bottom row with tiles 6, 7, 8.
    if ( (this.content[6] === 'o') &&
         (this.content[7] === 'o') &&
         (this.content[8] === 'o') ) {
           console.log('o wins with bottom row');
           this.gameOver = true;
    }

    // o wins with left column, tiles 0, 3, 6.
    if ( (this.content[0] === 'o') &&
         (this.content[3] === 'o') &&
         (this.content[6] === 'o') ) {
           console.log('o wins with left column');
           this.gameOver = true;
    }

    // o wins with middle column, tiles 1, 4, 7.
    if ( (this.content[1] === 'o') &&
         (this.content[4] === 'o') &&
         (this.content[7] === 'o') ) {
           console.log('o wins with middle column');
           this.gameOver = true;
    }

    // o wins right column, tiles 2, 5, 8.
    if ( (this.content[2] === 'o') &&
         (this.content[5] === 'o') &&
         (this.content[8] === 'o') ) {
           console.log('o wins with bottom row');
           this.gameOver = true;
    }

    // o wins diagonal going from left to right, tiles 0, 4, 8.
    if ( (this.content[0] === 'o') &&
         (this.content[4] === 'o') &&
         (this.content[8] === 'o') ) {
           console.log('o wins diagonal going from left to right');
           this.gameOver = true;
    }

    // o wins diagonal going from right to left, tiles 2, 4, 6;
    if ( (this.content[2] === 'o') &&
         (this.content[4] === 'o') &&
         (this.content[6] === 'o') ) {
           console.log('o wins with bottom row');
           this.gameOver = true;
    }

    

    return 'x wins';
  }

}

const appInstance = new App();
appInstance.init();
