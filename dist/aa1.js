(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["aa1"] = factory();
	else
		root["aa1"] = factory();
})(this, function() {
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
	
	var _countinversion = __webpack_require__(1);
	
	var _countinversion2 = _interopRequireDefault(_countinversion);
	
	var _countquicksortcmp = __webpack_require__(3);
	
	var _countquicksortcmp2 = _interopRequireDefault(_countquicksortcmp);
	
	var _countmincut = __webpack_require__(2);
	
	var _countmincut2 = _interopRequireDefault(_countmincut);
	
	var _countsccsize = __webpack_require__(4);
	
	var _countsccsize2 = _interopRequireDefault(_countsccsize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  countInversion: _countinversion2.default,
	  countQuickSortCmp: _countquicksortcmp2.default,
	  countMinCut: _countmincut2.default,
	  countSccSize: _countsccsize2.default
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1ZDNhYWYyNzQ4ZGRhOWE1ZDIzYyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdW50aW52ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3VudG1pbmN1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRxdWlja3NvcnRjbXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdW50c2Njc2l6ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzttQkFFZTtBQUNiLDJDQURhO0FBRWIsaURBRmE7QUFHYixxQ0FIYTtBQUliO0FBSmEsRTs7Ozs7Ozs7Ozs7O21CQ3dDUyxjO0FBN0N4QixVQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsRUFBbUMsR0FBbkMsRUFBd0M7QUFDdEMsT0FBSSxNQUFNLEdBQU4sSUFBYSxDQUFqQixFQUFvQjtBQUNsQixZQUFPLENBQVA7QUFDRCxJQUZELE1BRU8sSUFBSSxNQUFNLEdBQU4sS0FBYyxDQUFsQixFQUFxQjtBQUMxQixTQUFJLEVBQUUsR0FBRixLQUFVLEVBQUUsTUFBTSxDQUFSLENBQWQsRUFBMEI7QUFDeEIsY0FBTyxDQUFQO0FBQ0QsTUFGRCxNQUVPO0FBQ0wsV0FBSSxNQUFNLEVBQUUsR0FBRixDQUFWO0FBQ0EsU0FBRSxHQUFGLElBQVMsRUFBRSxNQUFNLENBQVIsQ0FBVDtBQUNBLFNBQUUsTUFBTSxDQUFSLElBQWEsR0FBYjtBQUNBLGNBQU8sQ0FBUDtBQUNEO0FBQ0YsSUFUTSxNQVNBO0FBQ0wsU0FBSSxNQUFNLEtBQUssS0FBTCxDQUFXLENBQUMsTUFBTSxHQUFQLElBQWMsQ0FBekIsQ0FBVjtBQUFBLFNBQ0UsVUFBVSxhQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsQ0FEWjtBQUFBLFNBRUUsV0FBVyxhQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsQ0FGYjtBQUFBLFNBR0UsV0FBVyxjQUFjLENBQWQsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsQ0FIYjtBQUlBLFlBQU8sVUFBVSxRQUFWLEdBQXFCLFFBQTVCO0FBQ0Q7QUFDRjs7QUFFRCxVQUFTLGFBQVQsQ0FBdUIsQ0FBdkIsRUFBMEIsR0FBMUIsRUFBK0IsR0FBL0IsRUFBb0MsR0FBcEMsRUFBeUMsR0FBekMsRUFBOEM7QUFDNUMsUUFBSyxJQUFJLElBQUksR0FBYixFQUFrQixJQUFJLEdBQXRCLEVBQTJCLEdBQTNCLEVBQWdDO0FBQzlCLFNBQUksQ0FBSixJQUFTLEVBQUUsQ0FBRixDQUFUO0FBQ0Q7QUFDRCxPQUFJLFVBQVUsTUFBTSxHQUFwQjtBQUFBLE9BQ0UsV0FBVyxNQUFNLEdBRG5CO0FBQUEsT0FFRSxNQUFNLE1BQU0sR0FGZDtBQUFBLE9BR0UsSUFBSSxDQUhOO0FBQUEsT0FJRSxJQUFJLENBSk47QUFBQSxPQUtFLE1BQU0sQ0FMUjtBQU1BLFFBQUssSUFBSSxLQUFJLENBQWIsRUFBZ0IsS0FBSSxHQUFwQixFQUF5QixJQUF6QixFQUE4QjtBQUM1QixTQUFJLE9BQVEsTUFBTSxRQUFQLElBQXFCLE1BQU0sT0FBTixJQUFpQixJQUFJLE1BQU0sQ0FBVixLQUFnQixJQUFJLE1BQU0sQ0FBVixDQUFqRTtBQUNBLFNBQUksSUFBSixFQUFVO0FBQ1IsU0FBRSxNQUFNLEVBQVIsSUFBYSxJQUFJLE1BQU0sQ0FBVixDQUFiO0FBQ0E7QUFDQSxjQUFPLENBQVA7QUFDRCxNQUpELE1BSU87QUFDTCxTQUFFLE1BQU0sRUFBUixJQUFhLElBQUksTUFBTSxDQUFWLENBQWI7QUFDQTtBQUNEO0FBQ0Y7QUFDRCxVQUFPLEdBQVA7QUFDRDs7QUFFYyxVQUFTLGNBQVQsQ0FBd0IsQ0FBeEIsRUFBMkI7QUFDeEMsT0FBSSxNQUFNLEVBQUUsTUFBWjtBQUNBLE9BQUksR0FBSixFQUFTO0FBQ1AsU0FBSSxNQUFNLElBQUksS0FBSixDQUFVLEdBQVYsQ0FBVjtBQUNBLFlBQU8sYUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEdBQW5CLEVBQXdCLEdBQXhCLENBQVA7QUFDRCxJQUhELE1BR087QUFDTCxZQUFPLENBQVA7QUFDRDtBQUNGOzs7Ozs7Ozs7Ozs7bUJDd0J1QixXO0FBN0V4QixVQUFTLElBQVQsQ0FBYyxLQUFkLEVBQXFCLENBQXJCLEVBQXdCO0FBQ3RCLE9BQUksTUFBTSxDQUFOLEVBQVMsTUFBVCxLQUFvQixDQUF4QixFQUNFLE1BQU0sQ0FBTixFQUFTLE1BQVQsR0FBa0IsS0FBSyxLQUFMLEVBQVksTUFBTSxDQUFOLEVBQVMsTUFBckIsQ0FBbEI7O0FBRUYsVUFBTyxNQUFNLENBQU4sRUFBUyxNQUFoQjtBQUNEOztBQUVELFVBQVMsS0FBVCxDQUFlLEtBQWYsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEI7QUFDMUIsT0FBSSxRQUFRLEtBQUssS0FBTCxFQUFZLENBQVosQ0FBWjtBQUFBLE9BQ0UsUUFBUSxLQUFLLEtBQUwsRUFBWSxDQUFaLENBRFY7O0FBR0EsT0FBSSxNQUFNLEtBQU4sRUFBYSxJQUFiLEdBQW9CLE1BQU0sS0FBTixFQUFhLElBQXJDLEVBQ0UsTUFBTSxLQUFOLEVBQWEsTUFBYixHQUFzQixLQUF0QixDQURGLEtBRUssSUFBSSxNQUFNLEtBQU4sRUFBYSxJQUFiLEdBQW9CLE1BQU0sS0FBTixFQUFhLElBQXJDLEVBQ0gsTUFBTSxLQUFOLEVBQWEsTUFBYixHQUFzQixLQUF0QixDQURHLEtBR0E7QUFDSCxXQUFNLEtBQU4sRUFBYSxNQUFiLEdBQXNCLEtBQXRCO0FBQ0EsV0FBTSxLQUFOLEVBQWEsSUFBYjtBQUNEO0FBQ0Y7O0FBRUQsVUFBUyxzQkFBVCxDQUFnQyxHQUFoQyxFQUFxQztBQUNuQyxPQUFJLE1BQU0sRUFBVjtBQUNBLFFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxJQUFJLE1BQXhCLEVBQWdDLEdBQWhDLEVBQXFDO0FBQ25DLFVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxJQUFJLENBQUosRUFBTyxNQUEzQixFQUFtQyxHQUFuQyxFQUF3QztBQUN0QyxXQUFJLElBQUksSUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUFSLEVBQW1CO0FBQ2pCLGFBQUksSUFBSixDQUFTLENBQUMsQ0FBRCxFQUFJLElBQUksQ0FBSixFQUFPLENBQVAsQ0FBSixDQUFUO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsVUFBTyxHQUFQO0FBQ0Q7O0FBRUQsVUFBUyxlQUFULENBQXlCLEVBQXpCLEVBQTZCLEdBQTdCLEVBQWtDO0FBQ2hDLE9BQUksUUFBUSxJQUFJLEtBQUosQ0FBVSxFQUFWLENBQVo7QUFDQSxRQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksRUFBcEIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDM0IsV0FBTSxDQUFOLElBQVc7QUFDVCxhQUFNLENBREc7QUFFVCxlQUFRO0FBRkMsTUFBWDtBQUlEOztBQUVELE9BQUksUUFBUSxFQUFaO0FBQUEsT0FDRSxRQUFRLElBQUksTUFEZDs7QUFHQSxVQUFPLFFBQVEsQ0FBUixJQUFhLFFBQVEsQ0FBNUIsRUFBK0I7QUFDN0IsU0FBSSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixLQUEzQixDQUFYO0FBQUEsU0FDRSxNQUFNLEtBQUssS0FBTCxFQUFZLElBQUksSUFBSixFQUFVLENBQVYsQ0FBWixDQURSO0FBQUEsU0FFRSxNQUFNLEtBQUssS0FBTCxFQUFZLElBQUksSUFBSixFQUFVLENBQVYsQ0FBWixDQUZSOztBQUlBLFNBQUksUUFBUSxHQUFaLEVBQWlCO0FBQ2YsYUFBTSxLQUFOLEVBQWEsR0FBYixFQUFrQixHQUFsQjtBQUNBO0FBQ0Q7O0FBUjRCLGdCQVVDLENBQUMsSUFBSSxRQUFRLENBQVosQ0FBRCxFQUFpQixJQUFJLElBQUosQ0FBakIsQ0FWRDtBQVU1QixTQUFJLElBQUosQ0FWNEI7QUFVakIsU0FBSSxRQUFRLENBQVosQ0FWaUI7O0FBVzdCO0FBQ0Q7O0FBRUQsT0FBSSxTQUFTLENBQWI7QUFDQSxRQUFLLElBQUksS0FBSSxDQUFiLEVBQWdCLEtBQUksS0FBcEIsRUFBMkIsSUFBM0IsRUFBZ0M7QUFDOUIsU0FBSSxPQUFNLEtBQUssS0FBTCxFQUFZLElBQUksRUFBSixFQUFPLENBQVAsQ0FBWixDQUFWO0FBQUEsU0FDRSxPQUFNLEtBQUssS0FBTCxFQUFZLElBQUksRUFBSixFQUFPLENBQVAsQ0FBWixDQURSOztBQUdBLFNBQUksU0FBUSxJQUFaLEVBQWlCO0FBQ2Y7QUFDRDtBQUNGOztBQUVELFVBQU8sTUFBUDtBQUNEOztBQUVELFVBQVMsYUFBVCxDQUF1QixDQUF2QixFQUEwQjtBQUN4QixVQUFPLEtBQUssSUFBTCxDQUFVLElBQUksQ0FBSixHQUFRLEtBQUssR0FBTCxDQUFTLElBQUksQ0FBYixDQUFsQixDQUFQO0FBQ0Q7O0FBRWMsVUFBUyxXQUFULENBQXFCLEdBQXJCLEVBQThEO0FBQUEsT0FBcEMsTUFBb0MseURBQTNCLGNBQWMsSUFBSSxNQUFsQixDQUEyQjs7QUFDM0UsT0FBSSxLQUFLLElBQUksTUFBYjtBQUFBLE9BQ0UsTUFBTSx1QkFBdUIsR0FBdkIsQ0FEUjtBQUFBLE9BRUUsV0FBVyxnQkFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsQ0FGYjs7QUFJQSxRQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBcEIsRUFBNEIsR0FBNUIsRUFBaUM7QUFDL0IsZ0JBQVcsS0FBSyxHQUFMLENBQVMsUUFBVCxFQUFtQixnQkFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsQ0FBbkIsQ0FBWDtBQUNEO0FBQ0QsVUFBTyxRQUFQO0FBQ0Q7Ozs7Ozs7Ozs7OzttQkMxQnVCLGlCO0FBNUR4QixVQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsRUFBbUMsV0FBbkMsRUFBZ0Q7QUFDOUMsT0FBSSxNQUFNLEdBQU4sSUFBYSxDQUFqQixFQUFvQjtBQUNsQixZQUFPLENBQVA7QUFDRDtBQUNELE9BQUksUUFBUSxZQUFZLENBQVosRUFBZSxHQUFmLEVBQW9CLEdBQXBCLENBQVo7QUFBQSxPQUNFLElBQUksTUFBTSxDQURaO0FBQUEsT0FFRSxJQUFJLE1BQU0sQ0FGWjtBQUFBLE9BR0UsUUFBUSxNQUFNLEdBQU4sR0FBWSxDQUh0QjtBQUo4QyxjQVF6QixDQUFDLEVBQUUsS0FBRixDQUFELEVBQVcsRUFBRSxHQUFGLENBQVgsQ0FSeUI7QUFRN0MsS0FBRSxHQUFGLENBUjZDO0FBUXJDLEtBQUUsS0FBRixDQVJxQzs7QUFTOUMsVUFBTyxJQUFJLEdBQVgsRUFBZ0I7QUFDZCxTQUFJLEVBQUUsQ0FBRixJQUFPLEVBQUUsR0FBRixDQUFYLEVBQW1CO0FBQUEsbUJBQ0YsQ0FBQyxFQUFFLENBQUYsQ0FBRCxFQUFPLEVBQUUsQ0FBRixDQUFQLENBREU7QUFDaEIsU0FBRSxDQUFGLENBRGdCO0FBQ1YsU0FBRSxDQUFGLENBRFU7O0FBRWpCO0FBQ0Q7QUFDRDtBQUNEO0FBZjZDLGVBZ0J6QixDQUFDLEVBQUUsSUFBSSxDQUFOLENBQUQsRUFBVyxFQUFFLEdBQUYsQ0FBWCxDQWhCeUI7QUFnQjdDLEtBQUUsR0FBRixDQWhCNkM7QUFnQnJDLEtBQUUsSUFBSSxDQUFOLENBaEJxQzs7QUFpQjlDLFlBQVMsYUFBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCLElBQUksQ0FBekIsRUFBNEIsV0FBNUIsQ0FBVDtBQUNBLFlBQVMsYUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEdBQW5CLEVBQXdCLFdBQXhCLENBQVQ7QUFDQSxVQUFPLEtBQVA7QUFDRDs7QUFFRCxVQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0M7QUFDaEMsV0FBUSxRQUFSO0FBQ0UsVUFBSyxPQUFMO0FBQ0UsY0FBTyxnQkFBUDtBQUNGLFVBQUssTUFBTDtBQUNFLGNBQU8sZUFBUDtBQUNGLFVBQUssUUFBTDtBQUNFLGNBQU8saUJBQVA7QUFDRjtBQUNFO0FBUko7QUFVRDs7QUFFRCxVQUFTLGdCQUFULENBQTBCLENBQTFCLEVBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQ3JDLFVBQU8sR0FBUDtBQUNEOztBQUVELFVBQVMsZUFBVCxDQUF5QixDQUF6QixFQUE0QixHQUE1QixFQUFpQyxHQUFqQyxFQUFzQztBQUNwQyxVQUFPLE1BQU0sQ0FBYjtBQUNEOztBQUVELFVBQVMsaUJBQVQsQ0FBMkIsQ0FBM0IsRUFBOEIsR0FBOUIsRUFBbUMsR0FBbkMsRUFBd0M7QUFDdEMsT0FBSSxNQUFNLEtBQUssS0FBTCxDQUFXLENBQUMsTUFBTSxHQUFOLEdBQVksQ0FBYixJQUFrQixDQUE3QixDQUFWO0FBQUEsT0FDRSxpQkFBa0IsRUFBRSxHQUFGLElBQVMsRUFBRSxHQUFGLENBRDdCO0FBQUEsT0FFRSxpQkFBa0IsRUFBRSxHQUFGLElBQVMsRUFBRSxNQUFNLENBQVIsQ0FGN0I7QUFBQSxPQUdFLGlCQUFrQixFQUFFLEdBQUYsSUFBUyxFQUFFLE1BQU0sQ0FBUixDQUg3QjtBQUlBLE9BQUksaUJBQWlCLGNBQWpCLEtBQW9DLENBQXhDLEVBQTJDO0FBQ3pDLFlBQU8sR0FBUDtBQUNEO0FBQ0QsT0FBSSxDQUFDLGNBQUQsR0FBa0IsY0FBbEIsS0FBcUMsQ0FBekMsRUFBNEM7QUFDMUMsWUFBTyxHQUFQO0FBQ0Q7QUFDRCxPQUFJLENBQUMsY0FBRCxHQUFrQixDQUFDLGNBQW5CLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLFlBQU8sTUFBTSxDQUFiO0FBQ0Q7QUFDRDtBQUNEOztBQUVjLFVBQVMsaUJBQVQsQ0FBMkIsQ0FBM0IsRUFBOEIsUUFBOUIsRUFBd0M7QUFDckQsT0FBSSxNQUFNLEVBQUUsTUFBWjtBQUNBLE9BQUksR0FBSixFQUFTO0FBQ1AsU0FBSSxVQUFVLEVBQUUsS0FBRixDQUFRLENBQVIsQ0FBZDtBQUFBLFNBQ0UsY0FBYyxlQUFlLFFBQWYsQ0FEaEI7QUFFQSxZQUFPLGFBQWEsT0FBYixFQUFzQixDQUF0QixFQUF5QixHQUF6QixFQUE4QixXQUE5QixDQUFQO0FBQ0Q7QUFDRCxVQUFPLENBQVA7QUFDRDs7Ozs7Ozs7Ozs7Ozs7O21CQzRGdUIsWTtBQWhLeEIsVUFBUyxPQUFULENBQWlCLEdBQWpCLEVBQXNCO0FBQ3BCLE9BQUksS0FBSyxJQUFJLE1BQWI7QUFBQSxPQUNFLFNBQVMsSUFBSSxLQUFKLENBQVUsRUFBVixDQURYO0FBQUEsT0FFRSxDQUZGO0FBQUEsT0FFSyxDQUZMO0FBQUEsT0FFUSxDQUZSO0FBR0EsUUFBSyxJQUFJLENBQVQsRUFBWSxJQUFJLEVBQWhCLEVBQW9CLEdBQXBCLEVBQXlCO0FBQ3ZCLFlBQU8sQ0FBUCxJQUFZLEVBQVo7QUFDRDtBQUNELFFBQUssSUFBSSxDQUFULEVBQVksSUFBSSxFQUFoQixFQUFvQixHQUFwQixFQUF5QjtBQUN2QixVQUFLLElBQUksQ0FBVCxFQUFZLElBQUksSUFBSSxDQUFKLEVBQU8sTUFBdkIsRUFBK0IsR0FBL0IsRUFBb0M7QUFDbEMsV0FBSSxJQUFJLENBQUosRUFBTyxDQUFQLENBQUo7QUFDQSxjQUFPLENBQVAsRUFBVSxJQUFWLENBQWUsQ0FBZjtBQUNEO0FBQ0Y7QUFDRCxVQUFPLE1BQVA7QUFDRDs7QUFFRCxVQUFTLFVBQVQsQ0FBb0IsR0FBcEIsRUFBeUI7QUFDdkIsT0FBSSxTQUFTLFFBQVEsR0FBUixDQUFiO0FBQUEsT0FDRSxLQUFLLE9BQU8sTUFEZDtBQUFBLE9BRUUsUUFBUSxJQUFJLEtBQUosQ0FBVSxFQUFWLENBRlY7QUFBQSxPQUdFLFVBQVUsSUFBSSxLQUFKLENBQVUsRUFBVixDQUhaO0FBQUEsT0FJRSxDQUpGOztBQU1BLFFBQUssSUFBSSxDQUFULEVBQVksSUFBSSxFQUFoQixFQUFvQixHQUFwQixFQUF5QjtBQUN2QixhQUFRLENBQVIsSUFBYSxLQUFiO0FBQ0Q7O0FBRUQsT0FBSSxVQUFVO0FBQ1osVUFBSyxNQURPO0FBRVosWUFBTyxLQUZLO0FBR1osY0FBUyxPQUhHO0FBSVosV0FBTTtBQUpNLElBQWQ7O0FBT0EsUUFBSyxJQUFJLENBQVQsRUFBWSxJQUFJLEVBQWhCLEVBQW9CLEdBQXBCLEVBQXlCO0FBQ3ZCLFNBQUksUUFBUSxPQUFSLENBQWdCLENBQWhCLE1BQXVCLEtBQTNCLEVBQWtDO0FBQ2hDLHVCQUFnQixPQUFoQixFQUF5QixDQUF6QjtBQUNEO0FBQ0Y7O0FBRUQsVUFBTyxRQUFRLEtBQVIsQ0FBYyxPQUFkLEVBQVA7QUFDRDs7QUFFRCxVQUFTLGVBQVQsQ0FBeUIsT0FBekIsRUFBa0MsS0FBbEMsRUFBeUM7QUFDdkMsT0FBSSxNQUFNLEtBQVY7QUFBQSxPQUNFLFNBQVMsQ0FEWDtBQUFBLE9BRUUsUUFBUSxFQUZWO0FBQUEsT0FHRSxNQUhGO0FBQUEsT0FJRSxJQUpGO0FBS0EsV0FBUSxPQUFSLENBQWdCLEdBQWhCLElBQXVCLElBQXZCLENBTnVDLENBTVY7QUFDN0IsWUFBUztBQUNQLGNBQVMsS0FBVDtBQUNBLFlBQU8sU0FBUyxRQUFRLEdBQVIsQ0FBWSxHQUFaLEVBQWlCLE1BQWpDLEVBQXlDO0FBQUU7QUFDekMsY0FBTyxRQUFRLEdBQVIsQ0FBWSxHQUFaLEVBQWlCLE1BQWpCLENBQVAsQ0FEdUMsQ0FDTjtBQUNqQyxXQUFJLFFBQVEsT0FBUixDQUFnQixJQUFoQixNQUEwQixLQUE5QixFQUFxQztBQUFFO0FBQ3JDLGlCQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsSUFBd0IsSUFBeEIsQ0FEbUMsQ0FDTDtBQUM5QixlQUFNLElBQU4sQ0FBVyxDQUFDLEdBQUQsRUFBTSxTQUFTLENBQWYsQ0FBWDtBQUNBLGtCQUFTLElBQVQ7QUFDQSxlQUFNLElBQU47QUFDQSxrQkFBUyxDQUFUO0FBQ0E7QUFDRCxRQVBELE1BT087QUFDTDtBQUNEO0FBQ0Y7O0FBRUQsU0FBSSxXQUFXLEtBQWYsRUFBc0I7QUFDcEIsZUFBUSxLQUFSLENBQWMsUUFBUSxJQUF0QixJQUE4QixHQUE5QixDQURvQixDQUNlO0FBQ25DLGVBQVEsSUFBUixHQUZvQixDQUVKO0FBQ2hCLFdBQUksTUFBTSxNQUFWLEVBQWtCO0FBQUEsMEJBQ0EsTUFBTSxHQUFOLEVBREE7O0FBQUE7O0FBQ2YsWUFEZTtBQUNWLGVBRFU7QUFFakIsUUFGRCxNQUVPO0FBQ0w7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxVQUFTLFVBQVQsQ0FBb0IsR0FBcEIsRUFBeUIsS0FBekIsRUFBZ0M7QUFDOUIsT0FBSSxLQUFLLElBQUksTUFBYjtBQUFBLE9BQ0UsVUFBVSxJQUFJLEtBQUosQ0FBVSxFQUFWLENBRFo7QUFBQSxPQUVFLENBRkY7QUFBQSxPQUVLLENBRkw7O0FBSUEsUUFBSyxJQUFJLENBQVQsRUFBWSxJQUFJLEVBQWhCLEVBQW9CLEdBQXBCLEVBQXlCO0FBQ3ZCLGFBQVEsQ0FBUixJQUFhLEtBQWI7QUFDRDs7QUFFRCxPQUFJLFVBQVU7QUFDWixVQUFLLEdBRE87QUFFWixZQUFPLEtBRks7QUFHWixjQUFTLE9BSEc7QUFJWixhQUFRLElBQUksS0FBSixDQUFVLEVBQVY7QUFKSSxJQUFkOztBQU9BLFFBQUssSUFBSSxDQUFULEVBQVksSUFBSSxFQUFoQixFQUFvQixHQUFwQixFQUF5QjtBQUN2QixTQUFJLFFBQVEsS0FBUixDQUFjLENBQWQsQ0FBSjtBQUNBLFNBQUksUUFBUSxPQUFSLENBQWdCLENBQWhCLE1BQXVCLEtBQTNCLEVBQWtDO0FBQ2hDLHVCQUFnQixPQUFoQixFQUF5QixDQUF6QixFQUE0QixDQUE1QjtBQUNEO0FBQ0Y7O0FBRUQsVUFBTyxRQUFRLE1BQWY7QUFDRDs7QUFFRCxVQUFTLGVBQVQsQ0FBeUIsT0FBekIsRUFBa0MsS0FBbEMsRUFBeUMsS0FBekMsRUFBZ0Q7QUFDOUMsT0FBSSxNQUFNLEtBQVY7QUFBQSxPQUNFLFNBQVMsQ0FEWDtBQUFBLE9BRUUsUUFBUSxFQUZWO0FBQUEsT0FHRSxNQUhGO0FBQUEsT0FJRSxJQUpGOztBQU1BLFdBQVEsT0FBUixDQUFnQixHQUFoQixJQUF1QixJQUF2QjtBQUNBLFdBQVEsTUFBUixDQUFlLEdBQWYsSUFBc0IsS0FBdEI7QUFDQSxZQUFTO0FBQ1AsY0FBUyxLQUFUO0FBQ0EsWUFBTyxTQUFTLFFBQVEsR0FBUixDQUFZLEdBQVosRUFBaUIsTUFBakMsRUFBeUM7QUFDdkMsY0FBTyxRQUFRLEdBQVIsQ0FBWSxHQUFaLEVBQWlCLE1BQWpCLENBQVA7QUFDQSxXQUFJLFFBQVEsT0FBUixDQUFnQixJQUFoQixNQUEwQixLQUE5QixFQUFxQztBQUNuQyxlQUFNLElBQU4sQ0FBVyxDQUFDLEdBQUQsRUFBTSxTQUFTLENBQWYsQ0FBWDtBQUNBLGtCQUFTLElBQVQ7QUFDQSxpQkFBUSxPQUFSLENBQWdCLElBQWhCLElBQXdCLElBQXhCO0FBQ0EsaUJBQVEsTUFBUixDQUFlLElBQWYsSUFBdUIsS0FBdkI7QUFDQSxlQUFNLElBQU47QUFDQSxrQkFBUyxDQUFUO0FBQ0E7QUFDRCxRQVJELE1BUU87QUFDTDtBQUNEO0FBQ0Y7O0FBRUQsU0FBSSxXQUFXLEtBQWYsRUFBc0I7QUFDcEIsV0FBSSxNQUFNLE1BQVYsRUFBa0I7QUFBQSwyQkFDQSxNQUFNLEdBQU4sRUFEQTs7QUFBQTs7QUFDZixZQURlO0FBQ1YsZUFEVTtBQUVqQixRQUZELE1BRU87QUFDTDtBQUNEO0FBQ0Y7QUFDRjtBQUNGOztBQUVELFVBQVMsT0FBVCxDQUFpQixNQUFqQixFQUF5QjtBQUN2QixPQUFJLEtBQUssT0FBTyxNQUFoQjtBQUFBLE9BQ0UsVUFBVSxFQURaO0FBQUEsT0FFRSxDQUZGO0FBQUEsT0FFSyxLQUZMO0FBR0EsUUFBSyxJQUFJLENBQVQsRUFBWSxJQUFJLEVBQWhCLEVBQW9CLEdBQXBCLEVBQXlCO0FBQ3ZCLGFBQVEsT0FBTyxDQUFQLENBQVI7QUFDQSxhQUFRLEtBQVIsSUFBaUIsUUFBUSxLQUFSLElBQWlCLFFBQVEsS0FBUixJQUFpQixDQUFsQyxHQUFzQyxDQUF2RDtBQUNEOztBQUVELE9BQUksUUFBUSxFQUFaO0FBQ0EsUUFBSyxLQUFMLElBQWMsT0FBZCxFQUF1QjtBQUNyQixTQUFJLEdBQUcsY0FBSCxDQUFrQixJQUFsQixDQUF1QixPQUF2QixFQUFnQyxLQUFoQyxDQUFKLEVBQTRDO0FBQzFDLGFBQU0sSUFBTixDQUFXLFFBQVEsS0FBUixDQUFYO0FBQ0Q7QUFDRjs7QUFFRCxXQUFRLE1BQU0sSUFBTixDQUFXLFVBQUMsQ0FBRCxFQUFJLENBQUo7QUFBQSxZQUFVLElBQUksQ0FBZDtBQUFBLElBQVgsQ0FBUjtBQUNBLFVBQU8sS0FBUDtBQUNEOztBQUVjLFVBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQjtBQUN4QyxPQUFJLFFBQVEsV0FBVyxHQUFYLENBQVo7QUFBQSxPQUNFLFNBQVMsV0FBVyxHQUFYLEVBQWdCLEtBQWhCLENBRFg7QUFBQSxPQUVFLFFBQVEsUUFBUSxNQUFSLENBRlY7QUFHQSxVQUFPLEtBQVA7QUFDRCIsImZpbGUiOiJhYTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhYTFcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYWExXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1ZDNhYWYyNzQ4ZGRhOWE1ZDIzY1xuICoqLyIsImltcG9ydCBjb3VudEludmVyc2lvbiBmcm9tICcuL2NvdW50aW52ZXJzaW9uJztcbmltcG9ydCBjb3VudFF1aWNrU29ydENtcCBmcm9tICcuL2NvdW50cXVpY2tzb3J0Y21wJztcbmltcG9ydCBjb3VudE1pbkN1dCBmcm9tICcuL2NvdW50bWluY3V0JztcbmltcG9ydCBjb3VudFNjY1NpemUgZnJvbSAnLi9jb3VudHNjY3NpemUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvdW50SW52ZXJzaW9uOiBjb3VudEludmVyc2lvbixcbiAgY291bnRRdWlja1NvcnRDbXA6IGNvdW50UXVpY2tTb3J0Q21wLFxuICBjb3VudE1pbkN1dDogY291bnRNaW5DdXQsXG4gIGNvdW50U2NjU2l6ZTogY291bnRTY2NTaXplXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJmdW5jdGlvbiBzb3J0QW5kQ291bnQoYSwgYmVnLCBlbmQsIGJ1Zikge1xuICBpZiAoZW5kIC0gYmVnIDw9IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmIChlbmQgLSBiZWcgPT09IDIpIHtcbiAgICBpZiAoYVtiZWddIDw9IGFbYmVnICsgMV0pIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdG1wID0gYVtiZWddO1xuICAgICAgYVtiZWddID0gYVtiZWcgKyAxXTtcbiAgICAgIGFbYmVnICsgMV0gPSB0bXA7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IG1pZCA9IE1hdGguZmxvb3IoKGJlZyArIGVuZCkgLyAyKSxcbiAgICAgIGludkxlZnQgPSBzb3J0QW5kQ291bnQoYSwgYmVnLCBtaWQsIGJ1ZiksXG4gICAgICBpbnZSaWdodCA9IHNvcnRBbmRDb3VudChhLCBtaWQsIGVuZCwgYnVmKSxcbiAgICAgIGludlNwbGl0ID0gbWVyZ2VBbmRDb3VudChhLCBiZWcsIG1pZCwgZW5kLCBidWYpO1xuICAgIHJldHVybiBpbnZMZWZ0ICsgaW52UmlnaHQgKyBpbnZTcGxpdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUFuZENvdW50KGEsIGJlZywgbWlkLCBlbmQsIGJ1Zikge1xuICBmb3IgKGxldCBpID0gYmVnOyBpIDwgZW5kOyBpKyspIHtcbiAgICBidWZbaV0gPSBhW2ldO1xuICB9XG4gIGxldCBsZWZ0TGVuID0gbWlkIC0gYmVnLFxuICAgIHJpZ2h0TGVuID0gZW5kIC0gbWlkLFxuICAgIGxlbiA9IGVuZCAtIGJlZyxcbiAgICBsID0gMCxcbiAgICByID0gMCxcbiAgICBpbnYgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbGV0IHVzZUwgPSAociA9PT0gcmlnaHRMZW4pIHx8IChsICE9PSBsZWZ0TGVuICYmIGJ1ZltiZWcgKyBsXSA8PSBidWZbbWlkICsgcl0pO1xuICAgIGlmICh1c2VMKSB7XG4gICAgICBhW2JlZyArIGldID0gYnVmW2JlZyArIGxdO1xuICAgICAgbCsrO1xuICAgICAgaW52ICs9IHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFbYmVnICsgaV0gPSBidWZbbWlkICsgcl07XG4gICAgICByKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbnY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvdW50SW52ZXJzaW9uKGEpIHtcbiAgbGV0IGxlbiA9IGEubGVuZ3RoO1xuICBpZiAobGVuKSB7XG4gICAgbGV0IGJ1ZiA9IG5ldyBBcnJheShsZW4pO1xuICAgIHJldHVybiBzb3J0QW5kQ291bnQoYSwgMCwgbGVuLCBidWYpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb3VudGludmVyc2lvbi5qc1xuICoqLyIsImZ1bmN0aW9uIGZpbmQodWZBcnIsIGkpIHtcbiAgaWYgKHVmQXJyW2ldLnBhcmVudCAhPT0gaSlcbiAgICB1ZkFycltpXS5wYXJlbnQgPSBmaW5kKHVmQXJyLCB1ZkFycltpXS5wYXJlbnQpO1xuXG4gIHJldHVybiB1ZkFycltpXS5wYXJlbnQ7XG59XG5cbmZ1bmN0aW9uIHVuaW9uKHVmQXJyLCBpLCBqKSB7XG4gIGxldCBpcm9vdCA9IGZpbmQodWZBcnIsIGkpLFxuICAgIGpyb290ID0gZmluZCh1ZkFyciwgaik7XG5cbiAgaWYgKHVmQXJyW2lyb290XS5yYW5rIDwgdWZBcnJbanJvb3RdLnJhbmspXG4gICAgdWZBcnJbaXJvb3RdLnBhcmVudCA9IGpyb290O1xuICBlbHNlIGlmICh1ZkFycltpcm9vdF0ucmFuayA+IHVmQXJyW2pyb290XS5yYW5rKVxuICAgIHVmQXJyW2pyb290XS5wYXJlbnQgPSBpcm9vdDtcblxuICBlbHNlIHtcbiAgICB1ZkFycltqcm9vdF0ucGFyZW50ID0gaXJvb3Q7XG4gICAgdWZBcnJbaXJvb3RdLnJhbmsrKztcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGphY2VuY3lMaXN0MkVkZ2VMaXN0KGdBbCkge1xuICBsZXQgZ0VsID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ0FsLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnQWxbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChpIDwgZ0FsW2ldW2pdKSB7XG4gICAgICAgIGdFbC5wdXNoKFtpLCBnQWxbaV1bal1dKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdFbDtcbn1cblxuZnVuY3Rpb24gY291bnRNaW5DdXRPbmNlKHZuLCBnRWwpIHtcbiAgbGV0IHVmQXJyID0gbmV3IEFycmF5KHZuKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2bjsgaSsrKSB7XG4gICAgdWZBcnJbaV0gPSB7XG4gICAgICByYW5rOiAwLFxuICAgICAgcGFyZW50OiBpXG4gICAgfTtcbiAgfVxuXG4gIGxldCB2TGVmdCA9IHZuLFxuICAgIGVMZWZ0ID0gZ0VsLmxlbmd0aDtcblxuICB3aGlsZSAodkxlZnQgPiAyICYmIGVMZWZ0ID4gMCkge1xuICAgIGxldCBlU2VsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZUxlZnQpLFxuICAgICAgc3JjID0gZmluZCh1ZkFyciwgZ0VsW2VTZWxdWzBdKSxcbiAgICAgIGRzdCA9IGZpbmQodWZBcnIsIGdFbFtlU2VsXVsxXSk7XG5cbiAgICBpZiAoc3JjICE9PSBkc3QpIHtcbiAgICAgIHVuaW9uKHVmQXJyLCBzcmMsIGRzdCk7XG4gICAgICB2TGVmdC0tO1xuICAgIH1cblxuICAgIFtnRWxbZVNlbF0sIGdFbFtlTGVmdCAtIDFdXSA9IFtnRWxbZUxlZnQgLSAxXSwgZ0VsW2VTZWxdXTtcbiAgICBlTGVmdC0tO1xuICB9XG5cbiAgbGV0IGVDcm9zcyA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZUxlZnQ7IGkrKykge1xuICAgIGxldCBzcmMgPSBmaW5kKHVmQXJyLCBnRWxbaV1bMF0pLFxuICAgICAgZHN0ID0gZmluZCh1ZkFyciwgZ0VsW2ldWzFdKTtcblxuICAgIGlmIChzcmMgIT09IGRzdCkge1xuICAgICAgZUNyb3NzKys7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVDcm9zcztcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFJlcGVhdChuKSB7XG4gIHJldHVybiBNYXRoLmNlaWwobiAqIG4gKiBNYXRoLmxvZyhuICsgMSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudE1pbkN1dChnQWwsIHJlcGVhdCA9IGRlZmF1bHRSZXBlYXQoZ0FsLmxlbmd0aCkpIHtcbiAgbGV0IHZuID0gZ0FsLmxlbmd0aCxcbiAgICBnRWwgPSBhZGphY2VuY3lMaXN0MkVkZ2VMaXN0KGdBbCksXG4gICAgbWluQ291bnQgPSBjb3VudE1pbkN1dE9uY2Uodm4sIGdFbCk7XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgIG1pbkNvdW50ID0gTWF0aC5taW4obWluQ291bnQsIGNvdW50TWluQ3V0T25jZSh2biwgZ0VsKSk7XG4gIH1cbiAgcmV0dXJuIG1pbkNvdW50O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY291bnRtaW5jdXQuanNcbiAqKi8iLCJmdW5jdGlvbiBzb3J0QW5kQ291bnQoYSwgYmVnLCBlbmQsIGNob29zZVBpdm90KSB7XG4gIGlmIChlbmQgLSBiZWcgPD0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGxldCBwaXZvdCA9IGNob29zZVBpdm90KGEsIGJlZywgZW5kKSxcbiAgICBpID0gYmVnICsgMSxcbiAgICBqID0gYmVnICsgMSxcbiAgICBjb3VudCA9IGVuZCAtIGJlZyAtIDE7XG4gIFthW2JlZ10sIGFbcGl2b3RdXSA9IFthW3Bpdm90XSwgYVtiZWddXTtcbiAgd2hpbGUgKGogPCBlbmQpIHtcbiAgICBpZiAoYVtqXSA8IGFbYmVnXSkge1xuICAgICAgW2Fbal0sIGFbaV1dID0gW2FbaV0sIGFbal1dO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICBqKys7XG4gIH1cbiAgW2FbYmVnXSwgYVtpIC0gMV1dID0gW2FbaSAtIDFdLCBhW2JlZ11dO1xuICBjb3VudCArPSBzb3J0QW5kQ291bnQoYSwgYmVnLCBpIC0gMSwgY2hvb3NlUGl2b3QpO1xuICBjb3VudCArPSBzb3J0QW5kQ291bnQoYSwgaSwgZW5kLCBjaG9vc2VQaXZvdCk7XG4gIHJldHVybiBjb3VudDtcbn1cblxuZnVuY3Rpb24gZ2VuQ2hvb3NlUGl2b3Qoc3RyYXRlZ3kpIHtcbiAgc3dpdGNoIChzdHJhdGVneSkge1xuICAgIGNhc2UgJ2ZpcnN0JzpcbiAgICAgIHJldHVybiBjaG9vc2VQaXZvdEZpcnN0O1xuICAgIGNhc2UgJ2xhc3QnOlxuICAgICAgcmV0dXJuIGNob29zZVBpdm90TGFzdDtcbiAgICBjYXNlICdtZWRpYW4nOlxuICAgICAgcmV0dXJuIGNob29zZVBpdm90TWVkaWFuO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBkbyBub3RoaW5nXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hvb3NlUGl2b3RGaXJzdChhLCBiZWcsIGVuZCkge1xuICByZXR1cm4gYmVnO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VQaXZvdExhc3QoYSwgYmVnLCBlbmQpIHtcbiAgcmV0dXJuIGVuZCAtIDE7XG59XG5cbmZ1bmN0aW9uIGNob29zZVBpdm90TWVkaWFuKGEsIGJlZywgZW5kKSB7XG4gIGxldCBtaWQgPSBNYXRoLmZsb29yKChiZWcgKyBlbmQgLSAxKSAvIDIpLFxuICAgIGJlZ0xlc3NUaGFuTWlkID0gKGFbYmVnXSA8IGFbbWlkXSksXG4gICAgYmVnTGVzc1RoYW5FbmQgPSAoYVtiZWddIDwgYVtlbmQgLSAxXSksXG4gICAgbWlkTGVzc1RoYW5FbmQgPSAoYVttaWRdIDwgYVtlbmQgLSAxXSk7XG4gIGlmIChiZWdMZXNzVGhhbk1pZCArIGJlZ0xlc3NUaGFuRW5kID09PSAxKSB7XG4gICAgcmV0dXJuIGJlZztcbiAgfVxuICBpZiAoIWJlZ0xlc3NUaGFuTWlkICsgbWlkTGVzc1RoYW5FbmQgPT09IDEpIHtcbiAgICByZXR1cm4gbWlkO1xuICB9XG4gIGlmICghYmVnTGVzc1RoYW5FbmQgKyAhbWlkTGVzc1RoYW5FbmQgPT09IDEpIHtcbiAgICByZXR1cm4gZW5kIC0gMTtcbiAgfVxuICAvLyBkbyBub3RoaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvdW50UXVpY2tTb3J0Q21wKGEsIHN0cmF0ZWd5KSB7XG4gIGxldCBsZW4gPSBhLmxlbmd0aDtcbiAgaWYgKGxlbikge1xuICAgIGxldCBhQ29waWVkID0gYS5zbGljZSgwKSxcbiAgICAgIGNob29zZVBpdm90ID0gZ2VuQ2hvb3NlUGl2b3Qoc3RyYXRlZ3kpO1xuICAgIHJldHVybiBzb3J0QW5kQ291bnQoYUNvcGllZCwgMCwgbGVuLCBjaG9vc2VQaXZvdCk7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb3VudHF1aWNrc29ydGNtcC5qc1xuICoqLyIsImZ1bmN0aW9uIGludmVyc2UoZ0FsKSB7XG4gIHZhciBubiA9IGdBbC5sZW5ndGgsXG4gICAgZ0FsSW52ID0gbmV3IEFycmF5KG5uKSxcbiAgICBpLCBqLCBrO1xuICBmb3IgKGkgPSAwOyBpIDwgbm47IGkrKykge1xuICAgIGdBbEludltpXSA9IFtdO1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCBubjsgaSsrKSB7XG4gICAgZm9yIChqID0gMDsgaiA8IGdBbFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgayA9IGdBbFtpXVtqXTtcbiAgICAgIGdBbEludltrXS5wdXNoKGkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZ0FsSW52O1xufVxuXG5mdW5jdGlvbiBwcmVwcm9jZXNzKGdBbCkge1xuICB2YXIgZ0FsSW52ID0gaW52ZXJzZShnQWwpLFxuICAgIG5uID0gZ0FsSW52Lmxlbmd0aCxcbiAgICBvcmRlciA9IG5ldyBBcnJheShubiksXG4gICAgdmlzaXRlZCA9IG5ldyBBcnJheShubiksXG4gICAgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgbm47IGkrKykge1xuICAgIHZpc2l0ZWRbaV0gPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBjb250ZXh0ID0ge1xuICAgIGdBbDogZ0FsSW52LFxuICAgIG9yZGVyOiBvcmRlcixcbiAgICB2aXNpdGVkOiB2aXNpdGVkLFxuICAgIG5GaW46IDBcbiAgfTtcblxuICBmb3IgKGkgPSAwOyBpIDwgbm47IGkrKykge1xuICAgIGlmIChjb250ZXh0LnZpc2l0ZWRbaV0gPT09IGZhbHNlKSB7XG4gICAgICBkZnNJblByZXByb2Nlc3MoY29udGV4dCwgaSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQub3JkZXIucmV2ZXJzZSgpO1xufVxuXG5mdW5jdGlvbiBkZnNJblByZXByb2Nlc3MoY29udGV4dCwgaW5kZXgpIHtcbiAgdmFyIGN1ciA9IGluZGV4LFxuICAgIG9mZnNldCA9IDAsXG4gICAgc3RhY2sgPSBbXSxcbiAgICBkZWVwZXIsXG4gICAgbmV4dDtcbiAgY29udGV4dC52aXNpdGVkW2N1cl0gPSB0cnVlOyAvLyBwcmUgb3BcbiAgZm9yICg7Oykge1xuICAgIGRlZXBlciA9IGZhbHNlO1xuICAgIHdoaWxlIChvZmZzZXQgPCBjb250ZXh0LmdBbFtjdXJdLmxlbmd0aCkgeyAvLyByZWN1cnNlXG4gICAgICBuZXh0ID0gY29udGV4dC5nQWxbY3VyXVtvZmZzZXRdOyAvLyByZWN1cnNlXG4gICAgICBpZiAoY29udGV4dC52aXNpdGVkW25leHRdID09PSBmYWxzZSkgeyAvLyByZWN1cnNlXG4gICAgICAgIGNvbnRleHQudmlzaXRlZFtuZXh0XSA9IHRydWU7IC8vIHByZSBvcFxuICAgICAgICBzdGFjay5wdXNoKFtjdXIsIG9mZnNldCArIDFdKTtcbiAgICAgICAgZGVlcGVyID0gdHJ1ZTtcbiAgICAgICAgY3VyID0gbmV4dDtcbiAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZmZzZXQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVlcGVyID09PSBmYWxzZSkge1xuICAgICAgY29udGV4dC5vcmRlcltjb250ZXh0Lm5GaW5dID0gY3VyOyAvLyBwb3N0IG9wXG4gICAgICBjb250ZXh0Lm5GaW4rKzsgLy8gcG9zdCBvcFxuICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICBbY3VyLCBvZmZzZXRdID0gc3RhY2sucG9wKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZUxhYmVscyhnQWwsIG9yZGVyKSB7XG4gIHZhciBubiA9IGdBbC5sZW5ndGgsXG4gICAgdmlzaXRlZCA9IG5ldyBBcnJheShubiksXG4gICAgaSwgajtcblxuICBmb3IgKGkgPSAwOyBpIDwgbm47IGkrKykge1xuICAgIHZpc2l0ZWRbaV0gPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBjb250ZXh0ID0ge1xuICAgIGdBbDogZ0FsLFxuICAgIG9yZGVyOiBvcmRlcixcbiAgICB2aXNpdGVkOiB2aXNpdGVkLFxuICAgIGxhYmVsczogbmV3IEFycmF5KG5uKVxuICB9O1xuXG4gIGZvciAoaSA9IDA7IGkgPCBubjsgaSsrKSB7XG4gICAgaiA9IGNvbnRleHQub3JkZXJbaV07XG4gICAgaWYgKGNvbnRleHQudmlzaXRlZFtqXSA9PT0gZmFsc2UpIHtcbiAgICAgIGRmc0luTWFrZUxhYmVscyhjb250ZXh0LCBqLCBqKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29udGV4dC5sYWJlbHM7XG59XG5cbmZ1bmN0aW9uIGRmc0luTWFrZUxhYmVscyhjb250ZXh0LCBpbmRleCwgbGFiZWwpIHtcbiAgdmFyIGN1ciA9IGluZGV4LFxuICAgIG9mZnNldCA9IDAsXG4gICAgc3RhY2sgPSBbXSxcbiAgICBkZWVwZXIsXG4gICAgbmV4dDtcblxuICBjb250ZXh0LnZpc2l0ZWRbY3VyXSA9IHRydWU7XG4gIGNvbnRleHQubGFiZWxzW2N1cl0gPSBsYWJlbDtcbiAgZm9yICg7Oykge1xuICAgIGRlZXBlciA9IGZhbHNlO1xuICAgIHdoaWxlIChvZmZzZXQgPCBjb250ZXh0LmdBbFtjdXJdLmxlbmd0aCkge1xuICAgICAgbmV4dCA9IGNvbnRleHQuZ0FsW2N1cl1bb2Zmc2V0XTtcbiAgICAgIGlmIChjb250ZXh0LnZpc2l0ZWRbbmV4dF0gPT09IGZhbHNlKSB7XG4gICAgICAgIHN0YWNrLnB1c2goW2N1ciwgb2Zmc2V0ICsgMV0pO1xuICAgICAgICBkZWVwZXIgPSB0cnVlO1xuICAgICAgICBjb250ZXh0LnZpc2l0ZWRbbmV4dF0gPSB0cnVlO1xuICAgICAgICBjb250ZXh0LmxhYmVsc1tuZXh0XSA9IGxhYmVsO1xuICAgICAgICBjdXIgPSBuZXh0O1xuICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZnNldCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkZWVwZXIgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoc3RhY2subGVuZ3RoKSB7XG4gICAgICAgIFtjdXIsIG9mZnNldF0gPSBzdGFjay5wb3AoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTaXplKGxhYmVscykge1xuICB2YXIgbm4gPSBsYWJlbHMubGVuZ3RoLFxuICAgIGNvdW50ZXIgPSB7fSxcbiAgICBpLCBsYWJlbDtcbiAgZm9yIChpID0gMDsgaSA8IG5uOyBpKyspIHtcbiAgICBsYWJlbCA9IGxhYmVsc1tpXTtcbiAgICBjb3VudGVyW2xhYmVsXSA9IGNvdW50ZXJbbGFiZWxdID8gY291bnRlcltsYWJlbF0gKyAxIDogMTtcbiAgfVxuXG4gIHZhciBzaXplcyA9IFtdO1xuICBmb3IgKGxhYmVsIGluIGNvdW50ZXIpIHtcbiAgICBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChjb3VudGVyLCBsYWJlbCkpIHtcbiAgICAgIHNpemVzLnB1c2goY291bnRlcltsYWJlbF0pO1xuICAgIH1cbiAgfVxuXG4gIHNpemVzID0gc2l6ZXMuc29ydCgoYSwgYikgPT4gYiAtIGEpO1xuICByZXR1cm4gc2l6ZXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvdW50U2NjU2l6ZShnQWwpIHtcbiAgdmFyIG9yZGVyID0gcHJlcHJvY2VzcyhnQWwpLFxuICAgIGxhYmVscyA9IG1ha2VMYWJlbHMoZ0FsLCBvcmRlciksXG4gICAgc2l6ZXMgPSBnZXRTaXplKGxhYmVscyk7XG4gIHJldHVybiBzaXplcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvdW50c2Njc2l6ZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=