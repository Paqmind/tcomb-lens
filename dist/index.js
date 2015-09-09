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
	        if (data.meta.kind == "dict") {
	          return data.meta.codomain;
	        } else if (data.meta.kind == "struct") {
	          return data.meta.props[key];
	        } else if (data.meta.kind == "list") {
	          return data.meta.type;
	        } else {
	          // TODO possible situation?!
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDc1YmUyMDhiMGIyMmMxZmNlNmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzLXBsYWluLW9iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzLXBsYWluLW9iamVjdC9+L2lzb2JqZWN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O3NCQ0N3QixJQUFJOztpQ0F2Q04sQ0FBTTs7b0NBQ3dCLENBQVc7OztBQUcvRCxVQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDekIsVUFBTyxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDM0IsU0FBSSxHQUFHLEVBQUU7QUFDUCxXQUFJLGFBTmEsV0FBVyxFQU1aLElBQUksQ0FBQyxFQUFFO0FBQ3JCLGVBQU0sSUFBSSxLQUFLLG9CQUFrQixVQVJqQyxPQUFPLEVBUWtDLEdBQUcsQ0FBQyw2QkFBd0IsVUFSckUsT0FBTyxFQVFzRSxJQUFJLENBQUMsQ0FBRyxDQUFDO1FBQ3ZGLE1BQU07QUFDTCxhQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtBQUM1QixrQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztVQUMzQixNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFO0FBQ3JDLGtCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQzdCLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7QUFDbkMsa0JBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7VUFDdkIsTUFBTTs7QUFFTCxrQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDbEI7UUFDRjtNQUNGLE1BQU07QUFDTCxjQUFPLElBQUksQ0FBQztNQUNiO0lBQ0YsQ0FBQztFQUNIOztBQUVELFVBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUMxQixVQUFPO0FBQ0wsUUFBRyxFQUFFLE1BQU07O0FBRVgsWUFBTyxtQkFBQyxRQUFRLEVBQUU7QUFDaEIsY0FBTyxVQUFVLENBQ2YsVUFBQyxJQUFJO2dCQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUEsQ0FDckMsQ0FBQztNQUNIO0lBQ0YsQ0FBQztFQUNIOztBQUVjLFVBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNoQyxPQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRTtBQUMxQixXQUFNLElBQUksS0FBSyxzQ0FBb0MsT0FBTyxHQUFHLENBQUcsQ0FBQztJQUNsRTtBQUNELE9BQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQUM7WUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDO0FBQ2hFLFVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxRQUFRO1lBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFBQSxDQUFDLENBQUM7RUFDaEU7Ozs7Ozs7O0FDN0NELGtDOzs7Ozs7Ozs7Ozs7OzswQ0NBMEIsQ0FBaUI7Ozs7QUFFM0MsVUFBUyxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQ3pCLE9BQUksZUFBZSxHQUFHLElBQUksWUFBWSxLQUFLLElBQUksZ0NBQWMsSUFBSSxDQUFDLENBQUM7O0FBRW5FLE9BQUksY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxJQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLElBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsSUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUM7O0FBRTlELFVBQU8sRUFBRSxlQUFlLElBQUksY0FBYyxDQUFDLENBQUM7RUFDN0M7O0FBRUQsVUFBUyxTQUFTLENBQUMsQ0FBQyxFQUFFO0FBQ3BCLFVBQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdDOztzQkFFYztBQUNiLGNBQVcsRUFBWCxXQUFXLEVBQUUsU0FBUyxFQUFULFNBQVM7RUFDdkI7Ozs7Ozs7QUNuQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImRpc3QvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ3NWJlMjA4YjBiMjJjMWZjZTZlXG4gKiovIiwiaW1wb3J0IHtpbnNwZWN0fSBmcm9tIFwidXRpbFwiO1xuaW1wb3J0IHtnZXRQcm9wZXJ0aWVzLCBpc0ltbXV0YWJsZSwgaXNOdW1lcmljfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbi8vIExFTlMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGNyZWF0ZUdldHRlcihrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldHRlcihkYXRhKSB7XG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKGlzSW1tdXRhYmxlKGRhdGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY2FuJ3QgZ2V0IGtleSAke2luc3BlY3Qoa2V5KX0gZnJvbSBpbW11dGFibGUgZGF0YSAke2luc3BlY3QoZGF0YSl9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGF0YS5tZXRhLmtpbmQgPT0gXCJkaWN0XCIpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YS5tZXRhLmNvZG9tYWluO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEubWV0YS5raW5kID09IFwic3RydWN0XCIpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YS5tZXRhLnByb3BzW2tleV07XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5tZXRhLmtpbmQgPT0gXCJsaXN0XCIpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YS5tZXRhLnR5cGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVE9ETyBwb3NzaWJsZSBzaXR1YXRpb24/IVxuICAgICAgICAgIHJldHVybiBkYXRhW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMZW5zKGdldHRlcikge1xuICByZXR1cm4ge1xuICAgIGdldDogZ2V0dGVyLFxuXG4gICAgY29tcG9zZShuZXh0TGVucykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUxlbnMoXG4gICAgICAgIChkYXRhKSA9PiBuZXh0TGVucy5nZXQoZ2V0dGVyKGRhdGEpKVxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExlbnMoa2V5KSB7XG4gIGlmICh0eXBlb2Yga2V5ICE9IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGtleSBtdXN0IGJlIG9mIHN0cmluZyB0eXBlLCBnb3QgJHt0eXBlb2Yga2V5fWApO1xuICB9XG4gIGxldCBsZW5zID0ga2V5LnNwbGl0KFwiLlwiKS5tYXAoayA9PiBjcmVhdGVMZW5zKGNyZWF0ZUdldHRlcihrKSkpO1xuICByZXR1cm4gbGVucy5yZWR1Y2UoKGxlbnMsIG5leHRMZW5zKSA9PiBsZW5zLmNvbXBvc2UobmV4dExlbnMpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwidXRpbFwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSBcImlzLXBsYWluLW9iamVjdFwiO1xuXG5mdW5jdGlvbiBpc0ltbXV0YWJsZShkYXRhKSB7XG4gIGxldCBpc05hdGl2ZU11dGFibGUgPSBkYXRhIGluc3RhbmNlb2YgQXJyYXkgfHwgaXNQbGFpbk9iamVjdChkYXRhKTtcblxuICBsZXQgaXNUY29tYk11dGFibGUgPSBkYXRhLm1ldGEgJiYgKGRhdGEubWV0YS5raW5kID09IFwiZGljdFwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5tZXRhLmtpbmQgPT0gXCJsaXN0XCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm1ldGEua2luZCA9PSBcInN0cnVjdFwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5tZXRhLmtpbmQgPT0gXCJ0dXBsZVwiKTtcblxuICByZXR1cm4gIShpc05hdGl2ZU11dGFibGUgfHwgaXNUY29tYk11dGFibGUpO1xufVxuXG5mdW5jdGlvbiBpc051bWVyaWMobikge1xuICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzSW1tdXRhYmxlLCBpc051bWVyaWMsXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaGVscGVycy5qc1xuICoqLyIsIi8qIVxuICogaXMtcGxhaW4tb2JqZWN0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1wbGFpbi1vYmplY3Q+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnaXNvYmplY3QnKTtcblxuZnVuY3Rpb24gaXNPYmplY3RPYmplY3Qobykge1xuICByZXR1cm4gaXNPYmplY3QobykgPT09IHRydWVcbiAgICAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qobykge1xuICB2YXIgY3Rvcixwcm90O1xuICBcbiAgaWYgKGlzT2JqZWN0T2JqZWN0KG8pID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICBcbiAgLy8gSWYgaGFzIG1vZGlmaWVkIGNvbnN0cnVjdG9yXG4gIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuICBpZiAodHlwZW9mIGN0b3IgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcbiAgXG4gIC8vIElmIGhhcyBtb2RpZmllZCBwcm90b3R5cGVcbiAgcHJvdCA9IGN0b3IucHJvdG90eXBlO1xuICBpZiAoaXNPYmplY3RPYmplY3QocHJvdCkgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gIFxuICAvLyBJZiBjb25zdHJ1Y3RvciBkb2VzIG5vdCBoYXZlIGFuIE9iamVjdC1zcGVjaWZpYyBtZXRob2RcbiAgaWYgKHByb3QuaGFzT3duUHJvcGVydHkoJ2lzUHJvdG90eXBlT2YnKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIC8vIE1vc3QgbGlrZWx5IGEgcGxhaW4gT2JqZWN0XG4gIHJldHVybiB0cnVlO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lzLXBsYWluLW9iamVjdC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxuICogaXNvYmplY3QgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzb2JqZWN0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0J1xuICAgICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaXMtcGxhaW4tb2JqZWN0L34vaXNvYmplY3QvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9