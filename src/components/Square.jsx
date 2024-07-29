/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

/* created square component for single square in board of gane, this component take two props, one is value which is the value either X or 0 we will update this dynamically through our second prop a click handler function */
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

Square.Prototyperototype = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func,
};

export default Square;
