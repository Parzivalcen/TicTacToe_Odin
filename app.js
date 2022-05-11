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
    gameboard[place][X] = "X";
  };
  const _playO = (place, O) => {
    gameboard[place][O] = "O";
  };
  const player1 = (row, column, symbol) => {
    if (symbol == "O") {
      _playO(row, column);
    } else {
      _playX(row, column);
    }
  };
  return { gameboard: () => gameboard, player1 };
})();
game.player1(2, 2, "O");
console.log(game.gameboard());
