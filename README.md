# Constructor-Hangman

Welcome to the CLI version of hangman. The theme of these answers is classic video games. The game has been "constructed" using various constructors (The Answer [video game title], the Letters [displayed as blanks until guessed], and each subsequent round of hangman).

To run this game, make sure you install the node package modules for chalk and inquirer ("npm install" in the command line). From there, enter "node hangman.js" and the game will run. 

Classic hangman: the user is presented with the blanks representing the answer in the command line. They will be prompted to submit a guess (numbers are a no go). 
    
    If the guess is correct, the user will be notified, and the corresponding blank will be replaced by the letter. 

    If the guess is incorrect, the user will be notified, and they will lose one of their guesses. 

The game will end once all guesses are exhausted, or if the correct Classic Game has been solved for. Once the game is over, the CLI will prompt the user if they want to play again. Most likely, the user will probably hit no and go play one of the games in this list. 

Enjoy!
