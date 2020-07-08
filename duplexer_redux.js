const through = require('through2');
const duplexer = require('duplexer2');


module.exports = function (counter) {
    const _counter = {};

    // return a duplex stream to count countries on the writable side
    // and pass through `counter` on the readable side
    const readable = through.obj(function (obj, _, next) {
        _counter[obj.country] = (_counter[obj.country] || 0) + 1;
        next();
    }, function end(done) {
        counter.setCounts(_counter);
        done();
    })

    return duplexer({ objectMode: true }, readable, counter);

}