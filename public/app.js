const app = new Vue({
    el: ".app",
    data: {
      matches: 13,
          matchesFiltered: function () {
              return (this.matches < 1 ? 0 : this.matches);
          },
          prevTurn: 1,
          lastTurn: 'Player',
          winner: "",
          botText: "Ich bin MalteBot",
          gameStarted: false,
          botMode: 0
      },
      methods: {
          startGame: function (botMode) {
              this.matches = 13;
              this.botMode = botMode;
              this.lastTurn = 1;
              this.winner = '';
              this.gameStarted = true;
          },
          botTurn: function () {
              var takeAmount;
              switch (this.botMode) {
                  case 0:
                      takeAmount = this.prevTurn;					
                      break;
                  case 1:
                      if (this.matches % 2 == 0)
                          takeAmount = 1;
                      else
                          takeAmount = this.matches % 2;
              }
              
              this.matches -= takeAmount;
              this.botText = 'Ich nehme ' + takeAmount;
              this.lastTurn = 'MalteBot';
              this.checkWin();
          },
          playerTurn: function (amount) {
              this.matches -= amount;
              this.lastTurn = 'Player';
              this.prevTurn = amount;
              if(this.checkWin())
                  this.botTurn();	
          },
          checkWin: function () {
              if(app.matches <= 0) {
                  app.winner = app.lastTurn;
                  return false;
              } else {
                  return true;
              }
          }
      }
  });