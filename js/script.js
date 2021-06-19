let guessedLettersElement = document.querySelector(".guessed-letters")
let guessButton = document.querySelector(".guess");
let input = document.querySelector(".letter")
let wordInProgress = document.querySelector(".word-in-progress");
let guessesParagraph = document.querySelector(".remaining");
let remainingGuesses = document.querySelector(".remaining span")
let message = document.querySelector(".message");
let playAgain = document.querySelector(".play-again");

let guessedLetters = [];

let guesses = 8; 

let getWord = async function() {
    let apiData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    let textData = await apiData.text();
    //console.log(textData);
    let wordArray = textData.split("\n");
    //console.log(wordArray);

        let randomNumber = Math.floor(Math.random() * wordArray.length);
        word = wordArray[randomNumber].trim();
        //console.log(randomWord);
        hideWord(word);
};

getWord();

function hideWord() {
    for(hiddenWord = ""; hiddenWord.length < word.length; wordInProgress.innerText = hiddenWord) {
        let circleString = "●";
        hiddenWord = hiddenWord + circleString;
    };
};

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    let playerGuess = input.value;
    message.innerText = "";
    let validatedGuess = validatePlayerInput(playerGuess);

    if(validatedGuess) {
        makeGuess(validatedGuess);
    }
});

let validatePlayerInput = function(input) {
    let acceptedLetters = /[a-zA-Z]/
    if(input.length === 0) {
       message.innerText = "Please input a letter";
    } else if(input.length > 1) {
       message.innerText = "Only one letter is allowed";
    } else if(!input.match(acceptedLetters)) {
        message.innerText = "Only letters are allowed";
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
        countGuesses(guess);
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
    let tempArray = [];

    for(let letter of wordArray) {
        if(guessedLetters.includes(letter)) { 
            tempArray.push(letter);
        } else {
            tempArray.push("●");
        };
    };
    tempString = tempArray.join("")
    wordInProgress.innerText = tempString;
    checkIfWin();
};

 let countGuesses = function(guess) {
     let upperWord = word.toUpperCase();
     if(!upperWord.includes(guess)) {
         message.innerText = "The word doesn't contain that letter";
         guesses--;
     } else if(upperWord.includes(guess)){
        message.innerText = "Good job, The word contain that letter";
     };

    if(guesses > 1){
        remainingGuesses.innerText = `${guesses} guesses`;

        } else if(guesses === 1){ 
            remainingGuesses.innerText = `${guesses} guess`;

        } else if(guesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${upperWord}</span>.`;
        remainingGuesses.innerText = `${guesses} guesses`;
        startOver();
        };
    }

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

    startOver();
  };
};

let startOver = function() {
    guessButton.classList.add("hide");
    guessesParagraph.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgain.classList.remove("hide");
    console.log("button work pog");
};

playAgain.addEventListener("click", function() {
    message.classList.remove("win")
    message.classList.remove("hide");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";

    guessedLetters = [];
    guesses = 8;
    remainingGuesses.innerText = `${guesses} guesses`;

    guessButton.classList.remove("hide");
    guessesParagraph.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgain.classList.add("hide");

    getWord();
});
