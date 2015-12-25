#! /usr/bin/env node

var tokenizer = require('./tokenizer.js');
var parser = require('./parser.js');
var generator = require('./generator.js');

var fs = require('fs');

var userArgs = process.argv.slice(2);
var inputFile = userArgs[0];
var outputFile = userArgs[1];

function usage() {
  console.log('eg. ml2js *inputfile* *outputfile*');
}

if (typeof(inputFile) == 'undefined') {
  console.log('no input file designated');
  usage();
}
else if (typeof(outputFile) === 'undefined') {
  console.log('no output file designated');
  usage();
} else {
  var file = fs.readFileSync(inputFile, "utf8");

  var tokens = tokenizer(file);
  var tree = parser(tokens);
  var output = generator(tree.roots);
  output = 'var core = require("./core.js");\n' + output;

  fs.writeFileSync(outputFile, output);
  console.log('done!');
}
