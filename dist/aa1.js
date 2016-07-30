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
	
	var _countquicksortcmp = __webpack_require__(2);
	
	var _countquicksortcmp2 = _interopRequireDefault(_countquicksortcmp);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  countInversion: _countinversion2.default,
	  countQuickSortCmp: _countquicksortcmp2.default
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNWJlMGZkNzNiMGZlMTA4MDA5OSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvdW50aW52ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3VudHF1aWNrc29ydGNtcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7QUFDQTs7Ozs7O21CQUVlO0FBQ2IsMkNBRGE7QUFFYjtBQUZhLEU7Ozs7Ozs7Ozs7OzttQkMwQ1MsYztBQTdDeEIsVUFBUyxZQUFULENBQXNCLENBQXRCLEVBQXlCLEdBQXpCLEVBQThCLEdBQTlCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3RDLE9BQUksTUFBTSxHQUFOLElBQWEsQ0FBakIsRUFBb0I7QUFDbEIsWUFBTyxDQUFQO0FBQ0QsSUFGRCxNQUVPLElBQUksTUFBTSxHQUFOLEtBQWMsQ0FBbEIsRUFBcUI7QUFDMUIsU0FBSSxFQUFFLEdBQUYsS0FBVSxFQUFFLE1BQU0sQ0FBUixDQUFkLEVBQTBCO0FBQ3hCLGNBQU8sQ0FBUDtBQUNELE1BRkQsTUFFTztBQUNMLFdBQUksTUFBTSxFQUFFLEdBQUYsQ0FBVjtBQUNBLFNBQUUsR0FBRixJQUFTLEVBQUUsTUFBTSxDQUFSLENBQVQ7QUFDQSxTQUFFLE1BQU0sQ0FBUixJQUFh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LGlCQUFpQixjQUFqQixLQUFvQyxDQUF4QyxFQUEyQztBQUN6QyxZQUFPLEdBQVA7QUFDRDtBQUNELE9BQUksQ0FBQyxjQUFELEdBQWtCLGNBQWxCLEtBQXFDLENBQXpDLEVBQTRDO0FBQzFDLFlBQU8sR0FBUDtBQUNEO0FBQ0QsT0FBSSxDQUFDLGNBQUQsR0FBa0IsQ0FBQyxjQUFuQixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxZQUFPLE1BQU0sQ0FBYjtBQUNEO0FBQ0Q7QUFDRDs7QUFFYyxVQUFTLGlCQUFULENBQTJCLENBQTNCLEVBQThCLFFBQTlCLEVBQXdDO0FBQ3JELE9BQUksTUFBTSxFQUFFLE1BQVo7QUFDQSxPQUFJLEdBQUosRUFBUztBQUNQLFNBQUksVUFBVSxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQWQ7QUFBQSxTQUNFLGNBQWMsZUFBZSxRQUFmLENBRGhCO0FBRUEsWUFBTyxhQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsR0FBekIsRUFBOEIsV0FBOUIsQ0FBUDtBQUNEO0FBQ0QsVUFBTyxDQUFQO0FBQ0QiLCJmaWxlIjoiYWExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYWExXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFhMVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZDViZTBmZDczYjBmZTEwODAwOTlcbiAqKi8iLCJpbXBvcnQgY291bnRJbnZlcnNpb24gZnJvbSAnLi9jb3VudGludmVyc2lvbic7XG5pbXBvcnQgY291bnRRdWlja1NvcnRDbXAgZnJvbSAnLi9jb3VudHF1aWNrc29ydGNtcCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY291bnRJbnZlcnNpb246IGNvdW50SW52ZXJzaW9uLFxuICBjb3VudFF1aWNrU29ydENtcDogY291bnRRdWlja1NvcnRDbXBcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImZ1bmN0aW9uIHNvcnRBbmRDb3VudChhLCBiZWcsIGVuZCwgYnVmKSB7XG4gIGlmIChlbmQgLSBiZWcgPD0gMSkge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2UgaWYgKGVuZCAtIGJlZyA9PT0gMikge1xuICAgIGlmIChhW2JlZ10gPD0gYVtiZWcgKyAxXSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0bXAgPSBhW2JlZ107XG4gICAgICBhW2JlZ10gPSBhW2JlZyArIDFdO1xuICAgICAgYVtiZWcgKyAxXSA9IHRtcDtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoYmVnICsgZW5kKSAvIDIpLFxuICAgICAgaW52TGVmdCA9IHNvcnRBbmRDb3VudChhLCBiZWcsIG1pZCwgYnVmKSxcbiAgICAgIGludlJpZ2h0ID0gc29ydEFuZENvdW50KGEsIG1pZCwgZW5kLCBidWYpLFxuICAgICAgaW52U3BsaXQgPSBtZXJnZUFuZENvdW50KGEsIGJlZywgbWlkLCBlbmQsIGJ1Zik7XG4gICAgcmV0dXJuIGludkxlZnQgKyBpbnZSaWdodCArIGludlNwbGl0O1xuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlQW5kQ291bnQoYSwgYmVnLCBtaWQsIGVuZCwgYnVmKSB7XG4gIGZvciAobGV0IGkgPSBiZWc7IGkgPCBlbmQ7IGkrKykge1xuICAgIGJ1ZltpXSA9IGFbaV07XG4gIH1cbiAgbGV0IGxlZnRMZW4gPSBtaWQgLSBiZWcsXG4gICAgcmlnaHRMZW4gPSBlbmQgLSBtaWQsXG4gICAgbGVuID0gZW5kIC0gYmVnLFxuICAgIGwgPSAwLFxuICAgIHIgPSAwLFxuICAgIGludiA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBsZXQgdXNlTCA9IChyID09PSByaWdodExlbikgfHwgKGwgIT09IGxlZnRMZW4gJiYgYnVmW2JlZyArIGxdIDw9IGJ1ZlttaWQgKyByXSk7XG4gICAgaWYgKHVzZUwpIHtcbiAgICAgIGFbYmVnICsgaV0gPSBidWZbYmVnICsgbF07XG4gICAgICBsKys7XG4gICAgICBpbnYgKz0gcjtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtiZWcgKyBpXSA9IGJ1ZlttaWQgKyByXTtcbiAgICAgIHIrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGludjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY291bnRJbnZlcnNpb24oYSkge1xuICBsZXQgbGVuID0gYS5sZW5ndGg7XG4gIGlmIChsZW4pIHtcbiAgICBsZXQgYnVmID0gbmV3IEFycmF5KGxlbik7XG4gICAgcmV0dXJuIHNvcnRBbmRDb3VudChhLCAwLCBsZW4sIGJ1Zik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvdW50aW52ZXJzaW9uLmpzXG4gKiovIiwiZnVuY3Rpb24gc29ydEFuZENvdW50KGEsIGJlZywgZW5kLCBjaG9vc2VQaXZvdCkge1xuICBpZiAoZW5kIC0gYmVnIDw9IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBsZXQgcGl2b3QgPSBjaG9vc2VQaXZvdChhLCBiZWcsIGVuZCksXG4gICAgaSA9IGJlZyArIDEsXG4gICAgaiA9IGJlZyArIDEsXG4gICAgY291bnQgPSBlbmQgLSBiZWcgLSAxO1xuICBbYVtiZWddLCBhW3Bpdm90XV0gPSBbYVtwaXZvdF0sIGFbYmVnXV07XG4gIHdoaWxlIChqIDwgZW5kKSB7XG4gICAgaWYgKGFbal0gPCBhW2JlZ10pIHtcbiAgICAgIFthW2pdLCBhW2ldXSA9IFthW2ldLCBhW2pdXTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgaisrO1xuICB9XG4gIFthW2JlZ10sIGFbaSAtIDFdXSA9IFthW2kgLSAxXSwgYVtiZWddXTtcbiAgY291bnQgKz0gc29ydEFuZENvdW50KGEsIGJlZywgaSAtIDEsIGNob29zZVBpdm90KTtcbiAgY291bnQgKz0gc29ydEFuZENvdW50KGEsIGksIGVuZCwgY2hvb3NlUGl2b3QpO1xuICByZXR1cm4gY291bnQ7XG59XG5cbmZ1bmN0aW9uIGdlbkNob29zZVBpdm90KHN0cmF0ZWd5KSB7XG4gIHN3aXRjaCAoc3RyYXRlZ3kpIHtcbiAgICBjYXNlICdmaXJzdCc6XG4gICAgICByZXR1cm4gY2hvb3NlUGl2b3RGaXJzdDtcbiAgICBjYXNlICdsYXN0JzpcbiAgICAgIHJldHVybiBjaG9vc2VQaXZvdExhc3Q7XG4gICAgY2FzZSAnbWVkaWFuJzpcbiAgICAgIHJldHVybiBjaG9vc2VQaXZvdE1lZGlhbjtcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gZG8gbm90aGluZ1xuICB9XG59XG5cbmZ1bmN0aW9uIGNob29zZVBpdm90Rmlyc3QoYSwgYmVnLCBlbmQpIHtcbiAgcmV0dXJuIGJlZztcbn1cblxuZnVuY3Rpb24gY2hvb3NlUGl2b3RMYXN0KGEsIGJlZywgZW5kKSB7XG4gIHJldHVybiBlbmQgLSAxO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VQaXZvdE1lZGlhbihhLCBiZWcsIGVuZCkge1xuICBsZXQgbWlkID0gTWF0aC5mbG9vcigoYmVnICsgZW5kIC0gMSkgLyAyKSxcbiAgICBiZWdMZXNzVGhhbk1pZCA9IChhW2JlZ10gPCBhW21pZF0pLFxuICAgIGJlZ0xlc3NUaGFuRW5kID0gKGFbYmVnXSA8IGFbZW5kIC0gMV0pLFxuICAgIG1pZExlc3NUaGFuRW5kID0gKGFbbWlkXSA8IGFbZW5kIC0gMV0pO1xuICBpZiAoYmVnTGVzc1RoYW5NaWQgKyBiZWdMZXNzVGhhbkVuZCA9PT0gMSkge1xuICAgIHJldHVybiBiZWc7XG4gIH1cbiAgaWYgKCFiZWdMZXNzVGhhbk1pZCArIG1pZExlc3NUaGFuRW5kID09PSAxKSB7XG4gICAgcmV0dXJuIG1pZDtcbiAgfVxuICBpZiAoIWJlZ0xlc3NUaGFuRW5kICsgIW1pZExlc3NUaGFuRW5kID09PSAxKSB7XG4gICAgcmV0dXJuIGVuZCAtIDE7XG4gIH1cbiAgLy8gZG8gbm90aGluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudFF1aWNrU29ydENtcChhLCBzdHJhdGVneSkge1xuICBsZXQgbGVuID0gYS5sZW5ndGg7XG4gIGlmIChsZW4pIHtcbiAgICBsZXQgYUNvcGllZCA9IGEuc2xpY2UoMCksXG4gICAgICBjaG9vc2VQaXZvdCA9IGdlbkNob29zZVBpdm90KHN0cmF0ZWd5KTtcbiAgICByZXR1cm4gc29ydEFuZENvdW50KGFDb3BpZWQsIDAsIGxlbiwgY2hvb3NlUGl2b3QpO1xuICB9XG4gIHJldHVybiAwO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY291bnRxdWlja3NvcnRjbXAuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9