


var hangmanGame = {

    gameInProgress: false,

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

        var word = this.randomWord;
        var list = this.placeholder;
        var stw = this.scoreToWin;
        var alphabet = this.alpha;
        
        for (var i = 0; i < alphabet.length; i++) {
            if (word.indexOf(alphabet[i]) > -1) {
                stw++;
            }
        }

        this.randomWord.split("").forEach(function () {
            list.push("-");
            list.join(" ");
        });

        this.randomWord = word;
        this.placeholder = list;
        this.scoreToWin = stw;
    },





    validateKey: function (event) {

        var keyPressed = event.key.toLowerCase();

        var validKey;

        if (this.alpha.indexOf(keyPressed) > -1) {
            validKey = keyPressed;
            this.checkForDupeLetter(validKey);
        } else {
            // return;
        };
        
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

            console.log();
            alert("Correct guess: " + this.placeholder + ".  " + "Letters used so far: " + this.lettersGuessed);
            
            if (this.score === this.scoreToWin) {
                alert("You win!");
                this.wins++;
                this.resetGame(this);
            }

        } else {
            this.chances--;

            this.incorrectGuesses.push(validKey);

            alert("Wrong.  Letters guessed: " + this.lettersGuessed + ".  Guesses remaining: " + this.chances);

            if (this.chances === 0) {
                alert("You lose.  The word was '" + this.randomWord.toUpperCase() + "'");
                this.losses++;
                this.resetGame(this);
            }
        }

    },

    resetGame: function(gameObj) {
        gameObj.score = 0;
        gameObj.lettersGuessed = [];
        gameObj.correctGuesses = [];
        gameObj.incorrectGuesses = [];
        gameObj.scoreToWin = 0;
        gameObj.placeholder = []
        gameObj.chances = 7,
        gameObj.getRandomWord(obj.words);
        console.log("reset performed");
    }

}

hangmanGame.getRandomWord(hangmanGame.words);

document.onkeyup = function(event) {

   hangmanGame.validateKey(event);

}
