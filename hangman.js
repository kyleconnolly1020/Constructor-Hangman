//Import inquirer
var inquirer = require('inquirer');
//Import chalk (colored CLI)
let chalk = require('chalk');
//Create the initial message that is displayed using BottomBar()
var footer = new inquirer.ui.BottomBar();
//Import the Round constructor 
var Round = require('./round.js');

//Display the message that the user first sees uponing opening up the CLI
footer.updateBottomBar(chalk.bgBlue("\nThere's no better way to celebrate the greatest games of all time than with a not so great game...\n\n"));
start();


//Starts the game with a new Round 
function start() {
    var newRound = new Round;
    newRound.createDisplay();
    guessLetter(newRound);
}

//Function using inquirer to prompt the user for a letter guess. Pass in the Round object that was created
function guessLetter(currentRound) {

    //Check to see that the user hasn't exhausted their guesses or that they solved the game (for recursion purposes)
    var isTheGameSolved = currentRound.isGameSolved();
    if (currentRound.guessesLeft !== 0 && isTheGameSolved === false) {
        
        //Prompt the user for a letter guess
        inquirer.prompt([
            {
                type: "input",
                message: chalk.green("\nGuess a Letter!"),
                name: "guess"
            }
        ]).then(function (answer) {
            //Validate that their guess is NaN
            if (isNaN(answer.guess)) {
                //Check the guess and update the dashesDisplay
                currentRound.checkGuess(answer.guess);
                currentRound.updateDisplay();
                //Let the user guess again
                guessLetter(currentRound);
            }
            //If guess is a number 
            else {
                console.log(chalk.red("Invalid Input"));
                guessLetter(currentRound);
            }
        });
    }

    //If the user solved the game 
    else if (isTheGameSolved === true) {
        console.log("\nYou've Won! \nCorrect Phrase: " + chalk.green(currentRound.currentGame.word + "\n"));
        //Prompt them to play again or quit 
        playAgain();
    }
    
    //If the user ran out of guesses
    else {
        console.log("\nSorry! \nCorrect Phrase: " + chalk.green(currentRound.currentGame.word + "\n"));
        //Prompt them to play again or quit
        playAgain();
    }
}

//After a round is over, create a new round object if the user wants to play again, otherwise quit the CLI
function playAgain() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to play again?",
            choices: ["Yes", "No"],
            name: "choice"
        }
    ]).then(function (action) {
        if (action.choice === "Yes") {
            start();
        }
        else if (action.choice === "No") {
            process.exit(0);
        }
    });
}


