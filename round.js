//Import the object of all possible Video Game Phrases
var Games = require('./words.js');
//Import the Word constructor to be used in Round constructor
var Word = require('./word.js');
//Import the chalk npm module for colored CLI elements
let chalk = require('chalk');

//Round constructor that will conduct the logic behind each round of a randomly chosen Videog Game Phrase
function Round() {
    //Set variable to hold all possible choices
    this.videogames = Games.array;
    //Pick a random index using Math.random, and then set Video Game Phrase at that index to this.currentGame
    this.randomIndex = Math.floor(Math.random() * this.videogames.length);
    this.currentGame = new Word(this.videogames[this.randomIndex]);
    this.dashDisplay = '';
    this.letterfound = false;
    this.guessesLeft = 10;
    this.guessesMade = ['   '];
}

//Method that utilizes the Word object's createDisplay method, as well as each Letter object's showLetter method to create initial display of "_" blanks
Round.prototype.createDisplay = function () {
    this.currentGame.addLetters();
    //Loop through each Letter object in the Word object, and add a _ (unless the Letter is a " ") to the dashesDisplay
    for (i = 0; i < this.currentGame.letters.length; i++) {
        this.dashDisplay += this.currentGame.letters[i].showLetter();
    }
    console.log(this.dashDisplay + "\n");
}

//Method that loops through each Letter in the Word object, and checks to see if they match the user's guessed letter
Round.prototype.checkGuess = function (letterGuess) {
    this.letterfound = false;
    for (i = 0; i < this.currentGame.letters.length; i++) {
        //Handling the edge cases for user input
        var upper = this.currentGame.letters[i].letter.toUpperCase();
        var lower = this.currentGame.letters[i].letter.toLowerCase();
        //If input matches 
        if (letterGuess === upper || letterGuess === lower) {
            //Set the Letter.appear key to true 
            this.currentGame.letters[i].appear = true;
            //Set Round.letterfound key to true
            this.letterfound = true;
        }
    }

    //If guessed letter was true (letter was found), console log the message and display guesses left
    if (this.letterfound) {
        console.log(chalk.bgGreen.black("\n'" + letterGuess + "'" + " is correct!"));
        console.log("Guesses Left: " + this.guessesLeft + "\n");
    }
    //If letter was not found, decrement guessesLeft by 1 and notify the user
    else {
        //Validation boolean to ensure the same letter cannot be guessed twice
        var guessedTwiceBool = false;
        for (i = 0; i < this.guessesMade.length; i++) {
            if (this.guessesMade[i] === letterGuess) {
                guessedTwiceBool = true;
            }
        }
        if (guessedTwiceBool === false) {
            console.log(chalk.bgRed.black("\n'" + letterGuess + "'" + " is not there!"));
            this.guessesLeft--;
            console.log("Guesses Left: " + this.guessesLeft + "\n");
        }
        //If the guessed letter was already guessed, let the user know, and do not decrement one from guesses left
        else {
            console.log(chalk.yellow("\n'You already guessed '" + letterGuess + "'"));
            console.log("Guesses Left: " + this.guessesLeft + "\n");
        }
    }
    //Add the guessed letter to guessesMade array (to be used for validation process above)
    this.guessesMade.push(letterGuess);
    //Return currentGame.letters, which should hold updated values for .appear (if the correct letter was chosen)
    return this.currentGame.letters;
}

//Update the display to show the letters that have been correctly chosen
Round.prototype.updateDisplay = function () {
    //reset the dashDisplay, loop through the currentGame.letters, and run the showLetter method for each 
    this.dashDisplay = '';
    for (i = 0; i < this.currentGame.letters.length; i++) {
        this.dashDisplay += this.currentGame.letters[i].showLetter();
    }
    console.log(this.dashDisplay);
}

//Method to loop through each Letter object in the Word, and check to see if all letters are showing (.appear)
Round.prototype.isGameSolved = function () {
    //Initially set currentGame.phraseSolved to true
    this.currentGame.phraseSolved = true;
    for (i = 0; i < this.currentGame.letters.length; i++) {
        //If at least one letter has not been solved for, set phraseSolved to false 
        if (this.currentGame.letters[i].appear === false) {
            this.currentGame.phraseSolved = false;
        }
    }
    //Return the boolean to be used in the hangman.js file
    return this.currentGame.phraseSolved;
}

//Export the Round constructor
module.exports = Round; 