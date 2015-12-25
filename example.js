"use strict";

var tokenizer = require('./tokenizer.js');
var parser = require('./parser.js');
var generator = require('./generator.js');

var fs = require('fs');

var example = '(defn avg (x y) ( / (+ x y ) 2)) (defn addOne (x) (+ x 1)) (print (avg (addOne 13) (addOne 22)))'

var tokens = tokenizer(example);
console.log('-- tokens --');
console.log(tokens);

var tree = parser(tokens);
console.log('\n\n-- tree -- ');
console.log(JSON.stringify(tree, null, 2));

var output = generator(tree.roots);
output = 'var core = require("./core.js");\n' + output;
console.log('\n\n-- interpreted output --');
console.log(output);

fs.writeFileSync('out.js', output);
console.log('\n\n-- written to out.js --');

console.log('\n\n-- evalulated result --');
eval(output);





