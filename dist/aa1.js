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
	function countMinCut(g) {
	  var repeat = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	
	  return 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmODJhOThlMDY1YTBiMGZkNzQ0OCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdW50aW52ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3VudG1pbmN1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRxdWlja3NvcnRjbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O21CQUVlO0FBQ2IsMkNBRGE7QUFFYixpREFGYTtBQUdiO0FBSGEsRTs7Ozs7Ozs7Ozs7O21CQ3lDUyxjO0FBN0N4QixVQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsRUFBbUMsR0FBbkMsRUFBd0M7QUFDdEMsT0FBSSxNQUFNLEdBQU4sSUFBYSxDQUFqQixFQUFvQjtBQUNsQixZQUFPLENBQVA7QUFDRCxJQUZELE1BRU8sSUFBSSxNQUFNLEdBQU4sS0FBYyxDQUFsQixFQUFxQjtBQUMxQixTQUFJLEVBQUUsR0FBRixLQUFVLEVBQUUsTUFBTSxDQUFSLENBQWQsRUFBMEI7QUFDeEIsY0FBTyxDQUFQO0FBQ0QsTUFGRCxNQUVPO0FBQ0wsV0FBSSxNQUFNLEVBQUUsR0FBRixDQUFWO0FBQ0EsU0FBRSxH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Q0UsaUJBQWtCLEVBQUUsR0FBRixJQUFTLEVBQUUsR0FBRixDQUQ3QjtBQUFBLE9BRUUsaUJBQWtCLEVBQUUsR0FBRixJQUFTLEVBQUUsTUFBTSxDQUFSLENBRjdCO0FBQUEsT0FHRSxpQkFBa0IsRUFBRSxHQUFGLElBQVMsRUFBRSxNQUFNLENBQVIsQ0FIN0I7QUFJQSxPQUFJLGlCQUFpQixjQUFqQixLQUFvQyxDQUF4QyxFQUEyQztBQUN6QyxZQUFPLEdBQVA7QUFDRDtBQUNELE9BQUksQ0FBQyxjQUFELEdBQWtCLGNBQWxCLEtBQXFDLENBQXpDLEVBQTRDO0FBQzFDLFlBQU8sR0FBUDtBQUNEO0FBQ0QsT0FBSSxDQUFDLGNBQUQsR0FBa0IsQ0FBQyxjQUFuQixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxZQUFPLE1BQU0sQ0FBYjtBQUNEO0FBQ0Q7QUFDRDs7QUFFYyxVQUFTLGlCQUFULENBQTJCLENBQTNCLEVBQThCLFFBQTlCLEVBQXdDO0FBQ3JELE9BQUksTUFBTSxFQUFFLE1BQVo7QUFDQSxPQUFJLEdBQUosRUFBUztBQUNQLFNBQUksVUFBVSxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQWQ7QUFBQSxTQUNFLGNBQWMsZUFBZSxRQUFmLENBRGhCO0FBRUEsWUFBTyxhQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsR0FBekIsRUFBOEIsV0FBOUIsQ0FBUDtBQUNEO0FBQ0QsVUFBTyxDQUFQO0FBQ0QiLCJmaWxlIjoiYWExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYWExXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFhMVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjgyYTk4ZTA2NWEwYjBmZDc0NDhcbiAqKi8iLCJpbXBvcnQgY291bnRJbnZlcnNpb24gZnJvbSAnLi9jb3VudGludmVyc2lvbic7XG5pbXBvcnQgY291bnRRdWlja1NvcnRDbXAgZnJvbSAnLi9jb3VudHF1aWNrc29ydGNtcCc7XG5pbXBvcnQgY291bnRNaW5DdXQgZnJvbSAnLi9jb3VudG1pbmN1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY291bnRJbnZlcnNpb246IGNvdW50SW52ZXJzaW9uLFxuICBjb3VudFF1aWNrU29ydENtcDogY291bnRRdWlja1NvcnRDbXAsXG4gIGNvdW50TWluQ3V0OiBjb3VudE1pbkN1dFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiZnVuY3Rpb24gc29ydEFuZENvdW50KGEsIGJlZywgZW5kLCBidWYpIHtcbiAgaWYgKGVuZCAtIGJlZyA8PSAxKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSBpZiAoZW5kIC0gYmVnID09PSAyKSB7XG4gICAgaWYgKGFbYmVnXSA8PSBhW2JlZyArIDFdKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRtcCA9IGFbYmVnXTtcbiAgICAgIGFbYmVnXSA9IGFbYmVnICsgMV07XG4gICAgICBhW2JlZyArIDFdID0gdG1wO1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChiZWcgKyBlbmQpIC8gMiksXG4gICAgICBpbnZMZWZ0ID0gc29ydEFuZENvdW50KGEsIGJlZywgbWlkLCBidWYpLFxuICAgICAgaW52UmlnaHQgPSBzb3J0QW5kQ291bnQoYSwgbWlkLCBlbmQsIGJ1ZiksXG4gICAgICBpbnZTcGxpdCA9IG1lcmdlQW5kQ291bnQoYSwgYmVnLCBtaWQsIGVuZCwgYnVmKTtcbiAgICByZXR1cm4gaW52TGVmdCArIGludlJpZ2h0ICsgaW52U3BsaXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VBbmRDb3VudChhLCBiZWcsIG1pZCwgZW5kLCBidWYpIHtcbiAgZm9yIChsZXQgaSA9IGJlZzsgaSA8IGVuZDsgaSsrKSB7XG4gICAgYnVmW2ldID0gYVtpXTtcbiAgfVxuICBsZXQgbGVmdExlbiA9IG1pZCAtIGJlZyxcbiAgICByaWdodExlbiA9IGVuZCAtIG1pZCxcbiAgICBsZW4gPSBlbmQgLSBiZWcsXG4gICAgbCA9IDAsXG4gICAgciA9IDAsXG4gICAgaW52ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGxldCB1c2VMID0gKHIgPT09IHJpZ2h0TGVuKSB8fCAobCAhPT0gbGVmdExlbiAmJiBidWZbYmVnICsgbF0gPD0gYnVmW21pZCArIHJdKTtcbiAgICBpZiAodXNlTCkge1xuICAgICAgYVtiZWcgKyBpXSA9IGJ1ZltiZWcgKyBsXTtcbiAgICAgIGwrKztcbiAgICAgIGludiArPSByO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2JlZyArIGldID0gYnVmW21pZCArIHJdO1xuICAgICAgcisrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW52O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudEludmVyc2lvbihhKSB7XG4gIGxldCBsZW4gPSBhLmxlbmd0aDtcbiAgaWYgKGxlbikge1xuICAgIGxldCBidWYgPSBuZXcgQXJyYXkobGVuKTtcbiAgICByZXR1cm4gc29ydEFuZENvdW50KGEsIDAsIGxlbiwgYnVmKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY291bnRpbnZlcnNpb24uanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudE1pbkN1dChnLCByZXBlYXQgPSAxKSB7XG4gIHJldHVybiAwO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY291bnRtaW5jdXQuanNcbiAqKi8iLCJmdW5jdGlvbiBzb3J0QW5kQ291bnQoYSwgYmVnLCBlbmQsIGNob29zZVBpdm90KSB7XG4gIGlmIChlbmQgLSBiZWcgPD0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGxldCBwaXZvdCA9IGNob29zZVBpdm90KGEsIGJlZywgZW5kKSxcbiAgICBpID0gYmVnICsgMSxcbiAgICBqID0gYmVnICsgMSxcbiAgICBjb3VudCA9IGVuZCAtIGJlZyAtIDE7XG4gIFthW2JlZ10sIGFbcGl2b3RdXSA9IFthW3Bpdm90XSwgYVtiZWddXTtcbiAgd2hpbGUgKGogPCBlbmQpIHtcbiAgICBpZiAoYVtqXSA8IGFbYmVnXSkge1xuICAgICAgW2Fbal0sIGFbaV1dID0gW2FbaV0sIGFbal1dO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICBqKys7XG4gIH1cbiAgW2FbYmVnXSwgYVtpIC0gMV1dID0gW2FbaSAtIDFdLCBhW2JlZ11dO1xuICBjb3VudCArPSBzb3J0QW5kQ291bnQoYSwgYmVnLCBpIC0gMSwgY2hvb3NlUGl2b3QpO1xuICBjb3VudCArPSBzb3J0QW5kQ291bnQoYSwgaSwgZW5kLCBjaG9vc2VQaXZvdCk7XG4gIHJldHVybiBjb3VudDtcbn1cblxuZnVuY3Rpb24gZ2VuQ2hvb3NlUGl2b3Qoc3RyYXRlZ3kpIHtcbiAgc3dpdGNoIChzdHJhdGVneSkge1xuICAgIGNhc2UgJ2ZpcnN0JzpcbiAgICAgIHJldHVybiBjaG9vc2VQaXZvdEZpcnN0O1xuICAgIGNhc2UgJ2xhc3QnOlxuICAgICAgcmV0dXJuIGNob29zZVBpdm90TGFzdDtcbiAgICBjYXNlICdtZWRpYW4nOlxuICAgICAgcmV0dXJuIGNob29zZVBpdm90TWVkaWFuO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBkbyBub3RoaW5nXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hvb3NlUGl2b3RGaXJzdChhLCBiZWcsIGVuZCkge1xuICByZXR1cm4gYmVnO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VQaXZvdExhc3QoYSwgYmVnLCBlbmQpIHtcbiAgcmV0dXJuIGVuZCAtIDE7XG59XG5cbmZ1bmN0aW9uIGNob29zZVBpdm90TWVkaWFuKGEsIGJlZywgZW5kKSB7XG4gIGxldCBtaWQgPSBNYXRoLmZsb29yKChiZWcgKyBlbmQgLSAxKSAvIDIpLFxuICAgIGJlZ0xlc3NUaGFuTWlkID0gKGFbYmVnXSA8IGFbbWlkXSksXG4gICAgYmVnTGVzc1RoYW5FbmQgPSAoYVtiZWddIDwgYVtlbmQgLSAxXSksXG4gICAgbWlkTGVzc1RoYW5FbmQgPSAoYVttaWRdIDwgYVtlbmQgLSAxXSk7XG4gIGlmIChiZWdMZXNzVGhhbk1pZCArIGJlZ0xlc3NUaGFuRW5kID09PSAxKSB7XG4gICAgcmV0dXJuIGJlZztcbiAgfVxuICBpZiAoIWJlZ0xlc3NUaGFuTWlkICsgbWlkTGVzc1RoYW5FbmQgPT09IDEpIHtcbiAgICByZXR1cm4gbWlkO1xuICB9XG4gIGlmICghYmVnTGVzc1RoYW5FbmQgKyAhbWlkTGVzc1RoYW5FbmQgPT09IDEpIHtcbiAgICByZXR1cm4gZW5kIC0gMTtcbiAgfVxuICAvLyBkbyBub3RoaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvdW50UXVpY2tTb3J0Q21wKGEsIHN0cmF0ZWd5KSB7XG4gIGxldCBsZW4gPSBhLmxlbmd0aDtcbiAgaWYgKGxlbikge1xuICAgIGxldCBhQ29waWVkID0gYS5zbGljZSgwKSxcbiAgICAgIGNob29zZVBpdm90ID0gZ2VuQ2hvb3NlUGl2b3Qoc3RyYXRlZ3kpO1xuICAgIHJldHVybiBzb3J0QW5kQ291bnQoYUNvcGllZCwgMCwgbGVuLCBjaG9vc2VQaXZvdCk7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb3VudHF1aWNrc29ydGNtcC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=