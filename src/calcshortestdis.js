import 'babel-polyfill';

export default function calcShortestDis(gAl, s) {
  var nn = gAl.length,
    disArray = new Array(nn),
    frontier = new Map([
      [s, 0]
    ]),
    i;

  for (i = 0; i < nn; i++) {
    disArray[i] = null;
  }

  while (frontier.size > 0) {
    // choose min
    var minKey = null,
      minDis = null;
    for (var [key, dis] of frontier) {
      if (minKey == null || dis < minDis) {
        minKey = key;
        minDis = dis;
      }
    }

    // set dis
    disArray[minKey] = minDis;

    // update frontier
    frontier.delete(minKey);
    for (i = 0; i < gAl[minKey].length; i++) {
      var nextKey = gAl[minKey][i][0],
        nextLen = gAl[minKey][i][1];

      if (disArray[nextKey] == null) {
        if (frontier.has(nextKey)) {
          frontier.set(nextKey, Math.min(frontier.get(nextKey), disArray[minKey] + nextLen));
        } else {
          frontier.set(nextKey, disArray[minKey] + nextLen);
        }
      }
    }
  }

  return disArray;
}
