$(document).ready(function() {




var hangmanGame = {

    words: [
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

        "paula",
        "lauren",
        "duchess"
    ],

    alpha: "abcdefghijklmnopqrstuvwxyz",

    randomWord: "",
    
    scoreToWin: 0,
    score: 0,
    chances: 7,
    wins: 0,
    losses: 0,

    lettersGuessed: [],
    correctGuesses: [],
    incorrectGuesses: [],
    placeholder: [],


    getRandomWord: function (wordArr) {

        this.randomWord = wordArr[Math.floor((Math.random() * wordArr.length) + 1)];

        for (var i = 0; i < hangmanGame.alpha.length; i++) {
            if (hangmanGame.randomWord.indexOf(hangmanGame.alpha[i]) > -1) {
                hangmanGame.scoreToWin++;
            }
        }

        this.randomWord.split("").forEach(function () {
            hangmanGame.placeholder.push("-");
            hangmanGame.placeholder.join(" ");
        });

        $("#currentWord").text(this.placeholder.join(""));
    },





    validateKey: function (event) {
        var keyPressed = event.key.toLowerCase();

        var validKey;

        if (this.alpha.indexOf(keyPressed) > -1) {
            validKey = keyPressed;
            this.checkForDupeLetter(validKey);
        }         
    },


    checkForDupeLetter: function (validKey) {

        if (this.lettersGuessed.indexOf(validKey) > -1) {
            // nothing if letter guessed previously
            console.log("dupe letter: " + validKey);
        } else {
            // store any guessed letter not previously guessed
            this.lettersGuessed.push(validKey);
            console.log("letters used so far: " + this.lettersGuessed);

            // proceeds to see if letter exists in word and generate score
            this.letterChecker(validKey);
        }
    },


    letterChecker: function (validKey) {
        if (this.randomWord.indexOf(validKey) > -1) {
            this.score++;        

            for (var i = 0; i < this.randomWord.length; i++) {
                if(this.randomWord[i] === validKey) {
                    this.placeholder[i] = validKey;
                }
            }

            $("#currentWord").text(this.placeholder.join(""));

           console.log("Correct guess: " + this.placeholder + ".  " + "Letters used so far: " + this.lettersGuessed);
            
            if (this.score === this.scoreToWin) {
                console.log("You win!");
                this.wins++;
                this.resetGame(this);
            }

        } else {
            this.chances--;
            $("#chances").text(this.chances);

            this.incorrectGuesses.push(validKey);

           console.log("Wrong.  Letters guessed: " + this.lettersGuessed + ".  Guesses remaining: " + this.chances);

            if (this.chances === 0) {
                console.log("You lose.  The word was '" + this.randomWord.toUpperCase() + "'");
                this.losses++;
                this.resetGame(this);
            }
        }

    },

    resetGame: function(x) {
        $("#wins").text(x.wins);
        $("#losses").text(x.losses);

        x.score = 0;
        x.lettersGuessed = [];
        x.correctGuesses = [];
        x.incorrectGuesses = [];
        x.scoreToWin = 0;
        x.placeholder = []
        x.chances = 7,


        $("#chances").text(x.chances);
        x.getRandomWord(x.words);
        console.log("reset performed");
    }

}

hangmanGame.getRandomWord(hangmanGame.words);

document.onkeyup = function(event) {

   hangmanGame.validateKey(event);

}


});