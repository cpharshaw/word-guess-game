

var words = [
    "tulsi",
    "madhura",
    "sumitra",
    "bhanu",
    "karthik",

    "vishvesh",
    "ashmika",
    "priya",
    "abhishek",
    "sunny",
];

var alpha = "abcdefghijklmnopqrstuvwxyz";

var randomWordFunc = function() {
    return words[Math.floor(Math.random() * words.length)]
};

var randomWord = randomWordFunc();

var randomWordArr = randomWord.split("");



var placeholder = [];

randomWord.split("").forEach(function() {
    placeholder.push("-");
    placeholder.join(" ");
});

console.log(placeholder);

var validKey;

var wins = 0;
var losses = 0;

var scoreToWin = 0;
for (var i = 0; i < alpha.length; i++) {
    if (randomWord.indexOf(alpha.split("")[i]) > -1) {
        scoreToWin++;
    }
}

var score = 0;
var chances = 7;

var lettersGuessed = [];
var correctGuesses = [];
var incorrectGuesses = [];



// console.log(randomWord);

document.onkeyup = function(event) {

    // Determines which key was pressed.
    var key = event.key.toLowerCase();

    if (alpha.indexOf(key) > -1) {
        // stores key press if it was a letter
        validKey = key;

        if (lettersGuessed.indexOf(validKey) > -1) {
            // nothing if letter guessed previously
        } else {
            // store any guessed letter
            lettersGuessed.push(validKey);

            // if letter exists in word
            if (randomWord.indexOf(validKey) > -1) {
                score++;
                correctGuesses.push(validKey);


                for (var i = 0; i < randomWordArr.length; i++) {
                    if(randomWordArr[i] === validKey) {
                        placeholder[i] = validKey;
                    }
                }

                console.log("Correct: " + placeholder);

                if (score === scoreToWin) {
                    alert("You win!");
                    wins++;
                    return;
                }         

            // if letter is incorrect
            } else {
                chances--;
                incorrectGuesses.push(validKey);
                console.log("Letters already guessed: " + incorrectGuesses + ".  Guesses remaining: " + chances);

                if (chances === 0) {
                    alert("You lose.  The word was '" + randomWord.toUpperCase() + "'");
                    losses++;
                    return;
                }   

            }
        }  





        


    }
    // console.log(score);
    // console.log(validKey);
    // console.log(key);
    // console.log(lettersGuessed);

};