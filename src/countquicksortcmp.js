function sortAndCount(a, beg, end, choosePivot) {
  if (end - beg <= 1) {
    return 0;
  }
  let pivot = choosePivot(a, beg, end),
    i = beg + 1,
    j = beg + 1,
    count = end - beg - 1;
  [a[beg], a[pivot]] = [a[pivot], a[beg]];
  while (j < end) {
    if (a[j] < a[beg]) {
      [a[j], a[i]] = [a[i], a[j]];
      i++;
    }
    j++;
  }
  [a[beg], a[i - 1]] = [a[i - 1], a[beg]];
  count += sortAndCount(a, beg, i - 1, choosePivot);
  count += sortAndCount(a, i, end, choosePivot);
  return count;
}

function genChoosePivot(strategy) {
  switch (strategy) {
    case 'first':
      return choosePivotFirst;
    case 'last':
      return choosePivotLast;
    case 'median':
      return choosePivotMedian;
    default:
      // do nothing
  }
}

function choosePivotFirst(a, beg, end) {
  return beg;
}

function choosePivotLast(a, beg, end) {
  return end - 1;
}

function choosePivotMedian(a, beg, end) {
  let mid = Math.floor((beg + end - 1) / 2),
    begLessThanMid = (a[beg] < a[mid]),
    begLessThanEnd = (a[beg] < a[end - 1]),
    midLessThanEnd = (a[mid] < a[end - 1]);
  if (begLessThanMid + begLessThanEnd === 1) {
    return beg;
  }
  if (!begLessThanMid + midLessThanEnd === 1) {
    return mid;
  }
  if (!begLessThanEnd + !midLessThanEnd === 1) {
    return end - 1;
  }
  // do nothing
}

export default function countQuickSortCmp(a, strategy) {
  let len = a.length;
  if (len) {
    let aCopied = a.slice(0),
      choosePivot = genChoosePivot(strategy);
    return sortAndCount(aCopied, 0, len, choosePivot);
  }
  return 0;
}
