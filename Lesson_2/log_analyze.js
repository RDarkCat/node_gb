const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const util = require('util')
const SPACE = " - ";
const CRLF = "\n";
var data="";
var score = {
    won: 0,
    loose: 0
};
var lines

const fileValue =  util.promisify(fs.readFile);
fileValue('game.logfile', 'utf8')
    .then((fileData) => {
        data = fileData;
        lines = fileData.split("\n");
        lines.forEach(function (value) {
            if (value.length !== 0) {
                let item = value.split(SPACE);
                item.forEach(function (val){
                    switch (val) {
                        case 'loose':
                            score.loose += 1;
                            break;
                        case 'won':
                            score.won += 1;
                            break;
                    }
                })

            }

        })
        let fullGames = lines.length - 1;
        console.log("All games played " + SPACE + fullGames);
        console.log("won scores" + SPACE + score.won);
        console.log("loose scores" + SPACE + score.loose);
    })
    .catch((error) => {
        console.log("Failed to read", argv._[0])
    });


