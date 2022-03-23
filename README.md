To run the code type node index.js in the terminal, follow the prompts! you'll first be asked to select a co-ordinate for the x-axis then you'll be asked for the y-axis.

Instructions for Battleships

Your challenge is to implement this simplified game of Battleships using text input and output.

The computer randomly chooses the location of two single-cell “ships” on a board of 8 by 8 cells. The user then has 20 guesses to find the two ships.

The user enters a coordinate, for example 3,5, and the computer locates the nearest ship to that coordinate and tells them they’re “hot” if they’re 1 to 2 cells away, “warm” if they’re 3 to 4 cells away, or “cold” if they’re further away.

Use a simplified distance function of D = abs(x1-x2) + abs(y1-y2). As an example, 3,5 is three cells away from 2,7 because (3 - 2) + (7 - 5) = 3, so they’d be told they were “warm”.

If the user correctly guesses a ship’s location, they’re told they’ve got a hit and that ship is removed from the board. The game ends when both ships have been hit by the user, or the user has used up their 20 guesses.

Some things to note:
Write your code in a style that you consider to be production quality.
We’re more interested in your logical thinking, process and coding style. Show us what you know about writing great software.
Feel free to use your language of choice. We prefer Python, C#, JavaScript, TypeScript, or Java.
Please include guidance on how to install and execute your solution.
Feel free to provide a link to a repo as your solution
