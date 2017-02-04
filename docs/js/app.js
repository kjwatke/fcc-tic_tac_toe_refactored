var App=function(){function t(){this.content=[],this.ctx=[],this.gameOver=!1,this.oScore=0,this.tiles=[],this.tilesDisabled=[],this.turnCount=0,this.xScore=0,this.map=[0,0,0,0,0,0,0,0,0]}return t.prototype.init=function(){var t=this;this.cacheTiles(),this.cacheCtx(),this.manualReset(),this.updateScore();for(var e=0;e<this.tiles.length;e+=1)this.content[e]="";var i=document.querySelector(".one-player-or-two"),n=document.querySelector(".one");n.addEventListener("click",function(){t.numOfPlayers=1,i.classList.add("hide-overlay"),setTimeout(function(){i.classList.add("remove-overlay"),i.classList.remove("hide-overlay")},650)});var o=document.querySelector(".two");o.addEventListener("click",function(){t.numOfPlayers=2,i.classList.add("hide-overlay"),setTimeout(function(){i.classList.add("remove-overlay"),i.classList.remove("hide-overlay")},650)});var s=document.querySelector(".choose-symbol"),a=document.querySelector(".x");a.addEventListener("click",function(){t.playerChoice="x",t.toggleX(),s.classList.add("hide-overlay"),setTimeout(function(){s.classList.add("remove-overlay")},650)});var h=document.querySelector(".o");h.addEventListener("click",function(){t.playerChoice="o",t.toggleO(),s.classList.add("hide-overlay"),setTimeout(function(){s.classList.add("remove-overlay")},650)})},t.prototype.draw=function(t){if(!(this.turnCount>9||this.gameOver)){var e=this.tiles[t];if(!this.tilesDisabled[t]){if(this.tilesDisabled[t]=!0,e.classList.add("fade-out-tile"),this.animateTile(t),"x"===this.playerChoice?this.drawX(t):"o"===this.playerChoice&&this.drawO(t),this.checkWin(),!(this.turnCount<9)||this.gameOver)return;1===this.numOfPlayers?this.computerTurn():this.numOfPlayers>1&&(this.playerChoice="x"===this.playerChoice?"o":"x")}}},t.prototype.animateTile=function(t){this.tiles[t].animate([{height:"100px",transform:" rotateX(0deg) rotateY(0deg)",width:"100px"},{height:"50px",transform:" rotateX(180deg) rotateY(180deg)",width:"50px"},{height:"100px",transform:"rotateX(180deg) rotateY(180deg)",width:"100px"}],{direction:"alternate",duration:1e3,easing:"ease-in-out",iterations:1})},t.prototype.drawX=function(t){var e=this;this.turnCount++,this.content[t]="x",this.tilesDisabled[t]=!0;var i="x"===this.playerChoice?300:1200;setTimeout(function(){e.ctx[t].strokeStyle="white",e.ctx[t].lineCap="round",e.ctx[t].lineWidth=5,e.ctx[t].beginPath(),e.ctx[t].moveTo(20,20),e.ctx[t].lineTo(80,80),e.ctx[t].moveTo(80,20),e.ctx[t].lineTo(20,80),e.ctx[t].stroke(),e.ctx[t].closePath(),e.hideXMsg(),e.showOMsg()},i)},t.prototype.drawO=function(t){var e=this,i="x"===this.playerChoice?1200:0,n="x"===this.playerChoice?1400:300;this.turnCount++,this.tilesDisabled[t]=!0,this.content[t]="o",setTimeout(function(){e.tiles[t].classList.add("fade-out-tile")},i),setTimeout(function(){e.ctx[t].strokeStyle="black",e.ctx[t].beginPath(),e.ctx[t].lineWidth=5,e.ctx[t].arc(50,50,34,0,2*Math.PI,!1),e.ctx[t].stroke(),e.ctx[t].closePath(),e.hideOMsg(),e.showXMsg()},n)},t.prototype.cacheTiles=function(){for(var t=0;t<9;t+=1)this.tiles[t]=document.querySelector(".canvas"+t),this.tilesDisabled[t]=!1},t.prototype.handleComputerAnimation=function(t,e){var i=this;this.compTurnAnimation=setTimeout(function(){i.animateTile(t),i.tiles[t].classList.add("fade-out-tile")},e)},t.prototype.cacheCtx=function(){for(var t=0;t<9;t+=1)this.ctx[t]=this.tiles[t].getContext("2d")},t.prototype.computerTurn=function(){var t=Math.floor(9*Math.random());0!==t||this.tilesDisabled[0]?1!==t||this.tilesDisabled[1]?2!==t||this.tilesDisabled[2]?3!==t||this.tilesDisabled[3]?4!==t||this.tilesDisabled[4]?5!==t||this.tilesDisabled[5]?6!==t||this.tilesDisabled[6]?7!==t||this.tilesDisabled[7]?8!==t||this.tilesDisabled[8]?this.computerTurn():"x"===this.playerChoice?(this.handleComputerAnimation(8,1e3),this.drawO(8),this.checkWin()):(this.handleComputerAnimation(8,1e3),this.drawX(8),this.checkWin()):"x"===this.playerChoice?(this.handleComputerAnimation(7,1e3),this.drawO(7),this.checkWin()):(this.handleComputerAnimation(7,1e3),this.drawX(7),this.checkWin()):"x"===this.playerChoice?(this.handleComputerAnimation(6,1e3),this.drawO(6),this.checkWin()):(this.handleComputerAnimation(6,1e3),this.drawX(6),this.checkWin()):"x"===this.playerChoice?(this.handleComputerAnimation(5,1e3),this.drawO(5),this.checkWin()):(this.handleComputerAnimation(5,1e3),this.drawX(5),this.checkWin()):"x"===this.playerChoice?(this.handleComputerAnimation(4,1e3),this.drawO(4),this.checkWin()):(this.handleComputerAnimation(4,1e3),this.drawX(4)):"x"===this.playerChoice?(this.handleComputerAnimation(3,1e3),this.drawO(3),this.checkWin()):(this.handleComputerAnimation(3,1e3),this.drawX(3),this.checkWin()):"x"===this.playerChoice?(this.handleComputerAnimation(2,1e3),this.drawO(2),this.checkWin()):(this.handleComputerAnimation(2,1e3),this.drawX(2),this.checkWin()):"x"===this.playerChoice?(this.handleComputerAnimation(1,1e3),this.drawO(1),this.checkWin()):(this.handleComputerAnimation(1,1e3),this.drawX(1),this.checkWin()):"x"===this.playerChoice?(this.handleComputerAnimation(0,1e3),this.drawO(0),this.checkWin()):(this.handleComputerAnimation(0,1e3),this.drawX(0),this.checkWin())},t.prototype.checkWin=function(){"x"===this.content[0]&&"x"===this.content[1]&&"x"===this.content[2]?(this.gameOver=!0,this.handleGameover("x")):"x"===this.content[3]&&"x"===this.content[4]&&"x"===this.content[5]?(this.gameOver=!0,this.handleGameover("x")):"x"===this.content[6]&&"x"===this.content[7]&&"x"===this.content[8]?(this.gameOver=!0,this.handleGameover("x")):"x"===this.content[0]&&"x"===this.content[3]&&"x"===this.content[6]?(this.gameOver=!0,this.handleGameover("x")):"x"===this.content[1]&&"x"===this.content[4]&&"x"===this.content[7]?(this.gameOver=!0,this.handleGameover("x")):"x"===this.content[2]&&"x"===this.content[5]&&"x"===this.content[8]?(this.gameOver=!0,this.handleGameover("x")):"x"===this.content[0]&&"x"===this.content[4]&&"x"===this.content[8]?(this.gameOver=!0,this.handleGameover("x")):"x"===this.content[2]&&"x"===this.content[4]&&"x"===this.content[6]?(this.gameOver=!0,this.handleGameover("x")):"o"===this.content[0]&&"o"===this.content[1]&&"o"===this.content[2]?(this.gameOver=!0,this.handleGameover("o")):"o"===this.content[3]&&"o"===this.content[4]&&"o"===this.content[5]?(this.gameOver=!0,this.handleGameover("o")):"o"===this.content[6]&&"o"===this.content[7]&&"o"===this.content[8]?(this.gameOver=!0,this.handleGameover("o")):"o"===this.content[0]&&"o"===this.content[3]&&"o"===this.content[6]?(this.gameOver=!0,this.handleGameover("o")):"o"===this.content[1]&&"o"===this.content[4]&&"o"===this.content[7]?(this.gameOver=!0,this.handleGameover("o")):"o"===this.content[2]&&"o"===this.content[5]&&"o"===this.content[8]?(this.gameOver=!0,this.handleGameover("o")):"o"===this.content[0]&&"o"===this.content[4]&&"o"===this.content[8]?(this.gameOver=!0,this.handleGameover("o")):"o"===this.content[2]&&"o"===this.content[4]&&"o"===this.content[6]&&(this.gameOver=!0,this.handleGameover("o")),this.turnCount>=9&&!this.gameOver&&(this.gameOver=!0,this.handleGameover("tie"))},t.prototype.updateScore=function(){var t=document.querySelector(".span-x-score");t.innerHTML=String(this.xScore);var e=document.querySelector(".span-o-score");e.innerHTML=String(this.oScore)},t.prototype.handleGameover=function(t){var e=this;"x"===t&&"tie"!==t?this.winner="x":"o"===t?this.winner="o":this.winner="","tie"!==t?setTimeout(function(){console.log("game over! "+e.winner+" won")},700):setTimeout(function(){console.log("game over! Tie game")},700),console.log("board: ",this.content),"x"===this.winner?this.xScore+=1:"o"===this.winner&&(this.oScore+=1),setTimeout(function(){e.updateScore()},1500),setTimeout(function(){"x"===e.winner?(e.hideOMsg(),e.showXMsg()):(e.hideXMsg(),e.showOMsg()),e.clearBoard()},2100),this.winner!==this.playerChoice&&1===this.numOfPlayers&&setTimeout(function(){e.computerTurn()},2500)},t.prototype.hover=function(t){this.tilesDisabled[t]?this.tilesDisabled[t]&&(this.tiles[t].style="\n        background: #f00;\n        transition: background 400ms ease-in;\n      "):this.tiles[t].style="\n        background: #90ee90;\n        transition: background 400ms ease-in\n      "},t.prototype.removeHover=function(t){this.tilesDisabled[t]?this.tilesDisabled[t]&&(this.tiles[t].style="\n        background: #87ceeb;\n        transition: background 300ms ease-out;\n      "):this.tiles[t].style="\n        background: #87ceeb;\n        transition: background 300ms ease-out;\n      "},t.prototype.hideXMsg=function(){var t=document.querySelector(".x-turn");t.animate([{transform:"translateY(0px)"},{transform:"translateY(50px)"}],{direction:"normal",duration:800,easing:"ease-in-out",fill:"forwards",iterations:1})},t.prototype.showXMsg=function(){var t=document.querySelector(".x-turn");t.animate([{transform:"translateY(50px)"},{transform:"translateY(0px)"}],{direction:"normal",duration:800,easing:"ease-in-out",fill:"forwards",iterations:1})},t.prototype.hideOMsg=function(){var t=document.querySelector(".o-turn");t.animate([{transform:"translateY(0px)"},{transform:"translateY(50px)"}],{direction:"normal",duration:800,easing:"ease-in-out",fill:"forwards",iterations:1})},t.prototype.showOMsg=function(){var t=document.querySelector(".o-turn");t.animate([{transform:"translateY(50px)"},{transform:"translateY(0px)"}],{direction:"normal",duration:800,easing:"ease-in-out",fill:"forwards",iterations:1})},t.prototype.toggleX=function(){this.hideOMsg(),this.showXMsg()},t.prototype.toggleO=function(){this.hideXMsg(),this.showOMsg()},t.prototype.clearBoard=function(){for(var t=this,e=0;e<9;e+=1)this.content[e]="";this.tilesDisabled.forEach(function(e,i){t.tilesDisabled[i]=!1}),this.ctx.forEach(function(t,e){t.clearRect(0,0,100,100)}),this.tiles.forEach(function(t){t.classList.remove("fade-out-tile")}),this.gameOver=!1,this.turnCount=0,this.winner=""},t.prototype.manualReset=function(){var t=this,e=document.querySelector(".reload");e.addEventListener("click",function(){var e=prompt("Are you sure you want to clear games ?This will clear the board and the scoreEnter y to continue, anything else to abort");"y"===e.toLowerCase()&&(t.clearBoard(),t.xScore=0,t.oScore=0,t.updateScore())})},t}(),appInstance=new App;appInstance.init();