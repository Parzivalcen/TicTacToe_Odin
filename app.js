// Basics of the game first
// Just play on the array
// Players can modify the array
const game = (() => {
  const gameboard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const _playX = (place, X) => {
    gameboard[place][X] = "X"; // Where to put X
  };
  const _playO = (place, O) => {
    gameboard[place][O] = "O"; // Where to put O
  };
  // players take row and column of where to put the symbol
  const player = (row, column, symbol) => {
    // make other functions to play inside this
    const symbol = symbol;
    if (symbol == "O") {
      _playO(row, column);
    } else {
      _playX(row, column);
    }
  };
  return { gameboard: () => gameboard, player };
})();

player = game.player();
