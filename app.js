// Basics of the game first
// Just play on the array
// Players can modify the array
const game = (() => {
  const gameboard = (() => {
    let _boardArr = ["", "", "", "", "", "", "", ""];
    const getBoard = () => _boardArr;
    const positionIndex = (index) => _boardArr[index];
    return { getBoard, positionIndex };
  })();

  // get the name of players from HTML document.
  const getName = (player) => {
    let name
      name = document.querySelector(`#name-${player}`).value;
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
    // write to DOM
    
    // What to do when a box is clicked
    const click = (X, O) => {
      // Create Players
      const player1 = player(1)
      const player2 = player(2)

      // Changes when players start playing. 
      let _played1 = false;
      let _played2 = false;
      // Changes when ther is a winner so you can't play anymore
      let _emptyBox = '';
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

          // print winner on screen.
          if (checkWinner().winner || checkWinner().winner == 'tie' ) 
          {
            const win = document.createElement("h1");
            win.innerHTML = checkWinner().message;
            document.querySelector(".main").appendChild(win);
            // Disable playing another round
            _emptyBox = 'winner';
          }
          
          // LOG ARRAY
          console.log(gameboard.getBoard());
        }
      });
    };
    return {  click };
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
      message = "Player 1 wins";
      winner = true;
    }
    else if (_player2Wins)
    {
      message = "Player 2 wins";
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
