const moment = require('moment');
const fs = require('fs');
const readline = require('readline');
const SPACE = " - ";
const CRLF = "\n";

function randomInt(minimum, maximum) {
    return Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);
}

function mainGame() {
    // generate the number 0 or 1 means obverse and reverse
    let randomNumber = randomInt(0, 1);
    console.log("I have guessed the number 0 or 1 try to guess");
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('line', function (cmd) {
        console.log('You just typed: ' + cmd);
        if (parseInt(cmd, 10) > 1) {
            console.log("Please type 0 or 1 to guess the number: ")
        }
        if (parseInt(cmd, 10) === randomNumber) {
            console.log("You won!");
            fs.appendFile('game.logfile', moment().format('DD-MM-YYYY hh:mm') + SPACE + "won" + CRLF, (error) => {
                if (error) throw error;
                console.log('The game.log has been saved!');
            });
            rl.close();
        } else {
            console.log("You loose");
            fs.appendFile('game.logfile', moment().format('DD-MM-YYYY hh:mm') + SPACE + "loose" + CRLF, (error) => {
                if (error) throw error;
                console.log('The game.log has been saved!');
            });
            rl.close();
        }
    });
}

mainGame();
