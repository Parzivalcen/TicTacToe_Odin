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
    const wirte = () => {
      const div = document.createElement("div");
      div.classList.add("container");
      div.innerHTML = `
       <div class="box" data-box=0 ></div>
        <div class="box" data-box=1 ></div>
        <div class="box" data-box=2 ></div>
        <div class="box" data-box=3></div>
        <div class="box" data-box=4 ></div>
        <div class="box" data-box=5 ></div>
        <div class="box" data-box=6 ></div>
        <div class="box" data-box=7 ></div>
        <div class="box" data-box=8 ></div>
      `;
      document.querySelector(".main").appendChild(div);
    };
    // What to do when a box is clicked
    const click = (X, O) => {
      let played1 = false;
      let played2 = false;
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("box") && e.target.innerHTML == "") {
          let box = e.target.getAttribute("data-box");
          // check if player has played
          if (played1) {
            e.target.innerHTML = O;
            players.player2(box);
            played2 = true;
            played1 = false;
          } else {
            e.target.innerHTML = X;
            players.player1(box);
            played1 = true;
            played2 = false;
          }
          // print winner on screen.
          if (checkWinner().winner) {
            const win = document.createElement("h1");
            win.innerHTML = checkWinner().message;
            document.querySelector(".main").appendChild(win);
            played2 = true;
            played1 = true;
          }
          // LOG ARRAY
          console.log(gameboard.getBoard());
        }
      });
    };
    return { wirte, click };
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
    return { message, winner };
  };
  displayController.click("x", "O");
  displayController.wirte();
  console.log(gameboard.getBoard());



  return { players };
})();
// The only thing <<player>> should be able to do is call the function play (to place the items on the specified array index)
