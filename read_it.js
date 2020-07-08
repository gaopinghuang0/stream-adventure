const { Readable } = require('stream')

class MyStream extends Readable {
    constructor(content, options = {}) {
        super(options);
        this.content = content;
    }

    _read(size) {
        if (!this.content) return this.push(null);

        this.push(this.content.slice(0, size));
        this.content = this.content.slice(size);
    }
}

const myStream = new MyStream(process.argv[2]);
myStream.pipe(process.stdout);