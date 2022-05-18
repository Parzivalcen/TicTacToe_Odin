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
  // players take row and column of where to put the symbol
  // How do you create player tho
  const players = (() => {
    
    const player1 = (position) => {
      gameboard.getBoard()[position] = "X"; // Where to put X
      
    };
    const player2 = (position) => {
      gameboard.getBoard()[position] = "O"; // Where to put O
      
    };
    
    return { player1, player2 };
  })();

  const displayController = (() => {
    // write to DOM
    // What to do when a box is clicked
    const click = (X, O) => {
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
          if (_played1) {
            e.target.firstChild.innerHTML = O;
            // populate board Array
            players.player2(box);
            _played2 = true;
            _played1 = false;
          } else {
            e.target.firstChild.innerHTML = X;
            // populate board Array
            players.player1(box);
            _played1 = true;
            _played2 = false;
          }
          // print winner on screen.
          if (checkWinner().winner || checkWinner().winner == 'tie' ) {
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



  return { players };
})();
// The only thing <<player>> should be able to do is call the function play (to place the items on the specified array index)
