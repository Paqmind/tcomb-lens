"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Lens;

var _util = require("util");

var _helpers = require("./helpers");

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