var core = require("./core.js");
var avg = function(x, y){
return core.divide(core.add(x, y), 2);
}
var addOne = function(x){
return core.add(x, 1);
}
core.print(avg(addOne(13), addOne(22)))