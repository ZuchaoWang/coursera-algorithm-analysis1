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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _countinversion = __webpack_require__(1);\n\nvar _countinversion2 = _interopRequireDefault(_countinversion);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = {\n  countInversion: _countinversion2.default\n};\nmodule.exports = exports['default'];//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O2tCQUVlO0FBQ2I7QUFEYSxDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY291bnRJbnZlcnNpb24gZnJvbSAnLi9jb3VudGludmVyc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY291bnRJbnZlcnNpb246IGNvdW50SW52ZXJzaW9uXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = countInversion;\nfunction sortAndCount(a, beg, end, buf) {\n  if (end - beg <= 1) {\n    return 0;\n  } else if (end - beg == 2) {\n    if (a[beg] <= a[beg + 1]) {\n      return 0;\n    } else {\n      var tmp = a[beg];\n      a[beg] = a[beg + 1];\n      a[beg + 1] = tmp;\n      return 1;\n    }\n  } else {\n    var mid = Math.floor((beg + end) / 2),\n        invLeft = sortAndCount(a, beg, mid, buf),\n        invRight = sortAndCount(a, mid, end, buf),\n        invSplit = mergeAndCount(a, beg, mid, end, buf);\n    return invLeft + invRight + invSplit;\n  }\n}\n\nfunction mergeAndCount(a, beg, mid, end, buf) {\n  for (var i = beg; i < end; i++) {\n    buf[i] = a[i];\n  }\n  var leftLen = mid - beg,\n      rightLen = end - mid,\n      len = end - beg,\n      l = 0,\n      r = 0,\n      inv = 0;\n  for (var _i = 0; _i < len; _i++) {\n    var useL = r === rightLen || l !== leftLen && buf[beg + l] <= buf[mid + r];\n    if (useL) {\n      a[beg + _i] = buf[beg + l];\n      l++;\n      inv += r;\n    } else {\n      a[beg + _i] = buf[mid + r];\n      r++;\n    }\n  }\n  return inv;\n}\n\nfunction countInversion(a) {\n  var len = a.length;\n  if (len) {\n    var buf = new Array(len);\n    return sortAndCount(a, 0, len, buf);\n  } else {\n    return 0;\n  }\n}\nmodule.exports = exports[\"default\"];//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY291bnRpbnZlcnNpb24uanM/MGZhMSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkE2Q3dCLGM7QUE3Q3hCLFNBQVMsWUFBVCxDQUFzQixDQUF0QixFQUF5QixHQUF6QixFQUE4QixHQUE5QixFQUFtQyxHQUFuQyxFQUF3QztBQUN0QyxNQUFJLE1BQU0sR0FBTixJQUFhLENBQWpCLEVBQW9CO0FBQ2xCLFdBQU8sQ0FBUDtBQUNELEdBRkQsTUFFTyxJQUFJLE1BQU0sR0FBTixJQUFhLENBQWpCLEVBQW9CO0FBQ3pCLFFBQUksRUFBRSxHQUFGLEtBQVUsRUFBRSxNQUFNLENBQVIsQ0FBZCxFQUEwQjtBQUN4QixhQUFPLENBQVA7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFJLE1BQU0sRUFBRSxHQUFGLENBQVY7QUFDQSxRQUFFLEdBQUYsSUFBUyxFQUFFLE1BQU0sQ0FBUixDQUFUO0FBQ0EsUUFBRSxNQUFNLENBQVIsSUFBYSxHQUFiO0FBQ0EsYUFBTyxDQUFQO0FBQ0Q7QUFDRixHQVRNLE1BU0E7QUFDTCxRQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsQ0FBQyxNQUFNLEdBQVAsSUFBYyxDQUF6QixDQUFWO0FBQUEsUUFDRSxVQUFVLGFBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixDQURaO0FBQUEsUUFFRSxXQUFXLGFBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixDQUZiO0FBQUEsUUFHRSxXQUFXLGNBQWMsQ0FBZCxFQUFpQixHQUFqQixFQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQyxHQUFoQyxDQUhiO0FBSUEsV0FBTyxVQUFVLFFBQVYsR0FBcUIsUUFBNUI7QUFDRDtBQUNGOztBQUVELFNBQVMsYUFBVCxDQUF1QixDQUF2QixFQUEwQixHQUExQixFQUErQixHQUEvQixFQUFvQyxHQUFwQyxFQUF5QyxHQUF6QyxFQUE4QztBQUM1QyxPQUFLLElBQUksSUFBSSxHQUFiLEVBQWtCLElBQUksR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0M7QUFDOUIsUUFBSSxDQUFKLElBQVMsRUFBRSxDQUFGLENBQVQ7QUFDRDtBQUNELE1BQUksVUFBVSxNQUFNLEdBQXBCO0FBQUEsTUFDRSxXQUFXLE1BQU0sR0FEbkI7QUFBQSxNQUVFLE1BQU0sTUFBTSxHQUZkO0FBQUEsTUFHRSxJQUFJLENBSE47QUFBQSxNQUlFLElBQUksQ0FKTjtBQUFBLE1BS0UsTUFBTSxDQUxSO0FBTUEsT0FBSyxJQUFJLEtBQUksQ0FBYixFQUFnQixLQUFJLEdBQXBCLEVBQXlCLElBQXpCLEVBQThCO0FBQzVCLFFBQUksT0FBUSxNQUFNLFFBQVAsSUFBcUIsTUFBTSxPQUFOLElBQWlCLElBQUksTUFBTSxDQUFWLEtBQWdCLElBQUksTUFBTSxDQUFWLENBQWpFO0FBQ0EsUUFBSSxJQUFKLEVBQVU7QUFDUixRQUFFLE1BQU0sRUFBUixJQUFhLElBQUksTUFBTSxDQUFWLENBQWI7QUFDQTtBQUNBLGFBQU8sQ0FBUDtBQUNELEtBSkQsTUFJTztBQUNMLFFBQUUsTUFBTSxFQUFSLElBQWEsSUFBSSxNQUFNLENBQVYsQ0FBYjtBQUNBO0FBQ0Q7QUFDRjtBQUNELFNBQU8sR0FBUDtBQUNEOztBQUVjLFNBQVMsY0FBVCxDQUF3QixDQUF4QixFQUEyQjtBQUN4QyxNQUFJLE1BQU0sRUFBRSxNQUFaO0FBQ0EsTUFBSSxHQUFKLEVBQVM7QUFDUCxRQUFJLE1BQU0sSUFBSSxLQUFKLENBQVUsR0FBVixDQUFWO0FBQ0EsV0FBTyxhQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsQ0FBUDtBQUNELEdBSEQsTUFHTztBQUNMLFdBQU8sQ0FBUDtBQUNEO0FBQ0YiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNvcnRBbmRDb3VudChhLCBiZWcsIGVuZCwgYnVmKSB7XG4gIGlmIChlbmQgLSBiZWcgPD0gMSkge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2UgaWYgKGVuZCAtIGJlZyA9PSAyKSB7XG4gICAgaWYgKGFbYmVnXSA8PSBhW2JlZyArIDFdKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRtcCA9IGFbYmVnXTtcbiAgICAgIGFbYmVnXSA9IGFbYmVnICsgMV07XG4gICAgICBhW2JlZyArIDFdID0gdG1wO1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChiZWcgKyBlbmQpIC8gMiksXG4gICAgICBpbnZMZWZ0ID0gc29ydEFuZENvdW50KGEsIGJlZywgbWlkLCBidWYpLFxuICAgICAgaW52UmlnaHQgPSBzb3J0QW5kQ291bnQoYSwgbWlkLCBlbmQsIGJ1ZiksXG4gICAgICBpbnZTcGxpdCA9IG1lcmdlQW5kQ291bnQoYSwgYmVnLCBtaWQsIGVuZCwgYnVmKTtcbiAgICByZXR1cm4gaW52TGVmdCArIGludlJpZ2h0ICsgaW52U3BsaXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VBbmRDb3VudChhLCBiZWcsIG1pZCwgZW5kLCBidWYpIHtcbiAgZm9yIChsZXQgaSA9IGJlZzsgaSA8IGVuZDsgaSsrKSB7XG4gICAgYnVmW2ldID0gYVtpXTtcbiAgfVxuICBsZXQgbGVmdExlbiA9IG1pZCAtIGJlZyxcbiAgICByaWdodExlbiA9IGVuZCAtIG1pZCxcbiAgICBsZW4gPSBlbmQgLSBiZWcsXG4gICAgbCA9IDAsXG4gICAgciA9IDAsXG4gICAgaW52ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGxldCB1c2VMID0gKHIgPT09IHJpZ2h0TGVuKSB8fCAobCAhPT0gbGVmdExlbiAmJiBidWZbYmVnICsgbF0gPD0gYnVmW21pZCArIHJdKTtcbiAgICBpZiAodXNlTCkge1xuICAgICAgYVtiZWcgKyBpXSA9IGJ1ZltiZWcgKyBsXTtcbiAgICAgIGwrKztcbiAgICAgIGludiArPSByO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2JlZyArIGldID0gYnVmW21pZCArIHJdO1xuICAgICAgcisrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW52O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudEludmVyc2lvbihhKSB7XG4gIGxldCBsZW4gPSBhLmxlbmd0aDtcbiAgaWYgKGxlbikge1xuICAgIGxldCBidWYgPSBuZXcgQXJyYXkobGVuKTtcbiAgICByZXR1cm4gc29ydEFuZENvdW50KGEsIDAsIGxlbiwgYnVmKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY291bnRpbnZlcnNpb24uanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ])
});
;