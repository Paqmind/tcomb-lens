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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _isPlainObject = __webpack_require__(3);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	function isImmutable(data) {
	  var isNativeMutable = data instanceof Array || (0, _isPlainObject2["default"])(data);
	
	  var isTcombMutable = data.meta && (data.meta.kind == "dict" || data.meta.kind == "list" || data.meta.kind == "struct" || data.meta.kind == "tuple");
	
	  return !(isNativeMutable || isTcombMutable);
	}
	
	function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	exports["default"] = {
	  isImmutable: isImmutable, isNumeric: isNumeric
	};
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(4);
	
	function isObjectObject(o) {
	  return isObject(o) === true
	    && Object.prototype.toString.call(o) === '[object Object]';
	}
	
	module.exports = function isPlainObject(o) {
	  var ctor,prot;
	  
	  if (isObjectObject(o) === false) return false;
	  
	  // If has modified constructor
	  ctor = o.constructor;
	  if (typeof ctor !== 'function') return false;
	  
	  // If has modified prototype
	  prot = ctor.prototype;
	  if (isObjectObject(prot) === false) return false;
	  
	  // If constructor does not have an Object-specific method
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false;
	  }
	  
	  // Most likely a plain Object
	  return true;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object'
	    && !Array.isArray(val);
	};


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGJiOWY5MzlmOTExOWY1YzgyYWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzLXBsYWluLW9iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzLXBsYWluLW9iamVjdC9+L2lzb2JqZWN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O3NCQ0F3QixJQUFJOztpQ0F0Q04sQ0FBTTs7b0NBQ3dCLENBQVc7OztBQUcvRCxVQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDekIsVUFBTyxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDM0IsU0FBSSxHQUFHLEVBQUU7QUFDUCxXQUFJLGFBTmEsV0FBVyxFQU1aLElBQUksQ0FBQyxFQUFFO0FBQ3JCLGVBQU0sSUFBSSxLQUFLLG9CQUFrQixVQVJqQyxPQUFPLEVBUWtDLEdBQUcsQ0FBQyw2QkFBd0IsVUFSckUsT0FBTyxFQVFzRSxJQUFJLENBQUMsQ0FBRyxDQUFDO1FBQ3ZGLE1BQU07QUFDTCxhQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO0FBQ3pDLGtCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1VBQzNCLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRTtBQUNsRCxrQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUM3QixNQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7QUFDaEQsa0JBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7VUFDdkIsTUFBTTtBQUNMLGtCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUNsQjtRQUNGO01BQ0YsTUFBTTtBQUNMLGNBQU8sSUFBSSxDQUFDO01BQ2I7SUFDRixDQUFDO0VBQ0g7O0FBRUQsVUFBUyxVQUFVLENBQUMsTUFBTSxFQUFFO0FBQzFCLFVBQU87QUFDTCxRQUFHLEVBQUUsTUFBTTs7QUFFWCxZQUFPLG1CQUFDLFFBQVEsRUFBRTtBQUNoQixjQUFPLFVBQVUsQ0FDZixVQUFDLElBQUk7Z0JBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQSxDQUNyQyxDQUFDO01BQ0g7SUFDRixDQUFDO0VBQ0g7O0FBRWMsVUFBUyxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ2hDLE9BQUksT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFO0FBQzFCLFdBQU0sSUFBSSxLQUFLLHNDQUFvQyxPQUFPLEdBQUcsQ0FBRyxDQUFDO0lBQ2xFO0FBQ0QsT0FBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBQztZQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDLENBQUM7QUFDaEUsVUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLFFBQVE7WUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUFBLENBQUMsQ0FBQztFQUNoRTs7Ozs7Ozs7QUM1Q0Qsa0M7Ozs7Ozs7Ozs7Ozs7OzBDQ0EwQixDQUFpQjs7OztBQUUzQyxVQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDekIsT0FBSSxlQUFlLEdBQUcsSUFBSSxZQUFZLEtBQUssSUFBSSxnQ0FBYyxJQUFJLENBQUMsQ0FBQzs7QUFFbkUsT0FBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLElBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sSUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxJQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQzs7QUFFOUQsVUFBTyxFQUFFLGVBQWUsSUFBSSxjQUFjLENBQUMsQ0FBQztFQUM3Qzs7QUFFRCxVQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUU7QUFDcEIsVUFBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0M7O3NCQUVjO0FBQ2IsY0FBVyxFQUFYLFdBQVcsRUFBRSxTQUFTLEVBQVQsU0FBUztFQUN2Qjs7Ozs7OztBQ25CRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZGlzdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGJiOWY5MzlmOTExOWY1YzgyYWNcbiAqKi8iLCJpbXBvcnQge2luc3BlY3R9IGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQge2dldFByb3BlcnRpZXMsIGlzSW1tdXRhYmxlLCBpc051bWVyaWN9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuLy8gTEVOUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gY3JlYXRlR2V0dGVyKGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0dGVyKGRhdGEpIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAoaXNJbW11dGFibGUoZGF0YSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW4ndCBnZXQga2V5ICR7aW5zcGVjdChrZXkpfSBmcm9tIGltbXV0YWJsZSBkYXRhICR7aW5zcGVjdChkYXRhKX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkYXRhLm1ldGEgJiYgZGF0YS5tZXRhLmtpbmQgPT0gXCJkaWN0XCIpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YS5tZXRhLmNvZG9tYWluO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEubWV0YSAmJiBkYXRhLm1ldGEua2luZCA9PSBcInN0cnVjdFwiKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGEubWV0YS5wcm9wc1trZXldO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEubWV0YSAmJiBkYXRhLm1ldGEua2luZCA9PSBcImxpc3RcIikge1xuICAgICAgICAgIHJldHVybiBkYXRhLm1ldGEudHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGVucyhnZXR0ZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGdldHRlcixcblxuICAgIGNvbXBvc2UobmV4dExlbnMpIHtcbiAgICAgIHJldHVybiBjcmVhdGVMZW5zKFxuICAgICAgICAoZGF0YSkgPT4gbmV4dExlbnMuZ2V0KGdldHRlcihkYXRhKSlcbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMZW5zKGtleSkge1xuICBpZiAodHlwZW9mIGtleSAhPSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBrZXkgbXVzdCBiZSBvZiBzdHJpbmcgdHlwZSwgZ290ICR7dHlwZW9mIGtleX1gKTtcbiAgfVxuICBsZXQgbGVucyA9IGtleS5zcGxpdChcIi5cIikubWFwKGsgPT4gY3JlYXRlTGVucyhjcmVhdGVHZXR0ZXIoaykpKTtcbiAgcmV0dXJuIGxlbnMucmVkdWNlKChsZW5zLCBuZXh0TGVucykgPT4gbGVucy5jb21wb3NlKG5leHRMZW5zKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInV0aWxcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gXCJpcy1wbGFpbi1vYmplY3RcIjtcblxuZnVuY3Rpb24gaXNJbW11dGFibGUoZGF0YSkge1xuICBsZXQgaXNOYXRpdmVNdXRhYmxlID0gZGF0YSBpbnN0YW5jZW9mIEFycmF5IHx8IGlzUGxhaW5PYmplY3QoZGF0YSk7XG5cbiAgbGV0IGlzVGNvbWJNdXRhYmxlID0gZGF0YS5tZXRhICYmIChkYXRhLm1ldGEua2luZCA9PSBcImRpY3RcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubWV0YS5raW5kID09IFwibGlzdFwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5tZXRhLmtpbmQgPT0gXCJzdHJ1Y3RcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubWV0YS5raW5kID09IFwidHVwbGVcIik7XG5cbiAgcmV0dXJuICEoaXNOYXRpdmVNdXRhYmxlIHx8IGlzVGNvbWJNdXRhYmxlKTtcbn1cblxuZnVuY3Rpb24gaXNOdW1lcmljKG4pIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiBpc0Zpbml0ZShuKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0ltbXV0YWJsZSwgaXNOdW1lcmljLFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2hlbHBlcnMuanNcbiAqKi8iLCIvKiFcbiAqIGlzLXBsYWluLW9iamVjdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXMtcGxhaW4tb2JqZWN0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzb2JqZWN0Jyk7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0T2JqZWN0KG8pIHtcbiAgcmV0dXJuIGlzT2JqZWN0KG8pID09PSB0cnVlXG4gICAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG8pIHtcbiAgdmFyIGN0b3IscHJvdDtcbiAgXG4gIGlmIChpc09iamVjdE9iamVjdChvKSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgXG4gIC8vIElmIGhhcyBtb2RpZmllZCBjb25zdHJ1Y3RvclxuICBjdG9yID0gby5jb25zdHJ1Y3RvcjtcbiAgaWYgKHR5cGVvZiBjdG9yICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG4gIFxuICAvLyBJZiBoYXMgbW9kaWZpZWQgcHJvdG90eXBlXG4gIHByb3QgPSBjdG9yLnByb3RvdHlwZTtcbiAgaWYgKGlzT2JqZWN0T2JqZWN0KHByb3QpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICBcbiAgLy8gSWYgY29uc3RydWN0b3IgZG9lcyBub3QgaGF2ZSBhbiBPYmplY3Qtc3BlY2lmaWMgbWV0aG9kXG4gIGlmIChwcm90Lmhhc093blByb3BlcnR5KCdpc1Byb3RvdHlwZU9mJykgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICAvLyBNb3N0IGxpa2VseSBhIHBsYWluIE9iamVjdFxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pcy1wbGFpbi1vYmplY3QvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiFcbiAqIGlzb2JqZWN0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pc29iamVjdD5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCdcbiAgICAmJiAhQXJyYXkuaXNBcnJheSh2YWwpO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lzLXBsYWluLW9iamVjdC9+L2lzb2JqZWN0L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==