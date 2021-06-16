let guessedLettersElement = document.querySelector(".guessed-letters")
let guessButton = document.querySelector(".guess");
let input = document.querySelector(".letter")
let wordInProgress = document.querySelector(".word-in-progress");
let guessesParagraph = document.querySelector(".remaining");
let remainignGuesses = document.querySelector(".remaining span")
let message = document.querySelector(".message");
let playAgain = document.querySelector(".play-again");

let word = "angguss";
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

let makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if(guessedLetters.includes(guess)){
        message.innerText = "You already guessed that letter";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    };
};

let showGuessedLetters  = function() {
    guessedLettersElement.innerHTML = "";
    for(let letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

let updateWordInProgress = function(guessedLetters) {
    let wordUpper = word.toUpperCase();
    let wordArray = wordUpper.split("");

    for(let letter of wordArray) {
        if(guessedLetters.includes(letter)) {
            let indexOfWord = wordArray.indexOf(letter);
            let wordInProgressArray = wordInProgress.innerText.split("");
            wordInProgressArray.splice(Number(indexOfWord), 1, letter);
            console.log(wordInProgressArray)
            let wordInProgressString = wordInProgressArray.join("");
            console.log(wordInProgressArray);
            console.log(wordInProgressString);
            wordInProgress.innerText = wordInProgressString;
        };
    };
};

//TODO: can only guess one letter even if there are multiple of same type and letters appear out of order
//need to change all instances of letter instead of one probably not using indexOf(letter)
// loop through whole array
