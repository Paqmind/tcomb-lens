import isPlainObject from "is-plain-object";

function isImmutable(data) {
  let isNativeMutable = data instanceof Array || isPlainObject(data);

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
  isImmutable, isNumeric,
};
