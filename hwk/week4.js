var fs = require('fs'),
  path = require('path');
var aa1 = require('../dist/aa1.min');

let countSccSize = aa1.countSccSize;

console.log('reading data ...');
let dataFilePath = path.resolve(__dirname, '../data/SCC.txt'),
  edges = fs.readFileSync(dataFilePath, 'utf-8').trim().split(/\r?\n/).filter(row => row).map(row => {
    return row.trim().split(' ').map(item => parseInt(item, 10) - 1);
  }),
  nn = 0;

if (edges.length) {
  for (let i = 0; i < edges.length; i++) {
    nn = Math.max(nn, edges[i][0]);
    nn = Math.max(nn, edges[i][1]);
  }
  nn++;
}

let gAl = new Array(nn);
for (let i = 0; i < nn; i++) {
  gAl[i] = [];
}

for (let i = 0; i < edges.length; i++) {
  gAl[edges[i][0]].push(edges[i][1]);
}

console.log('counting scc ...');
let sizes = countSccSize(gAl);
sizes = sizes.slice(0, 5);
let sizesOut = [0, 0, 0, 0, 0];
for (let i = 0; i < sizes.length; i++) {
  sizesOut[i] = sizes[i];
}

console.log(sizesOut.join(','));
