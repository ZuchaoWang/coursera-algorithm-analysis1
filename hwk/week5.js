var fs = require('fs'),
  path = require('path');
var aa1 = require('../dist/aa1');

let calcShortestDis = aa1.calcShortestDis;

let dataFilePath = path.resolve(__dirname, '../data/DijkstraData.txt'),
  gAl = fs.readFileSync(dataFilePath, 'utf-8').trim().split(/\r?\n/).filter(row => row).map(row => {
    return row.trim().split('\t').slice(1).map(tuple => {
      tuple = tuple.split(',');
      return [parseInt(tuple[0], 10) - 1, parseInt(tuple[1], 10)];
    });
  });

let disArray = calcShortestDis(gAl, 1 - 1),
  ansArray = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197].map(index => {
    var d = disArray[index - 1];
    if (d == null) {
      d = 1000000;
    }
    return d;
  });

console.log(ansArray.join(','));
