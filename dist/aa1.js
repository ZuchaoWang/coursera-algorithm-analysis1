(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-polyfill"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-polyfill"], factory);
	else if(typeof exports === 'object')
		exports["aa1"] = factory(require("babel-polyfill"));
	else
		root["aa1"] = factory(root["babel-polyfill"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _countinversion = __webpack_require__(4);
	
	var _countinversion2 = _interopRequireDefault(_countinversion);
	
	var _countquicksortcmp = __webpack_require__(6);
	
	var _countquicksortcmp2 = _interopRequireDefault(_countquicksortcmp);
	
	var _countmincut = __webpack_require__(5);
	
	var _countmincut2 = _interopRequireDefault(_countmincut);
	
	var _countsccsize = __webpack_require__(7);
	
	var _countsccsize2 = _interopRequireDefault(_countsccsize);
	
	var _calcshortestdis = __webpack_require__(3);
	
	var _calcshortestdis2 = _interopRequireDefault(_calcshortestdis);
	
	var _counttwosum = __webpack_require__(8);
	
	var _counttwosum2 = _interopRequireDefault(_counttwosum);
	
	var _calcmediansum = __webpack_require__(2);
	
	var _calcmediansum2 = _interopRequireDefault(_calcmediansum);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  countInversion: _countinversion2.default,
	  countQuickSortCmp: _countquicksortcmp2.default,
	  countMinCut: _countmincut2.default,
	  countSccSize: _countsccsize2.default,
	  calcShortestDis: _calcshortestdis2.default,
	  countTwoSum: _counttwosum2.default,
	  calcMedianSum: _calcmediansum2.default
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = calcMedianSum;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function nxor(a, b) {
	  return a && b || !a && !b;
	}
	
	var MyHeap = function () {
	  function MyHeap(maxSize) {
	    var minHeap = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	    _classCallCheck(this, MyHeap);
	
	    this._arr = new Array(maxSize);
	    this._size = 0;
	    this._minHeap = minHeap;
	  }
	
	  _createClass(MyHeap, [{
	    key: "insert",
	    value: function insert(x) {
	      this._arr[this._size] = x;
	      this._size++;
	      this.siftUp();
	    }
	  }, {
	    key: "removeTop",
	    value: function removeTop() {
	      this._arr[0] = this._arr[this._size - 1];
	      this._size--;
	      this.siftDown();
	    }
	  }, {
	    key: "top",
	    value: function top() {
	      return this._arr[0];
	    }
	  }, {
	    key: "size",
	    value: function size() {
	      return this._size;
	    }
	  }, {
	    key: "siftUp",
	    value: function siftUp() {
	      var arr = this._arr,
	          size = this._size,
	          minHeap = this._minHeap,
	          cur = size - 1,
	          parent;
	
	      while (cur > 0) {
	        parent = Math.floor((cur - 1) / 2);
	        if (nxor(arr[cur] < arr[parent], minHeap)) {
	          var _ref = [arr[cur], arr[parent]];
	          arr[parent] = _ref[0];
	          arr[cur] = _ref[1];
	
	          cur = parent;
	        } else {
	          break;
	        }
	      }
	    }
	  }, {
	    key: "siftDown",
	    value: function siftDown() {
	      var arr = this._arr,
	          size = this._size,
	          minHeap = this._minHeap,
	          cur = 0,
	          left,
	          right,
	          sel;
	
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
	          var _ref2 = [arr[cur], arr[sel]];
	          arr[sel] = _ref2[0];
	          arr[cur] = _ref2[1];
	
	          cur = sel;
	        } else {
	          break;
	        }
	      }
	    }
	  }]);
	
	  return MyHeap;
	}();
	
	var MyMedianMaintainer = function () {
	  function MyMedianMaintainer(maxSize) {
	    _classCallCheck(this, MyMedianMaintainer);
	
	    var halfSize = Math.ceil(maxSize / 2) + 1;
	    this._leftHeap = new MyHeap(halfSize, false);
	    this._rightHeap = new MyHeap(halfSize, true);
	  }
	
	  _createClass(MyMedianMaintainer, [{
	    key: "insert",
	    value: function insert(x) {
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
	  }, {
	    key: "size",
	    value: function size() {
	      return this._leftHeap.size() + this._rightHeap.size();
	    }
	  }, {
	    key: "median",
	    value: function median() {
	      var leftHeap = this._leftHeap,
	          rightHeap = this._rightHeap;
	
	      if (leftHeap.size() >= rightHeap.size()) {
	        return leftHeap.top();
	      } else {
	        return rightHeap.top();
	      }
	    }
	  }]);
	
	  return MyMedianMaintainer;
	}();
	
	function calcMedianSum(arr) {
	  var maintainer = new MyMedianMaintainer(arr.length),
	      sum = 0,
	      i;
	  for (i = 0; i < arr.length; i++) {
	    maintainer.insert(arr[i]);
	    sum += maintainer.median();
	  }
	  return sum;
	}
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = calcShortestDis;
	
	__webpack_require__(1);
	
	function calcShortestDis(gAl, s) {
	  var nn = gAl.length,
	      disArray = new Array(nn),
	      frontier = new Map([[s, 0]]),
	      i;
	
	  for (i = 0; i < nn; i++) {
	    disArray[i] = null;
	  }
	
	  while (frontier.size > 0) {
	    // choose min
	    var minKey = null,
	        minDis = null;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = frontier[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var _step$value = _slicedToArray(_step.value, 2);
	
	        var key = _step$value[0];
	        var dis = _step$value[1];
	
	        if (minKey == null || dis < minDis) {
	          minKey = key;
	          minDis = dis;
	        }
	      }
	
	      // set dis
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
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
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = countInversion;
	function sortAndCount(a, beg, end, buf) {
	  if (end - beg <= 1) {
	    return 0;
	  } else if (end - beg === 2) {
	    if (a[beg] <= a[beg + 1]) {
	      return 0;
	    } else {
	      var tmp = a[beg];
	      a[beg] = a[beg + 1];
	      a[beg + 1] = tmp;
	      return 1;
	    }
	  } else {
	    var mid = Math.floor((beg + end) / 2),
	        invLeft = sortAndCount(a, beg, mid, buf),
	        invRight = sortAndCount(a, mid, end, buf),
	        invSplit = mergeAndCount(a, beg, mid, end, buf);
	    return invLeft + invRight + invSplit;
	  }
	}
	
	function mergeAndCount(a, beg, mid, end, buf) {
	  for (var i = beg; i < end; i++) {
	    buf[i] = a[i];
	  }
	  var leftLen = mid - beg,
	      rightLen = end - mid,
	      len = end - beg,
	      l = 0,
	      r = 0,
	      inv = 0;
	  for (var _i = 0; _i < len; _i++) {
	    var useL = r === rightLen || l !== leftLen && buf[beg + l] <= buf[mid + r];
	    if (useL) {
	      a[beg + _i] = buf[beg + l];
	      l++;
	      inv += r;
	    } else {
	      a[beg + _i] = buf[mid + r];
	      r++;
	    }
	  }
	  return inv;
	}
	
	function countInversion(a) {
	  var len = a.length;
	  if (len) {
	    var buf = new Array(len);
	    return sortAndCount(a, 0, len, buf);
	  } else {
	    return 0;
	  }
	}
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = countMinCut;
	function find(ufArr, i) {
	  if (ufArr[i].parent !== i) ufArr[i].parent = find(ufArr, ufArr[i].parent);
	
	  return ufArr[i].parent;
	}
	
	function union(ufArr, i, j) {
	  var iroot = find(ufArr, i),
	      jroot = find(ufArr, j);
	
	  if (ufArr[iroot].rank < ufArr[jroot].rank) ufArr[iroot].parent = jroot;else if (ufArr[iroot].rank > ufArr[jroot].rank) ufArr[jroot].parent = iroot;else {
	    ufArr[jroot].parent = iroot;
	    ufArr[iroot].rank++;
	  }
	}
	
	function adjacencyList2EdgeList(gAl) {
	  var gEl = [];
	  for (var i = 0; i < gAl.length; i++) {
	    for (var j = 0; j < gAl[i].length; j++) {
	      if (i < gAl[i][j]) {
	        gEl.push([i, gAl[i][j]]);
	      }
	    }
	  }
	  return gEl;
	}
	
	function countMinCutOnce(vn, gEl) {
	  var ufArr = new Array(vn);
	  for (var i = 0; i < vn; i++) {
	    ufArr[i] = {
	      rank: 0,
	      parent: i
	    };
	  }
	
	  var vLeft = vn,
	      eLeft = gEl.length;
	
	  while (vLeft > 2 && eLeft > 0) {
	    var eSel = Math.floor(Math.random() * eLeft),
	        src = find(ufArr, gEl[eSel][0]),
	        dst = find(ufArr, gEl[eSel][1]);
	
	    if (src !== dst) {
	      union(ufArr, src, dst);
	      vLeft--;
	    }
	
	    var _ref = [gEl[eLeft - 1], gEl[eSel]];
	    gEl[eSel] = _ref[0];
	    gEl[eLeft - 1] = _ref[1];
	
	    eLeft--;
	  }
	
	  var eCross = 0;
	  for (var _i = 0; _i < eLeft; _i++) {
	    var _src = find(ufArr, gEl[_i][0]),
	        _dst = find(ufArr, gEl[_i][1]);
	
	    if (_src !== _dst) {
	      eCross++;
	    }
	  }
	
	  return eCross;
	}
	
	function defaultRepeat(n) {
	  return Math.ceil(n * n * Math.log(n + 1));
	}
	
	function countMinCut(gAl) {
	  var repeat = arguments.length <= 1 || arguments[1] === undefined ? defaultRepeat(gAl.length) : arguments[1];
	
	  var vn = gAl.length,
	      gEl = adjacencyList2EdgeList(gAl),
	      minCount = countMinCutOnce(vn, gEl);
	
	  for (var i = 1; i < repeat; i++) {
	    minCount = Math.min(minCount, countMinCutOnce(vn, gEl));
	  }
	  return minCount;
	}
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = countQuickSortCmp;
	function sortAndCount(a, beg, end, choosePivot) {
	  if (end - beg <= 1) {
	    return 0;
	  }
	  var pivot = choosePivot(a, beg, end),
	      i = beg + 1,
	      j = beg + 1,
	      count = end - beg - 1;
	  var _ref = [a[pivot], a[beg]];
	  a[beg] = _ref[0];
	  a[pivot] = _ref[1];
	
	  while (j < end) {
	    if (a[j] < a[beg]) {
	      var _ref2 = [a[i], a[j]];
	      a[j] = _ref2[0];
	      a[i] = _ref2[1];
	
	      i++;
	    }
	    j++;
	  }
	  var _ref3 = [a[i - 1], a[beg]];
	  a[beg] = _ref3[0];
	  a[i - 1] = _ref3[1];
	
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
	  var mid = Math.floor((beg + end - 1) / 2),
	      begLessThanMid = a[beg] < a[mid],
	      begLessThanEnd = a[beg] < a[end - 1],
	      midLessThanEnd = a[mid] < a[end - 1];
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
	
	function countQuickSortCmp(a, strategy) {
	  var len = a.length;
	  if (len) {
	    var aCopied = a.slice(0),
	        choosePivot = genChoosePivot(strategy);
	    return sortAndCount(aCopied, 0, len, choosePivot);
	  }
	  return 0;
	}
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = countSccSize;
	function inverse(gAl) {
	  var nn = gAl.length,
	      gAlInv = new Array(nn),
	      i,
	      j,
	      k;
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
	    while (offset < context.gAl[cur].length) {
	      // recurse
	      next = context.gAl[cur][offset]; // recurse
	      if (context.visited[next] === false) {
	        // recurse
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
	        var _stack$pop = stack.pop();
	
	        var _stack$pop2 = _slicedToArray(_stack$pop, 2);
	
	        cur = _stack$pop2[0];
	        offset = _stack$pop2[1];
	      } else {
	        break;
	      }
	    }
	  }
	}
	
	function makeLabels(gAl, order) {
	  var nn = gAl.length,
	      visited = new Array(nn),
	      i,
	      j;
	
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
	        var _stack$pop3 = stack.pop();
	
	        var _stack$pop4 = _slicedToArray(_stack$pop3, 2);
	
	        cur = _stack$pop4[0];
	        offset = _stack$pop4[1];
	      } else {
	        break;
	      }
	    }
	  }
	}
	
	function getSize(labels) {
	  var nn = labels.length,
	      counter = {},
	      i,
	      label;
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
	
	  sizes = sizes.sort(function (a, b) {
	    return b - a;
	  });
	  return sizes;
	}
	
	function countSccSize(gAl) {
	  var order = preprocess(gAl),
	      labels = makeLabels(gAl, order),
	      sizes = getSize(labels);
	  return sizes;
	}
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(1);
	
	exports.default = countTwoSumByBinaryTree;
	
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
	  var arrSorted = Array.from(new Set(arr)).sort(function (a, b) {
	    return a - b;
	  }),
	      sumOK = new Array(last - first + 1),
	      s,
	      i,
	      j,
	      beg,
	      end,
	      v,
	      u;
	
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
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=aa1.js.map