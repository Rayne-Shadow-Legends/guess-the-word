let guessedLettersElement = document.querySelector(".guessed-letters")
let guessButton = document.querySelector(".guess");
let input = document.querySelector(".letter")
let wordInProgress = document.querySelector(".word-in-progress");
let guessesParagraph = document.querySelector(".remaining");
let remainignGuesses = document.querySelector(".remaining span")
let message = document.querySelector(".message");
let playAgain = document.querySelector(".play-again");

let word = "mongolia";
let guessedLetters = [];

function hideWord() {
    for(hiddenWord = ""; hiddenWord.length < word.length; wordInProgress.innerText = hiddenWord) {
        let circleString = "●";
        hiddenWord = hiddenWord + circleString;
    };
};
hideWord();

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    let playerGuess = input.value;
    message.innerText = "";
    let validatedGuess = validatePlayerInput(playerGuess);

    if(validatedGuess) {
        makeGuess(validatedGuess)
    }
});

let validatePlayerInput = function(input) {
    let acceptedLetters = /[a-zA-Z]/
    if(input.length === 0) {
       message.innerText = "Please input a letter"
    } else if(input.length > 1) {
       message.innerText = "Only one letter is allowed"
    } else if(!input.match(acceptedLetters)) {
        message.innerText = "Only letters are allowed"
    } else {
        return input;
    }
};

let makeGuess = function(letter) {
    letter.toUpperCase();
    if(guessedLetters.includes(letter)){
        message.innerText = "You already guessed that letter";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
    };
};
