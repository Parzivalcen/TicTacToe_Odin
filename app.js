// Basics of the game first
// Just play on the array
// Players can modify the array
const game = (() => {
  const gameboard = (() => {
    let _boardArr = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => _boardArr;
    const positionIndex = (index) => _boardArr[index];
    return { getBoard, positionIndex };
  })();

  // get the name of players from HTML document.
  const getName = (player) => {
    let name
      name = document.querySelector(`#name-${player}`).value;
      if (name == '')
      {
        name = `Player ${player}`
      }
      return name; 
  }

  // Players Contructor
  const player = (number) => {
    let name = () => getName(number); 
    let id = number; 
    const play = (position) =>{
      if (number === 1)
      {
        gameboard.getBoard()[position] = 'X';
      }else if (number === 2)
      {
        gameboard.getBoard()[position] = 'O';
      }
    }
    return {name, play};
  }


  const displayController = (() => {
    // WRITE to DOM //
    const player1 = player(1)
    const player2 = player(2)

    
    // When Play! BTN is pressed only show form
    document.addEventListener('submit', (e) =>{
      e.preventDefault();
      // Show Board
      document.querySelector('.board-container').classList.remove('banish')   
      // Hide form
      document.querySelector('.names').classList.add('banish')    
      // Show player1.name vs player2.name
      let players = document.createElement('h1');
      players.innerHTML = `${player1.name()} vs ${player2.name()}` 
      document.querySelector('.players').appendChild(players);
    })

    // What to do when a box is clicked
    const click = (X, O) => {
      // Create Players

      // Changes when players start playing. 
      let _played1 = false;
      let _played2 = false;
      // Changes when ther is a winner so you can't play anymore
      let _emptyBox = '';
      document.addEventListener('click', (e) => {
        console.log(e.target);
        // Reset btn
        // There is an error when reset is pressed  //
        if (e.target.classList.contains('btn--reset'))
        {
          _played2 = false;
          _played1 = false;
          _emptyBox = '';
          checkWinner().winner = false;
          let counter = 0;
          gameboard.getBoard().forEach(() =>{
            gameboard.getBoard()[counter] = '';
            document.querySelector(`.symbol--${counter}`).innerHTML = '';
            counter++;
          })
          // Deletete END GAME message
          document.querySelector('.end-game-message').remove();
          console.log(gameboard.getBoard())
      }
      })
      document.querySelector('.board-container').addEventListener("click", (e) => {
        
        let symbolHTML = e.target.firstChild;
        
        
        if (symbolHTML.classList.contains("symbol") && symbolHTML.innerHTML === _emptyBox) {
          // get box index to populate board Array
          let box = symbolHTML.getAttribute("data-box");

          // check if player has played, if not, allow to play until there is a winner
          if (_played1) 
          {
            e.target.firstChild.innerHTML = O;
            // populate board Array
            player2.play(box);
            _played2 = true;
            _played1 = false;
          } 
          else 
          {
            e.target.firstChild.innerHTML = X;
            // populate board Array
            player1.play(box);
            
            _played1 = true;
            _played2 = false;
          }

          // print winner or tie on screen.
          if (checkWinner().winner || checkWinner().winner == 'tie' ) 
          {
            const win = document.createElement("div");
            win.classList.add('end-game-message', 'game-over');
            win.innerHTML = `
                              <h1>${checkWinner().message}</h1>
                              <button class="btn btn--reset">Play again</button>
                                `;
            document.querySelector(".board-container").appendChild(win);
            // Disable playing another round
            _emptyBox = 'winner';
          }
          
          // LOG ARRAY
          console.log(gameboard.getBoard());
        }

        
      });
      
    };
    return {  click,player1, player2 };
  })();

  
  const checkWinner = () => {
    const _winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winner = false;
    let message = "No one won yet";
    // Check the position of the _winCombos Arr in the game array, if the three indexes of _wincombos have the same symbol, there is a winner. 
    let _player1Wins = _winCombos.some((comboIndex) => {
      return comboIndex.every((index) => gameboard.positionIndex(index) === 'X')
    });
    let _player2Wins = _winCombos.some((comboIndex) => {
      return comboIndex.every((index) => gameboard.positionIndex(index) === 'O')
    });


    if (_player1Wins)
    {
      message = `${displayController.player1.name()} Wins!!!`;
      winner = true;
    }
    else if (_player2Wins)
    {
      message = `${displayController.player2.name()} Wins!!!`;
      winner = true;
    }
    // tie
    else if (!gameboard.getBoard().includes(''))
  {
    message = 'tie'
    winner = 'tie'
  }
    
    // TIE NEEDED

    return { message, winner };
  };

  displayController.click("x", "O");
  console.log(gameboard.getBoard());



  return;
})();
// The only thing <<player>> should be able to do is call the function play (to place the items on the specified array index)
