const zlib = require('zlib')
const tar = require('tar')
const concat = require('concat-stream')
const crypto = require('crypto')

const decipher = crypto.createDecipheriv(process.argv[2], process.argv[3], process.argv[4])
const parser = new tar.Parse()
parser.on('entry', function (entry) {
    if (entry.type !== 'File') return entry.resume();

    // Note: cannot define hash outside of the function, because
    // hash stream should be re-created for each file.
    const hash = crypto.createHash('md5', { encoding: 'hex' })
    entry.pipe(hash).pipe(concat(function (body) {
        console.log(body + ' ' + entry.path);
    }))
})

process.stdin.pipe(decipher).pipe(zlib.createGunzip()).pipe(parser)
