console.log("Battleships! Enter two coordintes an X & Y!");

// Battleships using text input and output
// create 8x8 grid x & y
// randomly assign 2 signle cell ships on board
// allow user 20 guesses
// 1-2 cells away from  'warm
// 3-4 away - cold
// if hit user gets hit and ship is remoed from board
// game ends when both ships hit or 20 guesses

const firstPosition = () => {
  const randomShipPosition1 = Math.floor(Math.random() * 8);
  const randomShipPosition2 = Math.floor(Math.random() * 8);
  const combinedValues = [randomShipPosition1 + 1, randomShipPosition2 + 1];
  return combinedValues;
};

const secondPosition = () => {
  const secondrandomShipPosition1 = Math.floor(Math.random() * 8);
  const secondrandomShipPosition2 = Math.floor(Math.random() * 8);
  const combinedValues = [
    secondrandomShipPosition1 + 1,
    secondrandomShipPosition2 + 1,
  ];
  return combinedValues;
  //geneartes second set of random positions to store second battleship
};

const firstRandomPosition = firstPosition();
const secondRandomPosition = secondPosition();

console.log("1 gen", firstRandomPosition);
console.log("2 gen", secondRandomPosition);

const generateBoard = () => {
  let arr = [];
  for (let x = 1; x < 9; x++) {
    for (let y = 1; y < 9; y++) {
      const xandyaxis = [x, y];
      if (
        JSON.stringify(firstRandomPosition) === JSON.stringify(xandyaxis) ||
        JSON.stringify(secondRandomPosition) === JSON.stringify(xandyaxis)
      ) {
        arr.push([0]);
      } else {
        arr.push([x, y]);
      }
    }
  }
  return arr;
};

const isClose = () => {};

let questionCounter = 0;
let firstHit = 0;
let SecondHit = 0;

const questions = () => {
  console.log("question counter", questionCounter);

  console.log("1", questionCounter);
  console.log("2", firstHit);
  console.log("3", SecondHit);

  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Enter your first number for the X Axis between 1-8 : ",
    (answer1) => {
      rl.question(
        "Enter your second number for the Y Axis between 1-8 : ",
        (answer2) => {
          rl.close();
          let userCombinedInputs = [Number(answer1), Number(answer2)];

          if (firstHit == 1) {
            questionCounter++;
            console.log("first ship has already been hit, try again!");
            questions();
          } else if (SecondHit == 1) {
            console.log("second ship has already been hit, try again!");
            questionCounter++;
            questions();
          } else if (questionCounter == 20) {
            console.log(
              "A maximum of 20 guesses has been exceeded! Play again!"
            );
            process.exit();
          } else if (firstHit == 1 && SecondHit == 1) {
            console.log("Congrats! You found both of the ships!");
          } else if (
            JSON.stringify(userCombinedInputs) ===
            JSON.stringify(firstRandomPosition)
          ) {
            firstHit++;
            questionCounter++;
            console.log("Hit! Try find the second ship!");
            questions();
          } else if (
            JSON.stringify(userCombinedInputs) ===
            JSON.stringify(secondRandomPosition)
          ) {
            SecondHit++;
            questionCounter++;
            console.log("Hit! Try find the other ship!");
            questions();
          } else {
            console.log("Missed! try again!");
            questionCounter++;
            questions();
          }
        }
      );
    }
  );
};

const startGame = () => {
  console.log(generateBoard());
  questions();
};
startGame();
