function sortAndCount(a, beg, end, buf) {
  if (end - beg <= 1) {
    return 0;
  } else if (end - beg == 2) {
    if (a[beg] <= a[beg + 1]) {
      return 0;
    } else {
      let tmp = a[beg];
      a[beg] = a[beg + 1];
      a[beg + 1] = tmp;
      return 1;
    }
  } else {
    let mid = Math.floor((beg + end) / 2),
      invLeft = sortAndCount(a, beg, mid, buf),
      invRight = sortAndCount(a, mid, end, buf),
      invSplit = mergeAndCount(a, beg, mid, end, buf);
    return invLeft + invRight + invSplit;
  }
}

function mergeAndCount(a, beg, mid, end, buf) {
  for (let i = beg; i < end; i++) {
    buf[i] = a[i];
  }
  let leftLen = mid - beg,
    rightLen = end - mid,
    len = end - beg,
    l = 0,
    r = 0,
    inv = 0;
  for (let i = 0; i < len; i++) {
    let useL = (r === rightLen) || (l !== leftLen && buf[beg + l] <= buf[mid + r]);
    if (useL) {
      a[beg + i] = buf[beg + l];
      l++;
      inv += r;
    } else {
      a[beg + i] = buf[mid + r];
      r++;
    }
  }
  return inv;
}

export default function countInversion(a) {
  let len = a.length;
  if (len) {
    let buf = new Array(len);
    return sortAndCount(a, 0, len, buf);
  } else {
    return 0;
  }
}
