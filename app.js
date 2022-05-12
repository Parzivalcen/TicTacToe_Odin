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
    const player1 = (place, X) => {
      gameboard.getBoard()[place][X] = "X"; // Where to put X
      let played = true;

      return played;
    };
    const player2 = (place, O) => {
      gameboard.getBoard()[place][O] = "O"; // Where to put O
      let played = true;

      return played;
    };
    return { player1, player2 };
  })();

  const displayController = (() => {
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
    const click = (x) => {
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("box") && e.target.innerHTML == "") {
          e.target.innerHTML = x;
          let row = e.target.getAttribute("data-row");
          let box = e.target.getAttribute("data-box");

          players.player1(row, box);

          console.log(gameboard.getBoard());
        }
      });
    };
    return { wirte, click };
  })();
  displayController.click("x");
  displayController.wirte();
  console.log(gameboard.getBoard());
  return { players };
})();
// The only thing <<player>> should be able to do is call the function play (to place the items on the specified array index)
