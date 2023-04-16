import blueCandy from '../images/blue.png';
import redCandy from '../images/red.png';
import greenCandy from '../images/green.png';
import purpleCandy from '../images/purple.png';
import yellowCandy from '../images/yellow.png';
import orangeCandy from '../images/orange.png';
import blank from '../images/blank.png';

//This file checks for matches of rows and columns, defines candies,moves candies down

const width = 8;

export const CandyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

//check for match col of 3
export const CheckForColumnOfThree = (currentColorArrangement) => {
  for (let i = 0; i <= 47; i++) {
    const columnOfThree = [i, i + width, i + width * 2];
    const decidedColor = currentColorArrangement[i];

    if (
      columnOfThree.every(
        (square) => currentColorArrangement[square] === decidedColor
      )
    ) {
      columnOfThree.forEach(
        (square) => (currentColorArrangement[square] = blank)
      );
      return true;
    }
  }
};

//check for match col of 4
export const CheckForColumnOfFour = (currentColorArrangement) => {
  for (let i = 0; i <= 39; i++) {
    const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
    const decidedColor = currentColorArrangement[i];

    if (
      columnOfFour.every(
        (square) => currentColorArrangement[square] === decidedColor
      )
    ) {
      columnOfFour.forEach(
        (square) => (currentColorArrangement[square] = blank)
      );
      return true;
    }
  }
};

//check for match row of 3
export const CheckForRowOfThree = (currentColorArrangement) => {
  for (let i = 0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2];
    const decidedColor = currentColorArrangement[i];
    const notValid = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
    ];

    if (notValid.includes(i)) continue;

    if (
      rowOfThree.every(
        (square) => currentColorArrangement[square] === decidedColor
      )
    ) {
      rowOfThree.forEach((square) => (currentColorArrangement[square] = blank));
      return true;
    }
  }
};

//check for match row of 4
export const CheckForRowOfFour = (currentColorArrangement) => {
  for (let i = 0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3];
    const decidedColor = currentColorArrangement[i];
    const notValid = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55, 62, 63, 64,
    ];

    if (notValid.includes(i)) continue;

    if (
      rowOfFour.every(
        (square) => currentColorArrangement[square] === decidedColor
      )
    ) {
      rowOfFour.forEach((square) => (currentColorArrangement[square] = blank));
      return true;
    }
  }
};

//move down
export const MoveIntoSquareBelow = (currentColorArrangement) => {
  for (let i = 0; i <= 55; i++) {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
    const isFirstRow = firstRow.includes(i);

    if (isFirstRow && currentColorArrangement[i] === blank) {
      let randomNumber = Math.floor(CandyColors.length * Math.random());
      currentColorArrangement[i] = CandyColors[randomNumber];
    }

    if (currentColorArrangement[i + width] === blank) {
      currentColorArrangement[i + width] = currentColorArrangement[i];
      currentColorArrangement[i] = blank;
    }
  }
};
