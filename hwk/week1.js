var fs = require('fs'),
  path = require('path');
var aa1 = require('../dist/aa1.min');

let countInversion = aa1.countInversion;

let dataFilePath = path.resolve(__dirname, '../data/IntegerArray.txt'),
  data = fs.readFileSync(dataFilePath, 'utf-8').trim().split(/\r?\n/).map(x => parseInt(x, 10));
  
console.log(countInversion(data));
