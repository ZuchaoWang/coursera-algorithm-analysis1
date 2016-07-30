var fs = require('fs'),
  path = require('path');
var aa1 = require('../dist/aa1.min');

let countQuickSortCmp = aa1.countQuickSortCmp;

let dataFilePath = path.resolve(__dirname, '../data/QuickSort.txt'),
  data = fs.readFileSync(dataFilePath, 'utf-8').trim().split(/\r?\n/).map(x => parseInt(x, 10));

console.log(countQuickSortCmp(data, 'first'), countQuickSortCmp(data, 'last'), countQuickSortCmp(data, 'median'));
