interface Element {
  animate;
}

class App {
  private compTurnAnimation;
  private content: string[] = [];
  private ctx: any[] = [];
  private gameOver: boolean = false;
  private numOfPlayers: number;
  private oScore: number = 0;
  private playerChoice: string;
  private tiles: any[] = [];
  private tilesDisabled: boolean[] = [];
  private turnCount: number = 0;
  private winner: string;
  private xScore: number = 0;
  private map: number[] =
  [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
  ];

  // Set the game up to be played on initialization.
  public init(): void {
    this.cacheTiles();
    this.cacheCtx();
    this.manualReset();
    this.updateScore();

    // Prevent sparse arrays from being created.
    for (let i = 0; i < this.tiles.length; i += 1) {
      this.content[i] = '';
    }

    // Let the player select one player or two, set variable and then animate the overlay away, eventually removing it from document.
    const overlay = document.querySelector('.one-player-or-two');
    const onePlayer = document.querySelector('.one');

    // Manage click for one player selection.
    onePlayer.addEventListener('click', () => {
      this.numOfPlayers = 1;
      overlay.classList.add('hide-overlay');
      setTimeout(() => {
        overlay.classList.add('remove-overlay');
        overlay.classList.remove('hide-overlay');
      }, 650);
    });

    // Manage click for two player selection.
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

    // Player chose to play as X, set the player up to play as X.
    xChoice.addEventListener('click', () => {
      this.playerChoice = 'x';
      this.hideOMsg();
      this.showXMsg();
      xOroOverlay.classList.add('hide-overlay');
      setTimeout(() => {
        xOroOverlay.classList.add('remove-overlay');
      }, 650);
    });

    // Player chose to play as O, set the player up to play as O.
    const oChoice: Element = document.querySelector('.o');
    oChoice.addEventListener('click', () => {
      this.playerChoice = 'o';
      this.hideXMsg();
      this.showOMsg();
      xOroOverlay.classList.add('hide-overlay');
      setTimeout(() => {
        xOroOverlay.classList.add('remove-overlay');
      }, 650);
    });
  }

  // Will run when user clicks a tile.
  public draw(index): void {

    // Check if game is out of possible turns or gameOver has been set to false.
    if (this.turnCount > 9 || this.gameOver) {
      return;
    }

    const tile = this.tiles[index];

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
      } else if (this.playerChoice === 'o') {
        this.drawO(index);
      }

      // After player chooses a tile, check to see if it's a winning pattern.
      this.checkWin();

      // If there is still an open tile available and the game isn't over
      if (this.turnCount < 9 && !this.gameOver) {

        // If single player game was selected, let the computer play. Else, switch to 2nd player.
        if (this.numOfPlayers === 1) {
          this.computerTurn();
        } else if (this.numOfPlayers > 1) {
          this.playerChoice = this.playerChoice === 'x'
            ? 'o'
            : 'x';
        }
      } else {
        return;
      }
    }
  }

  // Animate the tile when selected by a user or AI.
  private animateTile(index): void {
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
    ],
      {
        direction: 'alternate',
        duration: 1000,
        easing: 'ease-in-out',
        iterations: 1,
      },
    );
  }

  // Draw 'X' symbol on a tile.
  private drawX(index): void {
    this.turnCount++;
    this.content[index] = 'x';
    this.tilesDisabled[index] = true;
    const timeout = this.playerChoice === 'x'
      ? 300
      : 1200;
    setTimeout(() => {
      this.ctx[index].strokeStyle = 'white';
      this.ctx[index].lineCap = 'round';
      this.ctx[index].lineWidth = 5;
      this.ctx[index].beginPath();
      this.ctx[index].moveTo(20, 20);
      this.ctx[index].lineTo(80, 80);
      this.ctx[index].moveTo(80, 20);
      this.ctx[index].lineTo(20, 80);
      this.ctx[index].stroke();
      this.ctx[index].closePath();
      this.hideXMsg();
      this.showOMsg();
    }, timeout);
  }

  // Draw 'O' symbol on a tile.
  private drawO(index): void {

    // Set a delay, if drawO is called by computer, we want a delay, to make the user think the AI is 'thinking'.
    // If it isn't, we want to delay the drawing but not the animation.
    const animateDelay = this.playerChoice === 'x'
      ? 1200
      : 0;
    const drawDelay = this.playerChoice === 'x'
      ? 1400
      : 300;
    this.turnCount++;
    this.tilesDisabled[index] = true;
    this.content[index] = 'o';

    // Fade out the tile.
    setTimeout(() => {
      this.tiles[index].classList.add('fade-out-tile');
    }, animateDelay);

    // Draw 'O' onto tile.
    setTimeout(() => {
      this.ctx[index].strokeStyle = 'black';
      this.ctx[index].beginPath();
      this.ctx[index].lineWidth = 5;
      this.ctx[index].arc(50, 50, 34, 0, Math.PI * 2, false);
      this.ctx[index].stroke();
      this.ctx[index].closePath();
      this.hideOMsg();
      this.showXMsg();
    }, drawDelay);
  }

  // Store all the tiles html elements in an array for access later.
  private cacheTiles(): void {
    for (let i = 0; i < 9; i += 1) {
      this.tiles[i] = document.querySelector(`.canvas${i}`);
      this.tilesDisabled[i] = false;

    }
  }

  // In charge of running the tile animation with a delay to look similar to when a user clicks.
  private handleComputerAnimation(index, delay): void {
    this.compTurnAnimation = setTimeout(() => {
      this.animateTile(index);
      this.tiles[index].classList.add('fade-out-tile');
    }, delay);
  }

  // Cache canvas context for each tile for use later.
  private cacheCtx(): void {
    for (let i = 0; i < 9; i += 1) {
      this.ctx[i] = this.tiles[i].getContext('2d');
    }
  }

  /*
     Will be called whenever the computer needs to pick a tile to draw on.
      This will never be called if user selects a 2 player game.
      It checks to see that a tile is still enabled, animates the tile, draws,
      the correct symbol and calls checkWin to see if it's a winning pattern.
      If random num generated for tile selection is taken, it will call itself
      and keep trying until it is found.
   */
  private computerTurn(): void {
    let rand = Math.floor(Math.random() * 9);
    const compChoice = this.playerChoice === 'x'
      ? 'o'
      : 'x';

    // If computer can win game, priortize winning over blocking move.
    // Check top row for win.
    if (this.content[0] === compChoice &&
        this.content[1] === compChoice &&
        !this.tilesDisabled[2]) {
          rand = 2;
    } else if (this.content[1] === compChoice &&
               this.content[2] === compChoice &&
               !this.tilesDisabled[0]) {
          rand = 0;
    } else if (this.content[0] === compChoice &&
               this.content[2] === compChoice &&
               this.tilesDisabled[1]) {
          rand = 1;

    // Check middle row for win.
    } else if (this.content[3] === compChoice &&
               this.content[4] === compChoice &&
               !this.tilesDisabled[5]) {
          rand = 5;
    } else if (this.content[3] === compChoice &&
               this.content[5] === compChoice &&
               !this.tilesDisabled[4]) {
          rand = 4;
    } else if (this.content[4] === compChoice &&
               this.content[5] === compChoice &&
               !this.tilesDisabled[3]) {
          rand = 3;

    // Check for win on bottom row.
    } else if (this.content[7] === compChoice &&
             this.content[8] === compChoice &&
             !this.tilesDisabled[6]) {
          rand = 6;
    } else if (this.content[6] === compChoice &&
               this.content[7] === compChoice &&
               !this.tilesDisabled[8]) {
          rand = 8;
    } else if (this.content[6] === compChoice &&
               this.content[8] === compChoice &&
               !this.tilesDisabled[7]) {
          rand = 7;

    // Check left column for win.
    } else if (this.content[0] === compChoice &&
               this.content[3] === compChoice &&
               !this.tilesDisabled[6]) {
          rand = 6;
    } else if (this.content[3] === compChoice &&
               this.content[6] === compChoice &&
               !this.tilesDisabled[0]) {
          rand = 0;
    } else if (this.content[0] === compChoice &&
               this.content[6] === compChoice &&
               !this.tilesDisabled[3]) {
          rand = 3;

    // Check middle column for win.
    } else if (this.content[1] === compChoice &&
               this.content[4] === compChoice &&
               !this.tilesDisabled[7]) {
          rand = 7;
    } else if (this.content[4] === compChoice &&
               this.content[7] === compChoice &&
               !this.tilesDisabled[1]) {
          rand = 1;
    } else if (this.content[1] === compChoice &&
               this.content[7] === compChoice &&
               !this.tilesDisabled[4]) {
          rand = 4;

    // Check right column for win.
    } else if (this.content[2] === compChoice &&
               this.content[5] === compChoice &&
               !this.tilesDisabled[8]) {
          rand = 8;
    } else if (this.content[5] === compChoice &&
               this.content[8] === compChoice &&
               !this.tilesDisabled[3]) {
          rand = 3;
    } else if (this.content[3] === compChoice &&
               this.content[8] === compChoice &&
               !this.tilesDisabled[5]) {
          rand = 5;

    // Check both diagonals for win.
    } else if (this.content[0] === compChoice &&
               this.content[4] === compChoice &&
               !this.tilesDisabled[8]) {
          rand = 8;
    } else if (this.content[4] === compChoice &&
               this.content[8] === compChoice &&
               !this.tilesDisabled[0]) {
          rand = 0;
    } else if (this.content[0] ===  compChoice &&
               this.content[8] === compChoice &&
               !this.tilesDisabled[4]) {
          rand = 4;
    } else if (this.content[2] === compChoice &&
               this.content[4] === compChoice &&
               !this.tilesDisabled[6]) {
          rand = 6;
    } else if (this.content[4] === compChoice &&
               this.content[6] === compChoice &&
               !this.tilesDisabled[2]) {
          rand = 2;
    } else if (this.content[2] === compChoice &&
               this.content[6] === compChoice &&
               !this.tilesDisabled[4]) {
            rand = 4;

    // Prevent winning moves on right row.
    } else if (this.content[0] === this.playerChoice &&
        this.content[1] === this.playerChoice &&
        !this.tilesDisabled[2]) {
          rand = 2;
    } else if (this.content[3] === this.playerChoice &&
               this.content[4] === this.playerChoice &&
               !this.tilesDisabled[5]) {
          rand = 5;
    } else if (this.content[6] === this.playerChoice &&
               this.content[7] === this.playerChoice &&
               !this.tilesDisabled[8]) {
          rand = 8;

    // Prevent winning moves on left row;
    } else if (this.content[1] === this.playerChoice &&
             this.content[2] === this.playerChoice &&
             !this.tilesDisabled[0]) {
          rand = 0;
    } else if (this.content[4] === this.playerChoice &&
             this.content[5] === this.playerChoice &&
             !this.tilesDisabled[3]) {
          rand = 3;
    } else if (this.content[7] === this.playerChoice &&
             this.content[8] === this.playerChoice &&
             !this.tilesDisabled[6]) {
          rand = 6;

  // Prvent winning moves in center row.
    } else if (this.content[0] === this.playerChoice &&
           this.content[2] === this.playerChoice &&
           !this.tilesDisabled[1]) {
          rand = 1;
    } else if (this.content[3] === this.playerChoice &&
           this.content[5] === this.playerChoice &&
           !this.tilesDisabled[4]) {
          rand = 4;
    } else if (this.content[6] === this.playerChoice &&
           this.content[8] === this.playerChoice &&
           !this.tilesDisabled[7]) {
          rand = 7;

    // Prevent winning moves on top row.
    } else if (this.content[3] === this.playerChoice &&
               this.content[6] === this.playerChoice &&
               !this.tilesDisabled[0]) {
          rand = 0;
    } else if (this.content[4] === this.playerChoice &&
              this.content[7] === this.playerChoice &&
              !this.tilesDisabled[1]) {
          rand = 1;
    } else if (this.content[5] === this.playerChoice &&
               this.content[8] === this.playerChoice &&
               !this.tilesDisabled[2]) {
          rand = 2;

    // Prevent winning moves on bottom row.
    } else if (this.content[0] === this.playerChoice &&
               this.content[3] === this.playerChoice &&
               !this.tilesDisabled[6]) {
          rand = 6;
    } else if (this.content[1] === this.playerChoice &&
               this.content[4] === this.playerChoice &&
               !this.tilesDisabled[7]) {
          rand = 7;
    } else if (this.content[2] === this.playerChoice &&
               this.content[5] === this.playerChoice &&
               !this.tilesDisabled[8]) {
          rand = 8;

    // Prevent winning moves on middle row.
    } else if (this.content[0] === this.playerChoice &&
               this.content[6] === this.playerChoice &&
               !this.tilesDisabled[3]) {
          rand = 3;
    } else if (this.content[1] === this.playerChoice &&
               this.content[7] === this.playerChoice &&
               !this.tilesDisabled[4]) {
          rand = 4;
    } else if (this.content[2] === this.playerChoice &&
               this.content[7] === this.playerChoice &&
               !this.tilesDisabled[5]) {
          rand = 5;
    // Prevent winning moves in both diagonal directions.
    } else if (this.content[0] === this.playerChoice &&
               this.content[4] === this.playerChoice &&
               !this.tilesDisabled[8]) {
          rand = 8;
    } else if (this.content[4] === this.playerChoice &&
               this.content[8] === this.playerChoice &&
               !this.tilesDisabled[0]) {
          rand = 0;
    } else if (this.content[0] === this.playerChoice &&
               this.content[8] === this.playerChoice &&
               !this.tilesDisabled[4]) {
          rand = 4;
    } else if (this.content[2] === this.playerChoice &&
               this.content[4] === this.playerChoice &&
               !this.tilesDisabled[6]) {
          rand = 6;
    } else if (this.content[4] === this.playerChoice &&
               this.content[6] === this.playerChoice &&
               !this.tilesDisabled[2]) {
          rand = 2;
    } else if (this.content[2] === this.playerChoice &&
               this.content[6] === this.playerChoice &&
               !this.tilesDisabled[4]) {
          rand = 4;
    }

    // Computer has picked a tile based on logic above, now executes turn.
    if (rand === 0 && !this.tilesDisabled[0]) {
      if (this.playerChoice === 'x') {
        this.handleComputerAnimation(0, 1000);
        this.drawO(0);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      } else {
        this.handleComputerAnimation(0, 1000);
        this.drawX(0);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      }
    } else if (rand === 1 && !this.tilesDisabled[1]) {
      if (this.playerChoice === 'x') {
        this.handleComputerAnimation(1, 1000);
        this.drawO(1);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      } else {
        this.handleComputerAnimation(1, 1000);
        this.drawX(1);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      }
    } else if (rand === 2 && !this.tilesDisabled[2]) {
      if (this.playerChoice === 'x') {
        this.handleComputerAnimation(2, 1000);
        this.drawO(2);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      } else {
        this.handleComputerAnimation(2, 1000);
        this.drawX(2);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      }
    } else if (rand === 3 && !this.tilesDisabled[3]) {
      if (this.playerChoice === 'x') {
        this.handleComputerAnimation(3, 1000);
        this.drawO(3);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      } else {
        this.handleComputerAnimation(3, 1000);
        this.drawX(3);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      }
    } else if (rand === 4 && !this.tilesDisabled[4]) {
      if (this.playerChoice === 'x') {
        this.handleComputerAnimation(4, 1000);
        this.drawO(4);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      } else {
        this.handleComputerAnimation(4, 1000);
        this.drawX(4);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      }
    } else if (rand === 5 && !this.tilesDisabled[5]) {
      if (this.playerChoice === 'x') {
        this.handleComputerAnimation(5, 1000);
        this.drawO(5);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      } else {
        this.handleComputerAnimation(5, 1000);
        this.drawX(5);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      }
    } else if (rand === 6 && !this.tilesDisabled[6]) {
      if (this.playerChoice === 'x') {
        this.handleComputerAnimation(6, 1000);
        this.drawO(6);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      } else {
        this.handleComputerAnimation(6, 1000);
        this.drawX(6);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      }
    } else if (rand === 7 && !this.tilesDisabled[7]) {
      if (this.playerChoice === 'x') {
        this.handleComputerAnimation(7, 1000);
        this.drawO(7);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      } else {
        this.handleComputerAnimation(7, 1000);
        this.drawX(7);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      }
    } else if (rand === 8 && !this.tilesDisabled[8]) {
      if (this.playerChoice === 'x') {
        this.handleComputerAnimation(8, 1000);
        this.drawO(8);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      } else {
        this.handleComputerAnimation(8, 1000);
        this.drawX(8);
        setTimeout(() => {
          this.checkWin();
        }, 1000);
      }
    } else {
      this.computerTurn();
    }
  }

   /*
     Check for winning patterns. If winning pattern is currently on board,
     gameOver is now true and call handleGameover to create a new Game.
  */
  private checkWin(): void {

    if ( (this.content[0] === 'x') &&
         (this.content[1] === 'x') &&
         (this.content[2] === 'x') ) {
           this.gameOver = true;
           this.handleGameover('x');

    } else if ( (this.content[3] === 'x') &&
                (this.content[4] === 'x') &&
                (this.content[5] === 'x') ) {
                  this.gameOver = true;
                  this.handleGameover('x');

    } else if ( (this.content[6] === 'x') &&
                (this.content[7] === 'x') &&
                (this.content[8] === 'x') ) {
                  this.gameOver = true;
                  this.handleGameover('x');

    } else if ( (this.content[0] === 'x') &&
                (this.content[3] === 'x') &&
                (this.content[6] === 'x') ) {
                  this.gameOver = true;
                  this.handleGameover('x');

    } else if ( (this.content[1] === 'x') &&
                (this.content[4] === 'x') &&
                (this.content[7] === 'x') ) {
                  this.gameOver = true;
                  this.handleGameover('x');

    } else if ( (this.content[2] === 'x') &&
                (this.content[5] === 'x') &&
                (this.content[8] === 'x') ) {
                  this.gameOver = true;
                  this.handleGameover('x');

    } else if ( (this.content[0] === 'x') &&
                (this.content[4] === 'x') &&
                (this.content[8] === 'x') ) {
                  this.gameOver = true;
                  this.handleGameover('x');

    } else if ( (this.content[2] === 'x') &&
                (this.content[4] === 'x') &&
                (this.content[6] === 'x') ) {
                  this.gameOver = true;
                  this.handleGameover('x');

    } else if ( (this.content[0] === 'o') &&
                (this.content[1] === 'o') &&
                (this.content[2] === 'o') ) {
                  this.gameOver = true;
                  this.handleGameover('o');

    } else if ( (this.content[3] === 'o') &&
                (this.content[4] === 'o') &&
                (this.content[5] === 'o') ) {
                  this.gameOver = true;
                  this.handleGameover('o');

    } else if ( (this.content[6] === 'o') &&
                (this.content[7] === 'o') &&
                (this.content[8] === 'o') ) {
                  this.gameOver = true;
                  this.handleGameover('o');

    } else if ( (this.content[0] === 'o') &&
                (this.content[3] === 'o') &&
                (this.content[6] === 'o') ) {
                  this.gameOver = true;
                  this.handleGameover('o');

    } else if ( (this.content[1] === 'o') &&
                (this.content[4] === 'o') &&
                (this.content[7] === 'o') ) {
                  this.gameOver = true;
                  this.handleGameover('o');

    } else if ( (this.content[2] === 'o') &&
                (this.content[5] === 'o') &&
                (this.content[8] === 'o') ) {
                  this.gameOver = true;
                  this.handleGameover('o');

    } else if ( (this.content[0] === 'o') &&
                (this.content[4] === 'o') &&
                (this.content[8] === 'o') ) {
                  this.gameOver = true;
                  this.handleGameover('o');

    } else if ( (this.content[2] === 'o') &&
                (this.content[4] === 'o') &&
                (this.content[6] === 'o') ) {
                  this.gameOver = true;
                  this.handleGameover('o');
    }

    if (this.turnCount >= 9 && !this.gameOver) {
      this.gameOver = true;
      this.handleGameover('tie');
    }
  }

  // Reset html of scoreboard to reflect values of xScore/oScore.
  private updateScore(): void {
    // Set the X scoreboard.
    const xScoreboard: Element = document.querySelector('.span-x-score');
    xScoreboard.innerHTML = String(this.xScore);

    // Set the O scoreboard.
    const oScoreboard: Element = document.querySelector('.span-o-score');
    oScoreboard.innerHTML = String(this.oScore);

  }

  // Called whenever game is out of enabled tiles or winning pattern is found.
  private handleGameover(winner): void {
     // Update the winner of the game.'
    if (winner === 'x' && winner !== 'tie') {
      this.winner = 'x';
    } else if (winner === 'o') {
      this.winner = 'o';
    } else {
      this.winner = '';
    }

    // If x or o passed in, alert players of winner, else, alert of tie game.
    if (winner !== 'tie') {
      setTimeout(() => {
        const msg = document.createElement('div');
        msg.classList.add('game-over-msg');
        msg.innerHTML = `<span>${this.winner} won</span>`;
        document.body.appendChild(msg);
        msg.animate(
          [
            {
              opacity: 0,
              transform: 'translateX(200px)',
            },
            {
              opacity: 1,
              transform: 'translateX(-20px)',
            },
            {
              opacity: 1,
              transform: 'translateX(0px)',
            },
          ],
          {
            direction: 'alternate',
            duration: 1300,
            easing: 'ease-in-out',
            iterations: 1,
          },
        );

        // Remove the message from game board.
        setTimeout(() => {
          document.body.removeChild(msg);
        }, 3000);
      }, 1200);
    } else {
      setTimeout(() => {
        const msg = document.createElement('div');
        msg.classList.add('game-over-msg');
        msg.innerHTML = `<span>Tie Game</span>`;
        document.body.appendChild(msg);
        msg.animate(
          [
            {
              opacity: 0,
              transform: 'translateX(200px)',
            },
            {
              opacity: 1,
              transform: 'translateX(-20px)',
            },
            {
              opacity: 1,
              transform: 'translateX(0px)',
            },
          ],
          {
            direction: 'alternate',
            duration: 1300,
            easing: 'ease-in-out',
            iterations: 1,
          },
        );

        // Remove the message from game board.
        setTimeout(() => {
          document.body.removeChild(msg);
        }, 3000);
      }, 1200);
    }

    // Update the scoreboard.
    if (this.winner === 'x') {
      this.xScore += 1;
    } else if (this.winner === 'o') {
      this.oScore += 1;
    }

    // Append score to scoreboard.
    setTimeout(() => {
      this.updateScore();
    }, 1500);

    // Game is over, wipe board.q
    setTimeout(() => {
      if (this.winner === 'x') {
        this.hideOMsg();
        this.showXMsg();
      } else {
        this.hideXMsg();
        this.showOMsg();
      }
      this.clearBoard();
    }, 2100);

    // If user won, do nothing for now.
    // If computer won, make it go first for next game.
    if (this.winner !== this.playerChoice && this.numOfPlayers === 1) {
      setTimeout(() => {
        this.computerTurn();
      }, 2500);
    }

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

  // Animate the 'player x turn' down behind the game board.
  private hideXMsg(): void {
    const xMsg = document.querySelector('.x-turn');
    xMsg.animate(
      [
        {
         transform: 'translateY(0px)',
        },
        {
         transform: 'translateY(50px)',
        },
      ],
      {
       direction: 'normal',
       duration: 800,
       easing: 'ease-in-out',
       fill: 'forwards',
       iterations: 1,
      },
     );
  }

  // Animate the 'player x turn' up above game board.
  private showXMsg(): void {
    const xMsg = document.querySelector('.x-turn');
    xMsg.animate(
      [
       { transform: 'translateY(50px)' },
       { transform: 'translateY(0px)' },
      ],
      {
       direction: 'normal',
       duration: 800,
       easing: 'ease-in-out',
       fill: 'forwards',
       iterations: 1,
      },
     );
  }

  // Animate the 'player o turn' banner behind the game board.
  private hideOMsg(): void {
    const oMsg: Element = document.querySelector('.o-turn');
    oMsg.animate(
      [
        {
          transform: 'translateY(0px)',
        },
        {
          transform: 'translateY(50px)',
        },
      ],
      {
        direction: 'normal',
        duration: 800,
        easing: 'ease-in-out',
        fill: 'forwards',
        iterations: 1,
      },
    );
  }

  // Animate the 'player o turn' above game board.
  private showOMsg(): void {
    const oMsg: Element = document.querySelector('.o-turn');
    oMsg.animate(
      [
        {
          transform: 'translateY(50px)',
        },
        {
          transform: 'translateY(0px)',
        },
      ],
      {
        direction: 'normal',
        duration: 800,
        easing: 'ease-in-out',
        fill: 'forwards',
        iterations: 1,
      },
    );
  }

  // When game is over or reset button is pressed, reset values and wipe board.
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

    // Remove winner.
    this.winner = '';

  }

  // Reset game board, score, all variables assoicated with game.
  // This will only be used when player hits reset button.
  private manualReset(): void {
    const resetBtn = document.querySelector('.reload');
    resetBtn.addEventListener('click', () => {

      // Confirm the user actually wants to clear game and reset state.
      const clear: string = prompt(`
                            Are you sure you want to clear games ?
                            This will clear the board and the score.
                            Enter y to continue, anything else to abort
                          `);
      if (clear.toLowerCase() === 'y') {
        // Player confirmed, clear the game score and board.
        this.clearBoard();

        // Reset scores.
        this.xScore = 0;
        this.oScore = 0;
        this.updateScore();
      }
    });
  }
}

const appInstance = new App();
appInstance.init();
