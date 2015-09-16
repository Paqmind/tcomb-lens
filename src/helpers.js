function isArray(o) {
  return toString.call(o) === '[object Array]';
}

function isPlainObject(o) {
  return toString.call(o) === '[object Object]';
}

function isImmutable(data) {
  let isNativeMutable = isArray(data) || isPlainObject(data);

  let isTcombMutable = data.meta && (data.meta.kind == "dict" ||
                                     data.meta.kind == "list" ||
                                     data.meta.kind == "struct" ||
                                     data.meta.kind == "tuple");

  return !(isNativeMutable || isTcombMutable);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
  isArray, isPlainObject, isImmutable, isNumeric,
};
