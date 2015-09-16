module.exports =
/******/ (function(modules) { // webpackBootstrap
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = Lens;
	
	var _util = __webpack_require__(1);
	
	var _helpers = __webpack_require__(2);
	
	// LENS ============================================================================================
	function createGetter(key) {
	  return function getter(data) {
	    if (key) {
	      if ((0, _helpers.isImmutable)(data)) {
	        throw new Error("can't get key " + (0, _util.inspect)(key) + " from immutable data " + (0, _util.inspect)(data));
	      } else {
	        if (data.meta && data.meta.kind == "dict") {
	          return data.meta.codomain;
	        } else if (data.meta && data.meta.kind == "struct") {
	          return data.meta.props[key];
	        } else if (data.meta && data.meta.kind == "list") {
	          return data.meta.type;
	        } else {
	          return data[key];
	        }
	      }
	    } else {
	      return data;
	    }
	  };
	}
	
	function createLens(getter) {
	  return {
	    get: getter,
	
	    compose: function compose(nextLens) {
	      return createLens(function (data) {
	        return nextLens.get(getter(data));
	      });
	    }
	  };
	}
	
	function Lens(key) {
	  if (typeof key != "string") {
	    throw new Error("key must be of string type, got " + typeof key);
	  }
	  var lens = key.split(".").map(function (k) {
	    return createLens(createGetter(k));
	  });
	  return lens.reduce(function (lens, nextLens) {
	    return lens.compose(nextLens);
	  });
	}
	
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function isArray(o) {
	  return toString.call(o) === '[object Array]';
	}
	
	function isPlainObject(o) {
	  return toString.call(o) === '[object Object]';
	}
	
	function isImmutable(data) {
	  var isNativeMutable = isArray(data) || isPlainObject(data);
	
	  var isTcombMutable = data.meta && (data.meta.kind == 'dict' || data.meta.kind == 'list' || data.meta.kind == 'struct' || data.meta.kind == 'tuple');
	
	  return !(isNativeMutable || isTcombMutable);
	}
	
	function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	exports['default'] = {
	  isArray: isArray, isPlainObject: isPlainObject, isImmutable: isImmutable, isNumeric: isNumeric
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmVmNzU5ZmFlMmQzYjA0NDM1YjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztzQkNBd0IsSUFBSTs7aUNBdENOLENBQU07O29DQUN3QixDQUFXOzs7QUFHL0QsVUFBUyxZQUFZLENBQUMsR0FBRyxFQUFFO0FBQ3pCLFVBQU8sU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQzNCLFNBQUksR0FBRyxFQUFFO0FBQ1AsV0FBSSxhQU5hLFdBQVcsRUFNWixJQUFJLENBQUMsRUFBRTtBQUNyQixlQUFNLElBQUksS0FBSyxvQkFBa0IsVUFSakMsT0FBTyxFQVFrQyxHQUFHLENBQUMsNkJBQXdCLFVBUnJFLE9BQU8sRUFRc0UsSUFBSSxDQUFDLENBQUcsQ0FBQztRQUN2RixNQUFNO0FBQ0wsYUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtBQUN6QyxrQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztVQUMzQixNQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUU7QUFDbEQsa0JBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDN0IsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO0FBQ2hELGtCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1VBQ3ZCLE1BQU07QUFDTCxrQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDbEI7UUFDRjtNQUNGLE1BQU07QUFDTCxjQUFPLElBQUksQ0FBQztNQUNiO0lBQ0YsQ0FBQztFQUNIOztBQUVELFVBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUMxQixVQUFPO0FBQ0wsUUFBRyxFQUFFLE1BQU07O0FBRVgsWUFBTyxtQkFBQyxRQUFRLEVBQUU7QUFDaEIsY0FBTyxVQUFVLENBQ2YsVUFBQyxJQUFJO2dCQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUEsQ0FDckMsQ0FBQztNQUNIO0lBQ0YsQ0FBQztFQUNIOztBQUVjLFVBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNoQyxPQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRTtBQUMxQixXQUFNLElBQUksS0FBSyxzQ0FBb0MsT0FBTyxHQUFHLENBQUcsQ0FBQztJQUNsRTtBQUNELE9BQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQUM7WUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDO0FBQ2hFLFVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxRQUFRO1lBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFBQSxDQUFDLENBQUM7RUFDaEU7Ozs7Ozs7O0FDNUNELGtDOzs7Ozs7Ozs7OztBQ0FBLFVBQVMsT0FBTyxDQUFDLENBQUMsRUFBRTtBQUNsQixVQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLENBQUM7RUFDOUM7O0FBRUQsVUFBUyxhQUFhLENBQUMsQ0FBQyxFQUFFO0FBQ3hCLFVBQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxpQkFBaUIsQ0FBQztFQUMvQzs7QUFFRCxVQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDekIsT0FBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFM0QsT0FBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLElBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sSUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxJQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQzs7QUFFOUQsVUFBTyxFQUFFLGVBQWUsSUFBSSxjQUFjLENBQUMsQ0FBQztFQUM3Qzs7QUFFRCxVQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUU7QUFDcEIsVUFBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0M7O3NCQUVjO0FBQ2IsVUFBTyxFQUFQLE9BQU8sRUFBRSxhQUFhLEVBQWIsYUFBYSxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsU0FBUyxFQUFULFNBQVM7RUFDL0MiLCJmaWxlIjoiZGlzdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMmVmNzU5ZmFlMmQzYjA0NDM1YjZcbiAqKi8iLCJpbXBvcnQge2luc3BlY3R9IGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQge2dldFByb3BlcnRpZXMsIGlzSW1tdXRhYmxlLCBpc051bWVyaWN9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuLy8gTEVOUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gY3JlYXRlR2V0dGVyKGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0dGVyKGRhdGEpIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAoaXNJbW11dGFibGUoZGF0YSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW4ndCBnZXQga2V5ICR7aW5zcGVjdChrZXkpfSBmcm9tIGltbXV0YWJsZSBkYXRhICR7aW5zcGVjdChkYXRhKX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkYXRhLm1ldGEgJiYgZGF0YS5tZXRhLmtpbmQgPT0gXCJkaWN0XCIpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YS5tZXRhLmNvZG9tYWluO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEubWV0YSAmJiBkYXRhLm1ldGEua2luZCA9PSBcInN0cnVjdFwiKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGEubWV0YS5wcm9wc1trZXldO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEubWV0YSAmJiBkYXRhLm1ldGEua2luZCA9PSBcImxpc3RcIikge1xuICAgICAgICAgIHJldHVybiBkYXRhLm1ldGEudHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGVucyhnZXR0ZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGdldHRlcixcblxuICAgIGNvbXBvc2UobmV4dExlbnMpIHtcbiAgICAgIHJldHVybiBjcmVhdGVMZW5zKFxuICAgICAgICAoZGF0YSkgPT4gbmV4dExlbnMuZ2V0KGdldHRlcihkYXRhKSlcbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMZW5zKGtleSkge1xuICBpZiAodHlwZW9mIGtleSAhPSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBrZXkgbXVzdCBiZSBvZiBzdHJpbmcgdHlwZSwgZ290ICR7dHlwZW9mIGtleX1gKTtcbiAgfVxuICBsZXQgbGVucyA9IGtleS5zcGxpdChcIi5cIikubWFwKGsgPT4gY3JlYXRlTGVucyhjcmVhdGVHZXR0ZXIoaykpKTtcbiAgcmV0dXJuIGxlbnMucmVkdWNlKChsZW5zLCBuZXh0TGVucykgPT4gbGVucy5jb21wb3NlKG5leHRMZW5zKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInV0aWxcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIGlzQXJyYXkobykge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZnVuY3Rpb24gaXNJbW11dGFibGUoZGF0YSkge1xuICBsZXQgaXNOYXRpdmVNdXRhYmxlID0gaXNBcnJheShkYXRhKSB8fCBpc1BsYWluT2JqZWN0KGRhdGEpO1xuXG4gIGxldCBpc1Rjb21iTXV0YWJsZSA9IGRhdGEubWV0YSAmJiAoZGF0YS5tZXRhLmtpbmQgPT0gXCJkaWN0XCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm1ldGEua2luZCA9PSBcImxpc3RcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubWV0YS5raW5kID09IFwic3RydWN0XCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm1ldGEua2luZCA9PSBcInR1cGxlXCIpO1xuXG4gIHJldHVybiAhKGlzTmF0aXZlTXV0YWJsZSB8fCBpc1Rjb21iTXV0YWJsZSk7XG59XG5cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNBcnJheSwgaXNQbGFpbk9iamVjdCwgaXNJbW11dGFibGUsIGlzTnVtZXJpYyxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9oZWxwZXJzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==