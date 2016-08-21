var fs = require('fs'),
  path = require('path');
var aa1 = require('../dist/aa1');

let countTwoSum = aa1.countTwoSum;

let dataFilePath = path.resolve(__dirname, '../data/TwoSum.txt'),
  data = fs.readFileSync(dataFilePath, 'utf-8').trim().split(/\r?\n/).map(x => parseInt(x, 10));

console.log(countTwoSum(data, -10000, 10000));
