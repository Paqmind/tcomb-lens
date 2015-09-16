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