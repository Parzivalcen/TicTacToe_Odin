// Basics of the game first
// Just play on the array
// Players can modify the array
const game = (() => {
  const gameboard = (() => {
    let _boardArr = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const getBoard = () => _boardArr;
    return { getBoard };
  })();
  // players take row and column of where to put the symbol
  // How do you create player tho
  const players = (() => {
    let played1,
      played2 = false;
    const player1 = (place, X) => {
      gameboard.getBoard()[place][X] = "X"; // Where to put X
      played1 = true;
    };
    const player2 = (place, O) => {
      gameboard.getBoard()[place][O] = "O"; // Where to put O
      played2 = true;
    };
    return { player1, player2 };
  })();

  const displayController = (() => {
    // write to DOM
    const wirte = () => {
      const div = document.createElement("div");
      div.classList.add("container");
      div.innerHTML = `
       <div class="box" data-box=0 data-row=0></div>
        <div class="box" data-box=1 data-row=0></div>
        <div class="box" data-box=2 data-row=0></div>
        <div class="box" data-box=0 data-row=1></div>
        <div class="box" data-box=1 data-row=1></div>
        <div class="box" data-box=2 data-row=1></div>
        <div class="box" data-box=0 data-row=2></div>
        <div class="box" data-box=1 data-row=2></div>
        <div class="box" data-box=2 data-row=2></div>
      `;
      document.querySelector(".main").appendChild(div);
    };
    // What to do when a box is clicked
    const click = (X, O) => {
      let played1 = false;
      let played2 = false;
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("box") && e.target.innerHTML == "") {
          let row = e.target.getAttribute("data-row");
          let box = e.target.getAttribute("data-box");
          if (played1) {
            e.target.innerHTML = O;
            players.player2(row, box);
            played2 = true;
            played1 = false;
          } else {
            e.target.innerHTML = X;
            players.player1(row, box);
            played1 = true;
            played2 = false;
          }

          console.log(gameboard.getBoard());
        }
      });
    };
    return { wirte, click };
  })();
  displayController.click("x", "O");
  displayController.wirte();
  console.log(gameboard.getBoard());
  return { players };
})();
// The only thing <<player>> should be able to do is call the function play (to place the items on the specified array index)
