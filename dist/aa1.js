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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  countInversion: _countinversion2.default,
	  countQuickSortCmp: _countquicksortcmp2.default,
	  countMinCut: _countmincut2.default
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
	  if (ufArr[i].parent != i) ufArr[i].parent = find(ufArr, ufArr[i].parent);
	
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
	
	function countMinCut(gAl) {
	  var repeat = arguments.length <= 1 || arguments[1] === undefined ? gAl.length * gAl.length * Math.log(gAl.length + 1) : arguments[1];
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4ODg5Y2Q1NzA3NDI0M2U5MzRiYiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdW50aW52ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3VudG1pbmN1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRxdWlja3NvcnRjbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O21CQUVlO0FBQ2IsMkNBRGE7QUFFYixpREFGYTtBQUdiO0FBSGEsRTs7Ozs7Ozs7Ozs7O21CQ3lDUyxjO0FBN0N4QixVQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsRUFBbUMsR0FBbkMsRUFBd0M7QUFDdEMsT0FBSSxNQUFNLEdBQU4sSUFBYSxDQUFqQixFQUFvQjtBQUNsQixZQUFPLENBQVA7QUFDRCxJQUZELE1BRU8sSUFBSSxNQUFNLEdBQU4sS0FBYyxDQUFsQixFQUFxQjtBQUMxQixTQUFJLEVBQUUsR0FBRixLQUFVLEVBQUUsTUFBTSxDQUFSLENBQWQsRUFBMEI7QUFDeEIsY0FBTyxDQUFQO0FBQ0QsTUFGRCxNQUVPO0FBQ0wsV0FBSSxNQUFNLEVBQUUsR0FBRixDQUFWO0FBQ0EsU0FBRSxH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QUFRLENBQVIsQ0FBZDtBQUFBLFNBQ0UsY0FBYyxlQUFlLFFBQWYsQ0FEaEI7QUFFQSxZQUFPLGFBQWEsT0FBYixFQUFzQixDQUF0QixFQUF5QixHQUF6QixFQUE4QixXQUE5QixDQUFQO0FBQ0Q7QUFDRCxVQUFPLENBQVA7QUFDRCIsImZpbGUiOiJhYTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhYTFcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYWExXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4ODg5Y2Q1NzA3NDI0M2U5MzRiYlxuICoqLyIsImltcG9ydCBjb3VudEludmVyc2lvbiBmcm9tICcuL2NvdW50aW52ZXJzaW9uJztcbmltcG9ydCBjb3VudFF1aWNrU29ydENtcCBmcm9tICcuL2NvdW50cXVpY2tzb3J0Y21wJztcbmltcG9ydCBjb3VudE1pbkN1dCBmcm9tICcuL2NvdW50bWluY3V0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb3VudEludmVyc2lvbjogY291bnRJbnZlcnNpb24sXG4gIGNvdW50UXVpY2tTb3J0Q21wOiBjb3VudFF1aWNrU29ydENtcCxcbiAgY291bnRNaW5DdXQ6IGNvdW50TWluQ3V0XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJmdW5jdGlvbiBzb3J0QW5kQ291bnQoYSwgYmVnLCBlbmQsIGJ1Zikge1xuICBpZiAoZW5kIC0gYmVnIDw9IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmIChlbmQgLSBiZWcgPT09IDIpIHtcbiAgICBpZiAoYVtiZWddIDw9IGFbYmVnICsgMV0pIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdG1wID0gYVtiZWddO1xuICAgICAgYVtiZWddID0gYVtiZWcgKyAxXTtcbiAgICAgIGFbYmVnICsgMV0gPSB0bXA7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IG1pZCA9IE1hdGguZmxvb3IoKGJlZyArIGVuZCkgLyAyKSxcbiAgICAgIGludkxlZnQgPSBzb3J0QW5kQ291bnQoYSwgYmVnLCBtaWQsIGJ1ZiksXG4gICAgICBpbnZSaWdodCA9IHNvcnRBbmRDb3VudChhLCBtaWQsIGVuZCwgYnVmKSxcbiAgICAgIGludlNwbGl0ID0gbWVyZ2VBbmRDb3VudChhLCBiZWcsIG1pZCwgZW5kLCBidWYpO1xuICAgIHJldHVybiBpbnZMZWZ0ICsgaW52UmlnaHQgKyBpbnZTcGxpdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUFuZENvdW50KGEsIGJlZywgbWlkLCBlbmQsIGJ1Zikge1xuICBmb3IgKGxldCBpID0gYmVnOyBpIDwgZW5kOyBpKyspIHtcbiAgICBidWZbaV0gPSBhW2ldO1xuICB9XG4gIGxldCBsZWZ0TGVuID0gbWlkIC0gYmVnLFxuICAgIHJpZ2h0TGVuID0gZW5kIC0gbWlkLFxuICAgIGxlbiA9IGVuZCAtIGJlZyxcbiAgICBsID0gMCxcbiAgICByID0gMCxcbiAgICBpbnYgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbGV0IHVzZUwgPSAociA9PT0gcmlnaHRMZW4pIHx8IChsICE9PSBsZWZ0TGVuICYmIGJ1ZltiZWcgKyBsXSA8PSBidWZbbWlkICsgcl0pO1xuICAgIGlmICh1c2VMKSB7XG4gICAgICBhW2JlZyArIGldID0gYnVmW2JlZyArIGxdO1xuICAgICAgbCsrO1xuICAgICAgaW52ICs9IHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFbYmVnICsgaV0gPSBidWZbbWlkICsgcl07XG4gICAgICByKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbnY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvdW50SW52ZXJzaW9uKGEpIHtcbiAgbGV0IGxlbiA9IGEubGVuZ3RoO1xuICBpZiAobGVuKSB7XG4gICAgbGV0IGJ1ZiA9IG5ldyBBcnJheShsZW4pO1xuICAgIHJldHVybiBzb3J0QW5kQ291bnQoYSwgMCwgbGVuLCBidWYpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb3VudGludmVyc2lvbi5qc1xuICoqLyIsImZ1bmN0aW9uIGZpbmQodWZBcnIsIGkpIHtcbiAgaWYgKHVmQXJyW2ldLnBhcmVudCAhPSBpKVxuICAgIHVmQXJyW2ldLnBhcmVudCA9IGZpbmQodWZBcnIsIHVmQXJyW2ldLnBhcmVudCk7XG5cbiAgcmV0dXJuIHVmQXJyW2ldLnBhcmVudDtcbn1cblxuZnVuY3Rpb24gdW5pb24odWZBcnIsIGksIGopIHtcbiAgbGV0IGlyb290ID0gZmluZCh1ZkFyciwgaSksXG4gICAganJvb3QgPSBmaW5kKHVmQXJyLCBqKTtcblxuICBpZiAodWZBcnJbaXJvb3RdLnJhbmsgPCB1ZkFycltqcm9vdF0ucmFuaylcbiAgICB1ZkFycltpcm9vdF0ucGFyZW50ID0ganJvb3Q7XG4gIGVsc2UgaWYgKHVmQXJyW2lyb290XS5yYW5rID4gdWZBcnJbanJvb3RdLnJhbmspXG4gICAgdWZBcnJbanJvb3RdLnBhcmVudCA9IGlyb290O1xuXG4gIGVsc2Uge1xuICAgIHVmQXJyW2pyb290XS5wYXJlbnQgPSBpcm9vdDtcbiAgICB1ZkFycltpcm9vdF0ucmFuaysrO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkamFjZW5jeUxpc3QyRWRnZUxpc3QoZ0FsKSB7XG4gIGxldCBnRWwgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnQWwubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdBbFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKGkgPCBnQWxbaV1bal0pIHtcbiAgICAgICAgZ0VsLnB1c2goW2ksIGdBbFtpXVtqXV0pXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBnRWw7XG59XG5cbmZ1bmN0aW9uIGNvdW50TWluQ3V0T25jZSh2biwgZ0VsKSB7XG4gIGxldCB1ZkFyciA9IG5ldyBBcnJheSh2bik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdm47IGkrKykge1xuICAgIHVmQXJyW2ldID0ge1xuICAgICAgcmFuazogMCxcbiAgICAgIHBhcmVudDogaVxuICAgIH07XG4gIH1cblxuICBsZXQgdkxlZnQgPSB2bixcbiAgICBlTGVmdCA9IGdFbC5sZW5ndGg7XG5cbiAgd2hpbGUgKHZMZWZ0ID4gMiAmJiBlTGVmdCA+IDApIHtcbiAgICBsZXQgZVNlbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVMZWZ0KSxcbiAgICAgIHNyYyA9IGZpbmQodWZBcnIsIGdFbFtlU2VsXVswXSksXG4gICAgICBkc3QgPSBmaW5kKHVmQXJyLCBnRWxbZVNlbF1bMV0pO1xuXG4gICAgaWYgKHNyYyAhPT0gZHN0KSB7XG4gICAgICB1bmlvbih1ZkFyciwgc3JjLCBkc3QpO1xuICAgICAgdkxlZnQtLTtcbiAgICB9XG5cbiAgICBbZ0VsW2VTZWxdLCBnRWxbZUxlZnQtMV1dID0gW2dFbFtlTGVmdC0xXSwgZ0VsW2VTZWxdXVxuICAgIGVMZWZ0LS07XG4gIH1cblxuICBsZXQgZUNyb3NzID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlTGVmdDsgaSsrKSB7XG4gICAgbGV0IHNyYyA9IGZpbmQodWZBcnIsIGdFbFtpXVswXSksXG4gICAgICBkc3QgPSBmaW5kKHVmQXJyLCBnRWxbaV1bMV0pO1xuXG4gICAgaWYgKHNyYyAhPT0gZHN0KSB7XG4gICAgICBlQ3Jvc3MrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZUNyb3NzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudE1pbkN1dChnQWwsIHJlcGVhdCA9IGdBbC5sZW5ndGggKiBnQWwubGVuZ3RoICogTWF0aC5sb2coZ0FsLmxlbmd0aCArIDEpKSB7XG4gIGxldCB2biA9IGdBbC5sZW5ndGgsXG4gICAgZ0VsID0gYWRqYWNlbmN5TGlzdDJFZGdlTGlzdChnQWwpLFxuICAgIG1pbkNvdW50ID0gY291bnRNaW5DdXRPbmNlKHZuLCBnRWwpO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICBtaW5Db3VudCA9IE1hdGgubWluKG1pbkNvdW50LCBjb3VudE1pbkN1dE9uY2Uodm4sIGdFbCkpO1xuICB9XG4gIHJldHVybiBtaW5Db3VudDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvdW50bWluY3V0LmpzXG4gKiovIiwiZnVuY3Rpb24gc29ydEFuZENvdW50KGEsIGJlZywgZW5kLCBjaG9vc2VQaXZvdCkge1xuICBpZiAoZW5kIC0gYmVnIDw9IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBsZXQgcGl2b3QgPSBjaG9vc2VQaXZvdChhLCBiZWcsIGVuZCksXG4gICAgaSA9IGJlZyArIDEsXG4gICAgaiA9IGJlZyArIDEsXG4gICAgY291bnQgPSBlbmQgLSBiZWcgLSAxO1xuICBbYVtiZWddLCBhW3Bpdm90XV0gPSBbYVtwaXZvdF0sIGFbYmVnXV07XG4gIHdoaWxlIChqIDwgZW5kKSB7XG4gICAgaWYgKGFbal0gPCBhW2JlZ10pIHtcbiAgICAgIFthW2pdLCBhW2ldXSA9IFthW2ldLCBhW2pdXTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgaisrO1xuICB9XG4gIFthW2JlZ10sIGFbaSAtIDFdXSA9IFthW2kgLSAxXSwgYVtiZWddXTtcbiAgY291bnQgKz0gc29ydEFuZENvdW50KGEsIGJlZywgaSAtIDEsIGNob29zZVBpdm90KTtcbiAgY291bnQgKz0gc29ydEFuZENvdW50KGEsIGksIGVuZCwgY2hvb3NlUGl2b3QpO1xuICByZXR1cm4gY291bnQ7XG59XG5cbmZ1bmN0aW9uIGdlbkNob29zZVBpdm90KHN0cmF0ZWd5KSB7XG4gIHN3aXRjaCAoc3RyYXRlZ3kpIHtcbiAgICBjYXNlICdmaXJzdCc6XG4gICAgICByZXR1cm4gY2hvb3NlUGl2b3RGaXJzdDtcbiAgICBjYXNlICdsYXN0JzpcbiAgICAgIHJldHVybiBjaG9vc2VQaXZvdExhc3Q7XG4gICAgY2FzZSAnbWVkaWFuJzpcbiAgICAgIHJldHVybiBjaG9vc2VQaXZvdE1lZGlhbjtcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gZG8gbm90aGluZ1xuICB9XG59XG5cbmZ1bmN0aW9uIGNob29zZVBpdm90Rmlyc3QoYSwgYmVnLCBlbmQpIHtcbiAgcmV0dXJuIGJlZztcbn1cblxuZnVuY3Rpb24gY2hvb3NlUGl2b3RMYXN0KGEsIGJlZywgZW5kKSB7XG4gIHJldHVybiBlbmQgLSAxO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VQaXZvdE1lZGlhbihhLCBiZWcsIGVuZCkge1xuICBsZXQgbWlkID0gTWF0aC5mbG9vcigoYmVnICsgZW5kIC0gMSkgLyAyKSxcbiAgICBiZWdMZXNzVGhhbk1pZCA9IChhW2JlZ10gPCBhW21pZF0pLFxuICAgIGJlZ0xlc3NUaGFuRW5kID0gKGFbYmVnXSA8IGFbZW5kIC0gMV0pLFxuICAgIG1pZExlc3NUaGFuRW5kID0gKGFbbWlkXSA8IGFbZW5kIC0gMV0pO1xuICBpZiAoYmVnTGVzc1RoYW5NaWQgKyBiZWdMZXNzVGhhbkVuZCA9PT0gMSkge1xuICAgIHJldHVybiBiZWc7XG4gIH1cbiAgaWYgKCFiZWdMZXNzVGhhbk1pZCArIG1pZExlc3NUaGFuRW5kID09PSAxKSB7XG4gICAgcmV0dXJuIG1pZDtcbiAgfVxuICBpZiAoIWJlZ0xlc3NUaGFuRW5kICsgIW1pZExlc3NUaGFuRW5kID09PSAxKSB7XG4gICAgcmV0dXJuIGVuZCAtIDE7XG4gIH1cbiAgLy8gZG8gbm90aGluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudFF1aWNrU29ydENtcChhLCBzdHJhdGVneSkge1xuICBsZXQgbGVuID0gYS5sZW5ndGg7XG4gIGlmIChsZW4pIHtcbiAgICBsZXQgYUNvcGllZCA9IGEuc2xpY2UoMCksXG4gICAgICBjaG9vc2VQaXZvdCA9IGdlbkNob29zZVBpdm90KHN0cmF0ZWd5KTtcbiAgICByZXR1cm4gc29ydEFuZENvdW50KGFDb3BpZWQsIDAsIGxlbiwgY2hvb3NlUGl2b3QpO1xuICB9XG4gIHJldHVybiAwO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY291bnRxdWlja3NvcnRjbXAuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9