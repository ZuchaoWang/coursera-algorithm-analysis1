var fs = require('fs'),
  path = require('path');
var aa1 = require('../dist/aa1');

let calcMedianSum = aa1.calcMedianSum;

let dataFilePath = path.resolve(__dirname, '../data/Median.txt'),
  data = fs.readFileSync(dataFilePath, 'utf-8').trim().split(/\r?\n/).map(x => parseInt(x, 10));

console.log(calcMedianSum(data) % 10000);
