
const concat = require('concat-stream');

process.stdin.pipe(concat(function (body) {
    const s = body.toString().split('').reverse().join('');
    process.stdout.write(s);
}))