console.log(
  "Battleships! Enter two numbers between 1-8 that represent the co-ordinates (X & Y) to find the hidden two boats, press 'Q' to quit at any time, you'll have 20 chances to find the two boats."
);

// generate the two random positions the battleships will be placed at
const RandomBattleshipPosition = () => {
  const randomShipPositionX = Math.floor(Math.random() * 8);
  const randomShipPositionY = Math.floor(Math.random() * 8);
  const combinedValues = [randomShipPositionX + 1, randomShipPositionY + 1];
  return combinedValues;
};

const firstRandomPosition = RandomBattleshipPosition();
const secondRandomPosition = RandomBattleshipPosition();

//creates a 8x8 board displayed to user as a visual represenation
// const generateBoard = () => {
//   // generates an 8x8 board - both ships are currently being displayed
//   let arr = [];
//   for (let x = 1; x < 9; x++) {
//     for (let y = 1; y < 9; y++) {
//       const xandyCombined = [x, y];
//       if (
//         JSON.stringify(firstRandomPosition) === JSON.stringify(xandyCombined) ||
//         JSON.stringify(secondRandomPosition) === JSON.stringify(xandyCombined)
//       ) {
//         //represents the two ships - can be changed to [x, y] to hide the two ships.
//         arr.push("ship");
//       } else {
//         arr.push([x, y]);
//       }
//     }
//   }
//   return arr;
// };
// const genBoard = generateBoard();

let questionCounter = 1;
let firstHit = 0;
let secondHit = 0;

const questions = () => {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Enter your first number for the X Axis between 1-8 : ",
    (userX) => {
      // quits out of game if user enters "Q"
      if (userX === "q") {
        process.exit();
      }
      //quits out of game if user input is greater then 8
      if (userX > 8) {
        console.log("Try again selecting a number between 1-8");
        process.exit();
      }

      rl.question(
        "Enter your second number for the Y Axis between 1-8 : ",
        (userY) => {
          rl.close();

          if (userY.toLocaleLowerCase() === "q") {
            process.exit();
          }

          if (userY > 8) {
            console.log("Try again selecting a number between 1-8");
            process.exit();
          }

          // saves users input values in an array then compare distances of each to determine if hot/warm/cold

          let userXVal = Number(userX);
          let userYVal = Number(userY);

          let userCombinedInputs = [userXVal, userYVal];

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

          //compare user input to the first & second random boat positions
          //first
          if (
            JSON.stringify(userCombinedInputs) ===
            JSON.stringify(firstRandomPosition)
          ) {
            questionCounter++;
            if (firstHit == 1) {
              console.log("Ship has already been found! Try again");
              questions();
            } else if (secondHit == 1) {
              console.log("Congrats! You found both of the ships!");
              process.exit();
            } else {
              console.log("Hit! Try find the second ship!");
              firstHit++;
              questions();
            }
          } else if (
            //second
            JSON.stringify(userCombinedInputs) ===
            JSON.stringify(secondRandomPosition)
          ) {
            questionCounter++;

            if (secondHit == 1) {
              console.log("Ship has already been found! Try again");
              questions();
            } else if (firstHit == 1) {
              console.log("Congrats! You found both of the ships!");
              process.exit();
            } else {
              console.log("Hit! Try find the other ship!");
              secondHit++;
              questions();
            }
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

questions();
