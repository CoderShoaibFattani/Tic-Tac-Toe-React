import Square from "./Square";
import { useState } from "react";

// creating helper function to check winner
const calculateWinner = (squares) => {
  // created all possible wins in array called lines
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // using iteration on lines array and destructured sub-array values in a,b and c variables
  for (const [a, b, c] of lines) {
    /* checking for winning conditions like if take first sub-array as an example then we have a=0, b=1 and c=2, assume all are equal to either X or 0 then winner will be X or 0, squares[0] = X, squares[0]=X === squares[1]=X and squares[0]=X === squares[2]=X all are true then it will return X as winner */
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // if there is no winner it will return null value
  return null;
};

//created Board component which will display board with square and status and a reset button to reset game
const Board = () => {
  // storing state of squares and updating through useState hook
  const [squares, setSquares] = useState(Array(9).fill(null));
  // storing and updating of state of whose move is next
  const [xIsNext, setXIsNext] = useState(true);

  // click handling function that will do multiple things upon click on button of Square component
  const handleClick = (i) => {
    // it checks for condition that if someone has winned the game or if squares current box is filled or not so that this function stops working else it will move next
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // creating a copy of squares array to update copy not the original one
    const nextSquares = squares.slice();
    // checking if xIsNext is true then the current box will be valued X otherwise it will be valued 0
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // updating squares array with new copy of updated arrays of value X or 0
    setSquares(nextSquares);
    // toggling values of xIsNext
    setXIsNext(!xIsNext);
  };

  // storing the output of function in winner variable which will be either X, 0 or null
  const winner = calculateWinner(squares);
  // created empty variable status which will track the status of winning, draw and next turn
  let status;
  // checking if winner is true means either X or 0 the status will show winner, otherwise it will check for draw if else if condition, else it will check for next persons turn
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // gunction to reset game with updating squares array at initial condition of empty values and updating value of xIsNext to its initial value of true
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Board;
