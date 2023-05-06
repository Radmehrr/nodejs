const {createWriteStream, write} = require('fs')

const writeStream = createWriteStream('./stdin.txt')

process.stdin.pipe(writeStream)