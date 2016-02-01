var _ = require('lodash');
var Promise = require('promise');

if (process.argv.length < 4) {
  console.log('Example of use: node index.js file1.txt file2.txt, it returns all lines that exist in file1 but not exist in file2');
  process.exit(1);
}
// Read the file and print its contents.
var fs = require('fs'), filename = process.argv[2], filename2 = process.argv[3];

function filePromise (filename){
    return new Promise(function(resolve, error){
      fs.readFile(filename, 'utf8', function(err, data) {
        if (err) reject(err);
         resolve(data);
      });
    });
}

function filenameLines(filename){
  return filePromise(filename).then(function(data){
    return data.split(/\r?\n/);
  });
}

filenameLines(filename).then(function(lines){
  filenameLines(filename2).then(function(lines2){
    console.log(_.difference(lines, lines2));
  });
});
