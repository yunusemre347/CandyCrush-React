import { useEffect, useState } from 'react';
import {
  CheckForColumnOfThree,
  CheckForColumnOfFour,
  CheckForRowOfThree,
  CheckForRowOfFour,
  MoveIntoSquareBelow,
  CandyColors,
} from './lib/CalculatorFuncs';

const width = 8;

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute('data-id')
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute('data-id')
    );

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];
    const validMove = validMoves.includes(squareBeingReplacedId);
    if (validMove) {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingDragged.getAttribute('src');
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute('src');
    }

    const isColumnOfFour = CheckForColumnOfFour(currentColorArrangement);
    const isColumnOfThree = CheckForColumnOfThree(currentColorArrangement);
    const isRowOfFour = CheckForRowOfFour(currentColorArrangement);
    const isRowOfThree = CheckForRowOfThree(currentColorArrangement);
    console.log(validMove);

    if (
      squareBeingReplacedId &&
      validMove &&
      (isRowOfThree || isRowOfFour || isColumnOfFour || isColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute('src');
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute('src');
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        CandyColors[Math.floor(Math.random() * CandyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };
  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      CheckForColumnOfFour(currentColorArrangement);
      CheckForColumnOfThree(currentColorArrangement);
      CheckForRowOfFour(currentColorArrangement);
      CheckForRowOfThree(currentColorArrangement);
      MoveIntoSquareBelow(currentColorArrangement);
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);

    return () => clearInterval(timer);
  }, [
    CheckForColumnOfThree,
    currentColorArrangement,
    CheckForColumnOfFour,
    CheckForRowOfThree,
    CheckForRowOfFour,
    MoveIntoSquareBelow,
  ]);

  return (
    <div className='app'>
      <div className='game'>
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <div className='notes'>
        {' '}
        <p>
          <br />
          yunusemreyilmaz347@gmail.com
          <br />
          <br />
        </p>
      </div>
    </div>
  );
};

export default App;
