function nxor(a, b) {
  return (a && b) || (!a && !b);
}

class MyHeap {
  constructor(maxSize, minHeap = true) {
    this._arr = new Array(maxSize);
    this._size = 0;
    this._minHeap = minHeap;
  }

  insert(x) {
    this._arr[this._size] = x;
    this._size++;
    this.siftUp();
  }

  removeTop() {
    this._arr[0] = this._arr[this._size - 1];
    this._size--;
    this.siftDown();
  }

  top() {
    return this._arr[0];
  }

  size() {
    return this._size;
  }

  siftUp() {
    var arr = this._arr,
      size = this._size,
      minHeap = this._minHeap,
      cur = size - 1,
      parent;

    while (cur > 0) {
      parent = Math.floor((cur - 1) / 2);
      if (nxor(arr[cur] < arr[parent], minHeap)) {
        [arr[parent], arr[cur]] = [arr[cur], arr[parent]];
        cur = parent;
      } else {
        break;
      }
    }
  }

  siftDown() {
    var arr = this._arr,
      size = this._size,
      minHeap = this._minHeap,
      cur = 0,
      left, right, sel;

    if (size === 0) {
      return;
    }

    for (;;) {
      sel = cur;
      left = cur * 2 + 1;
      right = cur * 2 + 2;
      if (left < size && nxor(arr[left] < arr[sel], minHeap)) {
        sel = left;
      }
      if (right < size && nxor(arr[right] < arr[sel], minHeap)) {
        sel = right;
      }
      if (sel !== cur) {
        [arr[sel], arr[cur]] = [arr[cur], arr[sel]];
        cur = sel;
      } else {
        break;
      }
    }
  }
}

class MyMedianMaintainer {
  constructor(maxSize) {
    var halfSize = Math.ceil(maxSize / 2) + 1;
    this._leftHeap = new MyHeap(halfSize, false);
    this._rightHeap = new MyHeap(halfSize, true);
  }

  insert(x) {
    var leftHeap = this._leftHeap,
      rightHeap = this._rightHeap;

    if (rightHeap.size() === 0 || rightHeap.top() > x) {
      leftHeap.insert(x);
      if (leftHeap.size() > rightHeap.size() + 1) {
        rightHeap.insert(leftHeap.top());
        leftHeap.removeTop();
      }
    } else {
      rightHeap.insert(x);
      if (rightHeap.size() > leftHeap.size() + 1) {
        leftHeap.insert(rightHeap.top());
        rightHeap.removeTop();
      }
    }
  }

  size() {
    return this._leftHeap.size() + this._rightHeap.size();
  }

  median() {
    var leftHeap = this._leftHeap,
      rightHeap = this._rightHeap;

    if (leftHeap.size() >= rightHeap.size()) {
      return leftHeap.top();
    } else {
      return rightHeap.top();
    }
  }
}

export default function calcMedianSum(arr) {
  var maintainer = new MyMedianMaintainer(arr.length),
    sum = 0,
    i;
  for (i = 0; i < arr.length; i++) {
    maintainer.insert(arr[i]);
    sum += maintainer.median();
  }
  return sum;
}
