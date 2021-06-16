let guessedLetters = document.querySelector(".guessed-letters")
let guessButton = document.querySelector(".guess");
let input = document.querySelector(".letter")
let wordInProgress = document.querySelector(".word-in-progress");
let guessesParagraph = document.querySelector(".remaining");
let remainignGuesses = document.querySelector(".remaining span")
let message = document.querySelector(".message");
let playAgain = document.querySelector(".play-again");
let word = "mongolia";

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
    input.value = "";
    console.log(playerGuess);
})
