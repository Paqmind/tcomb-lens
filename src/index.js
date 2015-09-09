import {inspect} from "util";
import {getProperties, isImmutable, isNumeric} from "./helpers";

// LENS ============================================================================================
function createGetter(key) {
  return function getter(data) {
    if (key) {
      if (isImmutable(data)) {
        throw new Error(`can't get key ${inspect(key)} from immutable data ${inspect(data)}`);
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

    compose(nextLens) {
      return createLens(
        (data) => nextLens.get(getter(data))
      );
    }
  };
}

export default function Lens(key) {
  if (typeof key != "string") {
    throw new Error(`key must be of string type, got ${typeof key}`);
  }
  let lens = key.split(".").map(k => createLens(createGetter(k)));
  return lens.reduce((lens, nextLens) => lens.compose(nextLens));
}
