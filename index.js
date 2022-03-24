console.log(
  "Battleships! Enter two numbers between 1-8 that represent the co-ordinates (X & Y) to find the hidden two boats"
);

// generate the two random positions the battleships will be placed at
const firstRandomBattleshipPosition = () => {
  const randomShipPositionX = Math.floor(Math.random() * 8);
  const randomShipPositionY = Math.floor(Math.random() * 8);
  const combinedValues = [randomShipPositionX + 1, randomShipPositionY + 1];
  return combinedValues;
};

const secondRandomBattleShipPosition = () => {
  const secondrandomShipPositionX = Math.floor(Math.random() * 8);
  const secondrandomShipPositionY = Math.floor(Math.random() * 8);
  const combinedValues = [
    secondrandomShipPositionX + 1,
    secondrandomShipPositionY + 1,
  ];
  return combinedValues;
};

const firstRandomPosition = firstRandomBattleshipPosition();
const secondRandomPosition = secondRandomBattleShipPosition();

const generateBoard = () => {
  // generates an 8x8 board - both ships are currently being displayed
  let arr = [];
  for (let x = 1; x < 9; x++) {
    for (let y = 1; y < 9; y++) {
      const xandyCombined = [x, y];
      if (
        JSON.stringify(firstRandomPosition) === JSON.stringify(xandyCombined) ||
        JSON.stringify(secondRandomPosition) === JSON.stringify(xandyCombined)
      ) {
        arr.push("ship");
      } else {
        arr.push([x, y]);
      }
    }
  }
  return arr;
};

let questionCounter = 1;
let hitCounter = 1;

const genBoard = generateBoard();

const questions = () => {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Enter your first number for the X Axis between 1-8 : ",
    (userX) => {
      rl.question(
        "Enter your second number for the Y Axis between 1-8 : ",
        (userY) => {
          rl.close();
          let userXVal = Number(userX);
          let userYVal = Number(userY);

          let userCombinedInputs = [userXVal, userYVal];
          // saves users input values in an array then compare distances of each to determine if hot/warm/cold

          const firstShipDistance =
            Math.abs(userXVal - firstRandomPosition[0]) +
            Math.abs(userYVal - firstRandomPosition[1]);

          const secondShipDistance =
            Math.abs(userXVal - secondRandomPosition[0]) +
            Math.abs(userYVal - secondRandomPosition[1]);

          const compareDistances = () => {
            if (firstShipDistance > secondShipDistance) {
              return secondShipDistance;
            } else {
              return firstShipDistance;
            }
          };

          const smallestDisatnce = compareDistances();

          const hotWarmCold = () => {
            if (smallestDisatnce >= 5) {
              return "Cold";
            } else if (smallestDisatnce >= 3) {
              return "Warm";
            } else {
              return "Hot";
            }
          };

          const howHot = hotWarmCold();

          if (questionCounter == 20) {
            console.log(
              "A maximum of 20 guesses has been exceeded! Play again!"
            );
            process.exit();
          }
          if (hitCounter == 2) {
            console.log("Congrats! You found both of the ships!");
            process.exit();
          }
          //compare user input to the first & second random boat positions
          if (
            JSON.stringify(userCombinedInputs) ===
            JSON.stringify(firstRandomPosition)
          ) {
            hitCounter++;
            questionCounter++;
            console.log("Hit! Try find the second ship!");
            questions();
          } else if (
            JSON.stringify(userCombinedInputs) ===
            JSON.stringify(secondRandomPosition)
          ) {
            hitCounter++;
            questionCounter++;
            console.log("Hit! Try find the other ship!");
            questions();
          } else {
            console.log(howHot);
            questionCounter++;
            questions();
          }
        }
      );
    }
  );
};

const startGame = () => {
  console.log("Game Board", genBoard);
  questions();
};
startGame();
