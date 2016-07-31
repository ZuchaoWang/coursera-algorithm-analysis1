function find(ufArr, i) {
  if (ufArr[i].parent != i)
    ufArr[i].parent = find(ufArr, ufArr[i].parent);

  return ufArr[i].parent;
}

function union(ufArr, i, j) {
  let iroot = find(ufArr, i),
    jroot = find(ufArr, j);

  if (ufArr[iroot].rank < ufArr[jroot].rank)
    ufArr[iroot].parent = jroot;
  else if (ufArr[iroot].rank > ufArr[jroot].rank)
    ufArr[jroot].parent = iroot;

  else {
    ufArr[jroot].parent = iroot;
    ufArr[iroot].rank++;
  }
}

function adjacencyList2EdgeList(gAl) {
  let gEl = [];
  for (let i = 0; i < gAl.length; i++) {
    for (let j = 0; j < gAl[i].length; j++) {
      if (i < gAl[i][j]) {
        gEl.push([i, gAl[i][j]])
      }
    }
  }
  return gEl;
}

function countMinCutOnce(vn, gEl) {
  let ufArr = new Array(vn);
  for (let i = 0; i < vn; i++) {
    ufArr[i] = {
      rank: 0,
      parent: i
    };
  }

  let vLeft = vn,
    eLeft = gEl.length;

  while (vLeft > 2 && eLeft > 0) {
    let eSel = Math.floor(Math.random() * eLeft),
      src = find(ufArr, gEl[eSel][0]),
      dst = find(ufArr, gEl[eSel][1]);

    if (src !== dst) {
      union(ufArr, src, dst);
      vLeft--;
    }

    [gEl[eSel], gEl[eLeft-1]] = [gEl[eLeft-1], gEl[eSel]]
    eLeft--;
  }

  let eCross = 0;
  for (let i = 0; i < eLeft; i++) {
    let src = find(ufArr, gEl[i][0]),
      dst = find(ufArr, gEl[i][1]);

    if (src !== dst) {
      eCross++;
    }
  }

  return eCross;
}

export default function countMinCut(gAl, repeat = gAl.length * gAl.length * Math.log(gAl.length + 1)) {
  let vn = gAl.length,
    gEl = adjacencyList2EdgeList(gAl),
    minCount = countMinCutOnce(vn, gEl);

  for (let i = 1; i < repeat; i++) {
    minCount = Math.min(minCount, countMinCutOnce(vn, gEl));
  }
  return minCount;
}
