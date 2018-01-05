//Letter constructor that gets passed in each letter of the chosen Videogame phrase
function Letter (letter){
    this.letter = letter; 
    this.appear = false; 
};

//Letter method to create the string of _'s (or show the letter if it has been guessed)
Letter.prototype.showLetter = function (){
    //If the Letter object is a space 
    if (this.letter === ' '){
        //Set its appear value to true
        this.appear = true;
        //Display a space instead of a "_" 
        return '  '; 
    }

    //If the letter has not been guessed
    else if (this.appear === false) {
        //Display the "_"
        return ' _ ';
    }

    else {
        //If the letter has been guessed, show the letter
        return this.letter;
    }
};

//Export the letter constructor to be used in word.js
module.exports = Letter;