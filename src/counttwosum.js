import 'babel-polyfill';

export default countTwoSumByBinaryTree;

// function countTwoSumByHash(arr, first, last) {
//   var arrSet = new Set(arr),
//     arrUniq = Array.from(arrSet),
//     count = 0,
//     s, i, v;
//
//   for (s = first; s <= last; s++) {
//     for (i = 0; i <= arrUniq.length; i++) {
//       v = arrUniq[i];
//       if (s !== v * 2 && arrSet.has(s - v)) {
//         count++;
//         break;
//       }
//     }
//     console.log(s, count);
//   }
//
//   return count;
// }

function countTwoSumByBinaryTree(arr, first, last) {
  var arrSorted = Array.from(new Set(arr)).sort((a, b) => a - b),
    sumOK = new Array(last - first + 1),
    s, i, j, beg, end, v, u;

  for (s = first; s <= last; s++) {
    sumOK[s - first] = false;
  }

  for (i = 0; i < arrSorted.length; i++) {
    v = arrSorted[i];
    beg = binarySearch(arrSorted, first - v);
    end = binarySearch(arrSorted, last - v + 1);
    for (j = beg; j < end; j++) {
      u = arrSorted[j];
      if (u !== v) {
        s = v + u;
        sumOK[s - first] = true;
      }
    }
  }

  var count = 0;
  for (s = first; s <= last; s++) {
    if (sumOK[s - first]) {
      count++;
    }
  }
  return count;
}

function binarySearch(arr, x) {
  var beg = 0,
    end = arr.length;

  while (beg < end) {
    var mid = Math.floor((beg + end) / 2);
    if (x === arr[mid]) {
      return mid;
    } else if (x < arr[mid]) {
      end = mid;
    } else {
      beg = mid + 1;
    }
  }

  return beg;
}
