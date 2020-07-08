
const http = require('http');
const through = require('through2');

const server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req.pipe(through(function (buffer, _, next) {
            this.push(buffer.toString().toUpperCase());
            next();
        })).pipe(res);
    } else res.end('not POST');
});

server.listen(process.argv[2]);