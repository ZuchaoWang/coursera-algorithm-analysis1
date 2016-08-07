function inverse(gAl) {
  var nn = gAl.length,
    gAlInv = new Array(nn),
    i, j, k;
  for (i = 0; i < nn; i++) {
    gAlInv[i] = [];
  }
  for (i = 0; i < nn; i++) {
    for (j = 0; j < gAl[i].length; j++) {
      k = gAl[i][j];
      gAlInv[k].push(i);
    }
  }
  return gAlInv;
}

function preprocess(gAl) {
  var gAlInv = inverse(gAl),
    nn = gAlInv.length,
    order = new Array(nn),
    visited = new Array(nn),
    i;

  for (i = 0; i < nn; i++) {
    visited[i] = false;
  }

  var context = {
    gAl: gAlInv,
    order: order,
    visited: visited,
    nFin: 0
  };

  for (i = 0; i < nn; i++) {
    if (context.visited[i] === false) {
      dfsInPreprocess(context, i);
    }
  }

  return context.order.reverse();
}

function dfsInPreprocess(context, index) {
  var cur = index,
    offset = 0,
    stack = [],
    deeper,
    next;
  context.visited[cur] = true; // pre op
  for (;;) {
    deeper = false;
    while (offset < context.gAl[cur].length) { // recurse
      next = context.gAl[cur][offset]; // recurse
      if (context.visited[next] === false) { // recurse
        context.visited[next] = true; // pre op
        stack.push([cur, offset + 1]);
        deeper = true;
        cur = next;
        offset = 0;
        break;
      } else {
        offset++;
      }
    }

    if (deeper === false) {
      context.order[context.nFin] = cur; // post op
      context.nFin++; // post op
      if (stack.length) {
        [cur, offset] = stack.pop();
      } else {
        break;
      }
    }
  }
}

function makeLabels(gAl, order) {
  var nn = gAl.length,
    visited = new Array(nn),
    i, j;

  for (i = 0; i < nn; i++) {
    visited[i] = false;
  }

  var context = {
    gAl: gAl,
    order: order,
    visited: visited,
    labels: new Array(nn)
  };

  for (i = 0; i < nn; i++) {
    j = context.order[i];
    if (context.visited[j] === false) {
      dfsInMakeLabels(context, j, j);
    }
  }

  return context.labels;
}

function dfsInMakeLabels(context, index, label) {
  var cur = index,
    offset = 0,
    stack = [],
    deeper,
    next;

  context.visited[cur] = true;
  context.labels[cur] = label;
  for (;;) {
    deeper = false;
    while (offset < context.gAl[cur].length) {
      next = context.gAl[cur][offset];
      if (context.visited[next] === false) {
        stack.push([cur, offset + 1]);
        deeper = true;
        context.visited[next] = true;
        context.labels[next] = label;
        cur = next;
        offset = 0;
        break;
      } else {
        offset++;
      }
    }

    if (deeper === false) {
      if (stack.length) {
        [cur, offset] = stack.pop();
      } else {
        break;
      }
    }
  }
}

function getSize(labels) {
  var nn = labels.length,
    counter = {},
    i, label;
  for (i = 0; i < nn; i++) {
    label = labels[i];
    counter[label] = counter[label] ? counter[label] + 1 : 1;
  }

  var sizes = [];
  for (label in counter) {
    if ({}.hasOwnProperty.call(counter, label)) {
      sizes.push(counter[label]);
    }
  }

  sizes = sizes.sort((a, b) => b - a);
  return sizes;
}

export default function countSccSize(gAl) {
  var order = preprocess(gAl),
    labels = makeLabels(gAl, order),
    sizes = getSize(labels);
  return sizes;
}
