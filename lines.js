const split = require('split2');
const through = require('through2');

let isOdd = true;
process.stdin
    .pipe(split())
    .pipe(through(function (line, _, next) {
        line = line.toString();
        this.push(isOdd ? line.toLowerCase() + '\n' : line.toUpperCase()) + '\n';
        isOdd = !isOdd;

        next();
    }))
    .pipe(process.stdout);