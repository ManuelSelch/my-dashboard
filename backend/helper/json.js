const fs = require('fs');
const path = require('path');

function read(file, callback) {
    const filePath =  path.join(__dirname, '..', file);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(data));
    });
}

function write(file, data, callback) {
    const filePath =  path.join(__dirname, '..', file);
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}


module.exports = {
    read,
    write
};
  