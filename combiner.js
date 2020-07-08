
const split = require('split2');
const combine = require('stream-combiner');
const through = require('through2');
const zlib = require('zlib');

module.exports = function () {
    let current;
    const group = through(function (line, _, next) {
        line = line.toString();
        const row = JSON.parse(line);
        if (row.type === 'genre') {
            if (current) {
                this.push(JSON.stringify(current) + '\n');
            }
            current = { name: row.name, books: [] }
        } else if (row.type === 'book') {
            current.books.push(row.name)
        }
        next()
    }, function end(done) {
        if (current) {
            this.push(JSON.stringify(current) + '\n');
        }
        done()
    })

    return combine(split(), group, zlib.createGzip());
}