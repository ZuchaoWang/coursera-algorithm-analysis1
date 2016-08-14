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
	
	var _countinversion = __webpack_require__(2);
	
	var _countinversion2 = _interopRequireDefault(_countinversion);
	
	var _countquicksortcmp = __webpack_require__(4);
	
	var _countquicksortcmp2 = _interopRequireDefault(_countquicksortcmp);
	
	var _countmincut = __webpack_require__(3);
	
	var _countmincut2 = _interopRequireDefault(_countmincut);
	
	var _countsccsize = __webpack_require__(5);
	
	var _countsccsize2 = _interopRequireDefault(_countsccsize);
	
	var _calcshortestdis = __webpack_require__(1);
	
	var _calcshortestdis2 = _interopRequireDefault(_calcshortestdis);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  countInversion: _countinversion2.default,
	  countQuickSortCmp: _countquicksortcmp2.default,
	  countMinCut: _countmincut2.default,
	  countSccSize: _countsccsize2.default,
	  calcShortestDis: _calcshortestdis2.default
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = calcShortestDis;
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
	module.exports = exports["default"];

/***/ },
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* 5 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyZjE5NmQzNzBlYzY3YjMzMmI4MSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGNzaG9ydGVzdGRpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRpbnZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdW50bWluY3V0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3VudHF1aWNrc29ydGNtcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRzY2NzaXplLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7bUJBRWU7QUFDYiwyQ0FEYTtBQUViLGlEQUZhO0FBR2IscUNBSGE7QUFJYix1Q0FKYTtBQUtiO0FBTGEsRTs7Ozs7Ozs7Ozs7Ozs7O21CQ05TLGU7QUFBVCxVQUFTLGVBQVQsQ0FBeUIsR0FBekIsRUFBOEIsQ0FBOUIsRUFBaUM7QUFDOUMsT0FBSSxLQUFLLElBQUksTUFBYjtBQUFBLE9BQ0UsV0FBVyxJQUFJLEtBQUosQ0FBVSxFQUFWLENBRGI7QUFBQSxPQUVFLFdBQVcsSUFBSSxHQUFKLENBQVEsQ0FDakIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQURpQixDQUFSLENBRmI7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QUksTUFBTSxNQUFWLEVBQWtCO0FBQUEsMkJBQ0EsTUFBTSxHQUFOLEVBREE7O0FBQUE7O0FBQ2YsWUFEZTtBQUNWLGVBRFU7QUFFakIsUUFGRCxNQUVPO0FBQ0w7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxVQUFTLE9BQVQsQ0FBaUIsTUFBakIsRUFBeUI7QUFDdkIsT0FBSSxLQUFLLE9BQU8sTUFBaEI7QUFBQSxPQUNFLFVBQVUsRUFEWjtBQUFBLE9BRUUsQ0FGRjtBQUFBLE9BRUssS0FGTDtBQUdBLFFBQUssSUFBSSxDQUFULEVBQVksSUFBSSxFQUFoQixFQUFvQixHQUFwQixFQUF5QjtBQUN2QixhQUFRLE9BQU8sQ0FBUCxDQUFSO0FBQ0EsYUFBUSxLQUFSLElBQWlCLFFBQVEsS0FBUixJQUFpQixRQUFRLEtBQVIsSUFBaUIsQ0FBbEMsR0FBc0MsQ0FBdkQ7QUFDRDs7QUFFRCxPQUFJLFFBQVEsRUFBWjtBQUNBLFFBQUssS0FBTCxJQUFjLE9BQWQsRUFBdUI7QUFDckIsU0FBSSxHQUFHLGNBQUgsQ0FBa0IsSUFBbEIsQ0FBdUIsT0FBdkIsRUFBZ0MsS0FBaEMsQ0FBSixFQUE0QztBQUMxQyxhQUFNLElBQU4sQ0FBVyxRQUFRLEtBQVIsQ0FBWDtBQUNEO0FBQ0Y7O0FBRUQsV0FBUSxNQUFNLElBQU4sQ0FBVyxVQUFDLENBQUQsRUFBSSxDQUFKO0FBQUEsWUFBVSxJQUFJLENBQWQ7QUFBQSxJQUFYLENBQVI7QUFDQSxVQUFPLEtBQVA7QUFDRDs7QUFFYyxVQUFTLFlBQVQsQ0FBc0IsR0FBdEIsRUFBMkI7QUFDeEMsT0FBSSxRQUFRLFdBQVcsR0FBWCxDQUFaO0FBQUEsT0FDRSxTQUFTLFdBQVcsR0FBWCxFQUFnQixLQUFoQixDQURYO0FBQUEsT0FFRSxRQUFRLFFBQVEsTUFBUixDQUZWO0FBR0EsVUFBTyxLQUFQO0FBQ0QiLCJmaWxlIjoiYWExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYWExXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFhMVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMmYxOTZkMzcwZWM2N2IzMzJiODFcbiAqKi8iLCJpbXBvcnQgY291bnRJbnZlcnNpb24gZnJvbSAnLi9jb3VudGludmVyc2lvbic7XG5pbXBvcnQgY291bnRRdWlja1NvcnRDbXAgZnJvbSAnLi9jb3VudHF1aWNrc29ydGNtcCc7XG5pbXBvcnQgY291bnRNaW5DdXQgZnJvbSAnLi9jb3VudG1pbmN1dCc7XG5pbXBvcnQgY291bnRTY2NTaXplIGZyb20gJy4vY291bnRzY2NzaXplJztcbmltcG9ydCBjYWxjU2hvcnRlc3REaXMgZnJvbSAnLi9jYWxjc2hvcnRlc3RkaXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvdW50SW52ZXJzaW9uOiBjb3VudEludmVyc2lvbixcbiAgY291bnRRdWlja1NvcnRDbXA6IGNvdW50UXVpY2tTb3J0Q21wLFxuICBjb3VudE1pbkN1dDogY291bnRNaW5DdXQsXG4gIGNvdW50U2NjU2l6ZTogY291bnRTY2NTaXplLFxuICBjYWxjU2hvcnRlc3REaXM6IGNhbGNTaG9ydGVzdERpc1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FsY1Nob3J0ZXN0RGlzKGdBbCwgcykge1xuICB2YXIgbm4gPSBnQWwubGVuZ3RoLFxuICAgIGRpc0FycmF5ID0gbmV3IEFycmF5KG5uKSxcbiAgICBmcm9udGllciA9IG5ldyBNYXAoW1xuICAgICAgW3MsIDBdXG4gICAgXSksXG4gICAgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgbm47IGkrKykge1xuICAgIGRpc0FycmF5W2ldID0gbnVsbDtcbiAgfVxuXG4gIHdoaWxlIChmcm9udGllci5zaXplID4gMCkge1xuICAgIC8vIGNob29zZSBtaW5cbiAgICB2YXIgbWluS2V5ID0gbnVsbCxcbiAgICAgIG1pbkRpcyA9IG51bGw7XG4gICAgZm9yICh2YXIgW2tleSwgZGlzXSBvZiBmcm9udGllcikge1xuICAgICAgaWYgKG1pbktleSA9PSBudWxsIHx8IGRpcyA8IG1pbkRpcykge1xuICAgICAgICBtaW5LZXkgPSBrZXk7XG4gICAgICAgIG1pbkRpcyA9IGRpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgZGlzXG4gICAgZGlzQXJyYXlbbWluS2V5XSA9IG1pbkRpcztcblxuICAgIC8vIHVwZGF0ZSBmcm9udGllclxuICAgIGZyb250aWVyLmRlbGV0ZShtaW5LZXkpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBnQWxbbWluS2V5XS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5leHRLZXkgPSBnQWxbbWluS2V5XVtpXVswXSxcbiAgICAgICAgbmV4dExlbiA9IGdBbFttaW5LZXldW2ldWzFdO1xuXG4gICAgICBpZiAoZGlzQXJyYXlbbmV4dEtleV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoZnJvbnRpZXIuaGFzKG5leHRLZXkpKSB7XG4gICAgICAgICAgZnJvbnRpZXIuc2V0KG5leHRLZXksIE1hdGgubWluKGZyb250aWVyLmdldChuZXh0S2V5KSwgZGlzQXJyYXlbbWluS2V5XSArIG5leHRMZW4pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcm9udGllci5zZXQobmV4dEtleSwgZGlzQXJyYXlbbWluS2V5XSArIG5leHRMZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRpc0FycmF5O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2FsY3Nob3J0ZXN0ZGlzLmpzXG4gKiovIiwiZnVuY3Rpb24gc29ydEFuZENvdW50KGEsIGJlZywgZW5kLCBidWYpIHtcbiAgaWYgKGVuZCAtIGJlZyA8PSAxKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSBpZiAoZW5kIC0gYmVnID09PSAyKSB7XG4gICAgaWYgKGFbYmVnXSA8PSBhW2JlZyArIDFdKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRtcCA9IGFbYmVnXTtcbiAgICAgIGFbYmVnXSA9IGFbYmVnICsgMV07XG4gICAgICBhW2JlZyArIDFdID0gdG1wO1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChiZWcgKyBlbmQpIC8gMiksXG4gICAgICBpbnZMZWZ0ID0gc29ydEFuZENvdW50KGEsIGJlZywgbWlkLCBidWYpLFxuICAgICAgaW52UmlnaHQgPSBzb3J0QW5kQ291bnQoYSwgbWlkLCBlbmQsIGJ1ZiksXG4gICAgICBpbnZTcGxpdCA9IG1lcmdlQW5kQ291bnQoYSwgYmVnLCBtaWQsIGVuZCwgYnVmKTtcbiAgICByZXR1cm4gaW52TGVmdCArIGludlJpZ2h0ICsgaW52U3BsaXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VBbmRDb3VudChhLCBiZWcsIG1pZCwgZW5kLCBidWYpIHtcbiAgZm9yIChsZXQgaSA9IGJlZzsgaSA8IGVuZDsgaSsrKSB7XG4gICAgYnVmW2ldID0gYVtpXTtcbiAgfVxuICBsZXQgbGVmdExlbiA9IG1pZCAtIGJlZyxcbiAgICByaWdodExlbiA9IGVuZCAtIG1pZCxcbiAgICBsZW4gPSBlbmQgLSBiZWcsXG4gICAgbCA9IDAsXG4gICAgciA9IDAsXG4gICAgaW52ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGxldCB1c2VMID0gKHIgPT09IHJpZ2h0TGVuKSB8fCAobCAhPT0gbGVmdExlbiAmJiBidWZbYmVnICsgbF0gPD0gYnVmW21pZCArIHJdKTtcbiAgICBpZiAodXNlTCkge1xuICAgICAgYVtiZWcgKyBpXSA9IGJ1ZltiZWcgKyBsXTtcbiAgICAgIGwrKztcbiAgICAgIGludiArPSByO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2JlZyArIGldID0gYnVmW21pZCArIHJdO1xuICAgICAgcisrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW52O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudEludmVyc2lvbihhKSB7XG4gIGxldCBsZW4gPSBhLmxlbmd0aDtcbiAgaWYgKGxlbikge1xuICAgIGxldCBidWYgPSBuZXcgQXJyYXkobGVuKTtcbiAgICByZXR1cm4gc29ydEFuZENvdW50KGEsIDAsIGxlbiwgYnVmKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY291bnRpbnZlcnNpb24uanNcbiAqKi8iLCJmdW5jdGlvbiBmaW5kKHVmQXJyLCBpKSB7XG4gIGlmICh1ZkFycltpXS5wYXJlbnQgIT09IGkpXG4gICAgdWZBcnJbaV0ucGFyZW50ID0gZmluZCh1ZkFyciwgdWZBcnJbaV0ucGFyZW50KTtcblxuICByZXR1cm4gdWZBcnJbaV0ucGFyZW50O1xufVxuXG5mdW5jdGlvbiB1bmlvbih1ZkFyciwgaSwgaikge1xuICBsZXQgaXJvb3QgPSBmaW5kKHVmQXJyLCBpKSxcbiAgICBqcm9vdCA9IGZpbmQodWZBcnIsIGopO1xuXG4gIGlmICh1ZkFycltpcm9vdF0ucmFuayA8IHVmQXJyW2pyb290XS5yYW5rKVxuICAgIHVmQXJyW2lyb290XS5wYXJlbnQgPSBqcm9vdDtcbiAgZWxzZSBpZiAodWZBcnJbaXJvb3RdLnJhbmsgPiB1ZkFycltqcm9vdF0ucmFuaylcbiAgICB1ZkFycltqcm9vdF0ucGFyZW50ID0gaXJvb3Q7XG5cbiAgZWxzZSB7XG4gICAgdWZBcnJbanJvb3RdLnBhcmVudCA9IGlyb290O1xuICAgIHVmQXJyW2lyb290XS5yYW5rKys7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRqYWNlbmN5TGlzdDJFZGdlTGlzdChnQWwpIHtcbiAgbGV0IGdFbCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdBbC5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ0FsW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAoaSA8IGdBbFtpXVtqXSkge1xuICAgICAgICBnRWwucHVzaChbaSwgZ0FsW2ldW2pdXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBnRWw7XG59XG5cbmZ1bmN0aW9uIGNvdW50TWluQ3V0T25jZSh2biwgZ0VsKSB7XG4gIGxldCB1ZkFyciA9IG5ldyBBcnJheSh2bik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdm47IGkrKykge1xuICAgIHVmQXJyW2ldID0ge1xuICAgICAgcmFuazogMCxcbiAgICAgIHBhcmVudDogaVxuICAgIH07XG4gIH1cblxuICBsZXQgdkxlZnQgPSB2bixcbiAgICBlTGVmdCA9IGdFbC5sZW5ndGg7XG5cbiAgd2hpbGUgKHZMZWZ0ID4gMiAmJiBlTGVmdCA+IDApIHtcbiAgICBsZXQgZVNlbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVMZWZ0KSxcbiAgICAgIHNyYyA9IGZpbmQodWZBcnIsIGdFbFtlU2VsXVswXSksXG4gICAgICBkc3QgPSBmaW5kKHVmQXJyLCBnRWxbZVNlbF1bMV0pO1xuXG4gICAgaWYgKHNyYyAhPT0gZHN0KSB7XG4gICAgICB1bmlvbih1ZkFyciwgc3JjLCBkc3QpO1xuICAgICAgdkxlZnQtLTtcbiAgICB9XG5cbiAgICBbZ0VsW2VTZWxdLCBnRWxbZUxlZnQgLSAxXV0gPSBbZ0VsW2VMZWZ0IC0gMV0sIGdFbFtlU2VsXV07XG4gICAgZUxlZnQtLTtcbiAgfVxuXG4gIGxldCBlQ3Jvc3MgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVMZWZ0OyBpKyspIHtcbiAgICBsZXQgc3JjID0gZmluZCh1ZkFyciwgZ0VsW2ldWzBdKSxcbiAgICAgIGRzdCA9IGZpbmQodWZBcnIsIGdFbFtpXVsxXSk7XG5cbiAgICBpZiAoc3JjICE9PSBkc3QpIHtcbiAgICAgIGVDcm9zcysrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlQ3Jvc3M7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRSZXBlYXQobikge1xuICByZXR1cm4gTWF0aC5jZWlsKG4gKiBuICogTWF0aC5sb2cobiArIDEpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY291bnRNaW5DdXQoZ0FsLCByZXBlYXQgPSBkZWZhdWx0UmVwZWF0KGdBbC5sZW5ndGgpKSB7XG4gIGxldCB2biA9IGdBbC5sZW5ndGgsXG4gICAgZ0VsID0gYWRqYWNlbmN5TGlzdDJFZGdlTGlzdChnQWwpLFxuICAgIG1pbkNvdW50ID0gY291bnRNaW5DdXRPbmNlKHZuLCBnRWwpO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICBtaW5Db3VudCA9IE1hdGgubWluKG1pbkNvdW50LCBjb3VudE1pbkN1dE9uY2Uodm4sIGdFbCkpO1xuICB9XG4gIHJldHVybiBtaW5Db3VudDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvdW50bWluY3V0LmpzXG4gKiovIiwiZnVuY3Rpb24gc29ydEFuZENvdW50KGEsIGJlZywgZW5kLCBjaG9vc2VQaXZvdCkge1xuICBpZiAoZW5kIC0gYmVnIDw9IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBsZXQgcGl2b3QgPSBjaG9vc2VQaXZvdChhLCBiZWcsIGVuZCksXG4gICAgaSA9IGJlZyArIDEsXG4gICAgaiA9IGJlZyArIDEsXG4gICAgY291bnQgPSBlbmQgLSBiZWcgLSAxO1xuICBbYVtiZWddLCBhW3Bpdm90XV0gPSBbYVtwaXZvdF0sIGFbYmVnXV07XG4gIHdoaWxlIChqIDwgZW5kKSB7XG4gICAgaWYgKGFbal0gPCBhW2JlZ10pIHtcbiAgICAgIFthW2pdLCBhW2ldXSA9IFthW2ldLCBhW2pdXTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgaisrO1xuICB9XG4gIFthW2JlZ10sIGFbaSAtIDFdXSA9IFthW2kgLSAxXSwgYVtiZWddXTtcbiAgY291bnQgKz0gc29ydEFuZENvdW50KGEsIGJlZywgaSAtIDEsIGNob29zZVBpdm90KTtcbiAgY291bnQgKz0gc29ydEFuZENvdW50KGEsIGksIGVuZCwgY2hvb3NlUGl2b3QpO1xuICByZXR1cm4gY291bnQ7XG59XG5cbmZ1bmN0aW9uIGdlbkNob29zZVBpdm90KHN0cmF0ZWd5KSB7XG4gIHN3aXRjaCAoc3RyYXRlZ3kpIHtcbiAgICBjYXNlICdmaXJzdCc6XG4gICAgICByZXR1cm4gY2hvb3NlUGl2b3RGaXJzdDtcbiAgICBjYXNlICdsYXN0JzpcbiAgICAgIHJldHVybiBjaG9vc2VQaXZvdExhc3Q7XG4gICAgY2FzZSAnbWVkaWFuJzpcbiAgICAgIHJldHVybiBjaG9vc2VQaXZvdE1lZGlhbjtcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gZG8gbm90aGluZ1xuICB9XG59XG5cbmZ1bmN0aW9uIGNob29zZVBpdm90Rmlyc3QoYSwgYmVnLCBlbmQpIHtcbiAgcmV0dXJuIGJlZztcbn1cblxuZnVuY3Rpb24gY2hvb3NlUGl2b3RMYXN0KGEsIGJlZywgZW5kKSB7XG4gIHJldHVybiBlbmQgLSAxO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VQaXZvdE1lZGlhbihhLCBiZWcsIGVuZCkge1xuICBsZXQgbWlkID0gTWF0aC5mbG9vcigoYmVnICsgZW5kIC0gMSkgLyAyKSxcbiAgICBiZWdMZXNzVGhhbk1pZCA9IChhW2JlZ10gPCBhW21pZF0pLFxuICAgIGJlZ0xlc3NUaGFuRW5kID0gKGFbYmVnXSA8IGFbZW5kIC0gMV0pLFxuICAgIG1pZExlc3NUaGFuRW5kID0gKGFbbWlkXSA8IGFbZW5kIC0gMV0pO1xuICBpZiAoYmVnTGVzc1RoYW5NaWQgKyBiZWdMZXNzVGhhbkVuZCA9PT0gMSkge1xuICAgIHJldHVybiBiZWc7XG4gIH1cbiAgaWYgKCFiZWdMZXNzVGhhbk1pZCArIG1pZExlc3NUaGFuRW5kID09PSAxKSB7XG4gICAgcmV0dXJuIG1pZDtcbiAgfVxuICBpZiAoIWJlZ0xlc3NUaGFuRW5kICsgIW1pZExlc3NUaGFuRW5kID09PSAxKSB7XG4gICAgcmV0dXJuIGVuZCAtIDE7XG4gIH1cbiAgLy8gZG8gbm90aGluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudFF1aWNrU29ydENtcChhLCBzdHJhdGVneSkge1xuICBsZXQgbGVuID0gYS5sZW5ndGg7XG4gIGlmIChsZW4pIHtcbiAgICBsZXQgYUNvcGllZCA9IGEuc2xpY2UoMCksXG4gICAgICBjaG9vc2VQaXZvdCA9IGdlbkNob29zZVBpdm90KHN0cmF0ZWd5KTtcbiAgICByZXR1cm4gc29ydEFuZENvdW50KGFDb3BpZWQsIDAsIGxlbiwgY2hvb3NlUGl2b3QpO1xuICB9XG4gIHJldHVybiAwO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY291bnRxdWlja3NvcnRjbXAuanNcbiAqKi8iLCJmdW5jdGlvbiBpbnZlcnNlKGdBbCkge1xuICB2YXIgbm4gPSBnQWwubGVuZ3RoLFxuICAgIGdBbEludiA9IG5ldyBBcnJheShubiksXG4gICAgaSwgaiwgaztcbiAgZm9yIChpID0gMDsgaSA8IG5uOyBpKyspIHtcbiAgICBnQWxJbnZbaV0gPSBbXTtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgbm47IGkrKykge1xuICAgIGZvciAoaiA9IDA7IGogPCBnQWxbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGsgPSBnQWxbaV1bal07XG4gICAgICBnQWxJbnZba10ucHVzaChpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdBbEludjtcbn1cblxuZnVuY3Rpb24gcHJlcHJvY2VzcyhnQWwpIHtcbiAgdmFyIGdBbEludiA9IGludmVyc2UoZ0FsKSxcbiAgICBubiA9IGdBbEludi5sZW5ndGgsXG4gICAgb3JkZXIgPSBuZXcgQXJyYXkobm4pLFxuICAgIHZpc2l0ZWQgPSBuZXcgQXJyYXkobm4pLFxuICAgIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IG5uOyBpKyspIHtcbiAgICB2aXNpdGVkW2ldID0gZmFsc2U7XG4gIH1cblxuICB2YXIgY29udGV4dCA9IHtcbiAgICBnQWw6IGdBbEludixcbiAgICBvcmRlcjogb3JkZXIsXG4gICAgdmlzaXRlZDogdmlzaXRlZCxcbiAgICBuRmluOiAwXG4gIH07XG5cbiAgZm9yIChpID0gMDsgaSA8IG5uOyBpKyspIHtcbiAgICBpZiAoY29udGV4dC52aXNpdGVkW2ldID09PSBmYWxzZSkge1xuICAgICAgZGZzSW5QcmVwcm9jZXNzKGNvbnRleHQsIGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb250ZXh0Lm9yZGVyLnJldmVyc2UoKTtcbn1cblxuZnVuY3Rpb24gZGZzSW5QcmVwcm9jZXNzKGNvbnRleHQsIGluZGV4KSB7XG4gIHZhciBjdXIgPSBpbmRleCxcbiAgICBvZmZzZXQgPSAwLFxuICAgIHN0YWNrID0gW10sXG4gICAgZGVlcGVyLFxuICAgIG5leHQ7XG4gIGNvbnRleHQudmlzaXRlZFtjdXJdID0gdHJ1ZTsgLy8gcHJlIG9wXG4gIGZvciAoOzspIHtcbiAgICBkZWVwZXIgPSBmYWxzZTtcbiAgICB3aGlsZSAob2Zmc2V0IDwgY29udGV4dC5nQWxbY3VyXS5sZW5ndGgpIHsgLy8gcmVjdXJzZVxuICAgICAgbmV4dCA9IGNvbnRleHQuZ0FsW2N1cl1bb2Zmc2V0XTsgLy8gcmVjdXJzZVxuICAgICAgaWYgKGNvbnRleHQudmlzaXRlZFtuZXh0XSA9PT0gZmFsc2UpIHsgLy8gcmVjdXJzZVxuICAgICAgICBjb250ZXh0LnZpc2l0ZWRbbmV4dF0gPSB0cnVlOyAvLyBwcmUgb3BcbiAgICAgICAgc3RhY2sucHVzaChbY3VyLCBvZmZzZXQgKyAxXSk7XG4gICAgICAgIGRlZXBlciA9IHRydWU7XG4gICAgICAgIGN1ciA9IG5leHQ7XG4gICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2Zmc2V0Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlZXBlciA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnRleHQub3JkZXJbY29udGV4dC5uRmluXSA9IGN1cjsgLy8gcG9zdCBvcFxuICAgICAgY29udGV4dC5uRmluKys7IC8vIHBvc3Qgb3BcbiAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgW2N1ciwgb2Zmc2V0XSA9IHN0YWNrLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VMYWJlbHMoZ0FsLCBvcmRlcikge1xuICB2YXIgbm4gPSBnQWwubGVuZ3RoLFxuICAgIHZpc2l0ZWQgPSBuZXcgQXJyYXkobm4pLFxuICAgIGksIGo7XG5cbiAgZm9yIChpID0gMDsgaSA8IG5uOyBpKyspIHtcbiAgICB2aXNpdGVkW2ldID0gZmFsc2U7XG4gIH1cblxuICB2YXIgY29udGV4dCA9IHtcbiAgICBnQWw6IGdBbCxcbiAgICBvcmRlcjogb3JkZXIsXG4gICAgdmlzaXRlZDogdmlzaXRlZCxcbiAgICBsYWJlbHM6IG5ldyBBcnJheShubilcbiAgfTtcblxuICBmb3IgKGkgPSAwOyBpIDwgbm47IGkrKykge1xuICAgIGogPSBjb250ZXh0Lm9yZGVyW2ldO1xuICAgIGlmIChjb250ZXh0LnZpc2l0ZWRbal0gPT09IGZhbHNlKSB7XG4gICAgICBkZnNJbk1ha2VMYWJlbHMoY29udGV4dCwgaiwgaik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQubGFiZWxzO1xufVxuXG5mdW5jdGlvbiBkZnNJbk1ha2VMYWJlbHMoY29udGV4dCwgaW5kZXgsIGxhYmVsKSB7XG4gIHZhciBjdXIgPSBpbmRleCxcbiAgICBvZmZzZXQgPSAwLFxuICAgIHN0YWNrID0gW10sXG4gICAgZGVlcGVyLFxuICAgIG5leHQ7XG5cbiAgY29udGV4dC52aXNpdGVkW2N1cl0gPSB0cnVlO1xuICBjb250ZXh0LmxhYmVsc1tjdXJdID0gbGFiZWw7XG4gIGZvciAoOzspIHtcbiAgICBkZWVwZXIgPSBmYWxzZTtcbiAgICB3aGlsZSAob2Zmc2V0IDwgY29udGV4dC5nQWxbY3VyXS5sZW5ndGgpIHtcbiAgICAgIG5leHQgPSBjb250ZXh0LmdBbFtjdXJdW29mZnNldF07XG4gICAgICBpZiAoY29udGV4dC52aXNpdGVkW25leHRdID09PSBmYWxzZSkge1xuICAgICAgICBzdGFjay5wdXNoKFtjdXIsIG9mZnNldCArIDFdKTtcbiAgICAgICAgZGVlcGVyID0gdHJ1ZTtcbiAgICAgICAgY29udGV4dC52aXNpdGVkW25leHRdID0gdHJ1ZTtcbiAgICAgICAgY29udGV4dC5sYWJlbHNbbmV4dF0gPSBsYWJlbDtcbiAgICAgICAgY3VyID0gbmV4dDtcbiAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZmZzZXQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVlcGVyID09PSBmYWxzZSkge1xuICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICBbY3VyLCBvZmZzZXRdID0gc3RhY2sucG9wKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2l6ZShsYWJlbHMpIHtcbiAgdmFyIG5uID0gbGFiZWxzLmxlbmd0aCxcbiAgICBjb3VudGVyID0ge30sXG4gICAgaSwgbGFiZWw7XG4gIGZvciAoaSA9IDA7IGkgPCBubjsgaSsrKSB7XG4gICAgbGFiZWwgPSBsYWJlbHNbaV07XG4gICAgY291bnRlcltsYWJlbF0gPSBjb3VudGVyW2xhYmVsXSA/IGNvdW50ZXJbbGFiZWxdICsgMSA6IDE7XG4gIH1cblxuICB2YXIgc2l6ZXMgPSBbXTtcbiAgZm9yIChsYWJlbCBpbiBjb3VudGVyKSB7XG4gICAgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoY291bnRlciwgbGFiZWwpKSB7XG4gICAgICBzaXplcy5wdXNoKGNvdW50ZXJbbGFiZWxdKTtcbiAgICB9XG4gIH1cblxuICBzaXplcyA9IHNpemVzLnNvcnQoKGEsIGIpID0+IGIgLSBhKTtcbiAgcmV0dXJuIHNpemVzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudFNjY1NpemUoZ0FsKSB7XG4gIHZhciBvcmRlciA9IHByZXByb2Nlc3MoZ0FsKSxcbiAgICBsYWJlbHMgPSBtYWtlTGFiZWxzKGdBbCwgb3JkZXIpLFxuICAgIHNpemVzID0gZ2V0U2l6ZShsYWJlbHMpO1xuICByZXR1cm4gc2l6ZXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb3VudHNjY3NpemUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9