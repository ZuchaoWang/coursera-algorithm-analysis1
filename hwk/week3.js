var fs = require('fs'),
  path = require('path');
var aa1 = require('../dist/aa1.min');

let countMinCut = aa1.countMinCut;

let dataFilePath = path.resolve(__dirname, '../data/KargerMinCut.txt'),
  data = fs.readFileSync(dataFilePath, 'utf-8').trim().split(/\r?\n/).filter(row => row).map(row => {
    return row.trim().split('\t').slice(1).map(item => parseInt(item, 10) - 1);
  }),
  repeat = (data.length > 0) ? Math.ceil(data.length * data.length * Math.log(data.length)) : 1;

console.log(`karger's min cut with ${repeat} repeats`);
console.log(`this will take a while to run ...`);
console.log(countMinCut(data, repeat));
