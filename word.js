//Import the letter constructor
var Letter = require('./letter.js');

//Word constructor that gets passed in a randomly selected word phrase 
function Word (word){
    this.word = word;
    //Empty array to hold all Letter objects
    this.letters = []; 
    this.phraseSolved = false; 
}

//Word method to push Letter objects to "this.letters" key 
Word.prototype.addLetters = function() {
    //Loop through each individual letter in the phrase 
    for(var i = 0; i < this.word.length; i++){
        //create a new Letter object and push it into the array
        var newLetter = new Letter (this.word[i]);
        this.letters.push(newLetter);
    }
};

//Export the Word constructor to be used in round.js
module.exports = Word; 