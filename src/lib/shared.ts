export const generateInitialBoard = () => {
    const board = [];
  
    for (let y = 9; y >= 0; y--) {
      const row = [];
  
      for (let x = 0; x < 10; x++) {
        row.push({ x, y, status: "intact", isShipAvailable: false });
      }
  
      board.push(row);
    }
  
    return board;
  };