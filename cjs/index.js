'use strict';
/*! (c) Andrea Giammarchi - ISC */

const {
  hooked: $hooked,
  useReducer: $useReducer,
  useState: $useState,
  wait
} = require('uhooks');

let h = null, c = null, a = null;

const fx = new WeakMap;

const wrap = (h, c, a, reduced) => (
  h ? [
    reduced[0],
    value => {
      if (!fx.has(h)) {
        fx.set(h, 0);
        wait.then(() => {
          fx.delete(h);
          h.apply(c, a);
        });
      }
      reduced[1](value);
    }
  ] :
  reduced
);

const hooked = (callback, outer) => $hooked(
  outer ?
    function hook() {
      const [ph, pc, pa] = [h, c, a];
      [h, c, a] = [hook, this, arguments];
      try {
        return callback.apply(c, a);
      }
      finally {
        [h, c, a] = [ph, pc, pa];
      }
    } :
    callback
);
exports.hooked = hooked;

const useReducer = (reducer, value, init) =>
                            wrap(h, c, a, $useReducer(reducer, value, init));
exports.useReducer = useReducer;

const useState = value => wrap(h, c, a, $useState(value));
exports.useState = useState;

(m => {
  exports.dropEffect = m.dropEffect;
  exports.hasEffect = m.hasEffect;
  exports.wait = m.wait;
  exports.createContext = m.createContext;
  exports.useContext = m.useContext;
  exports.useCallback = m.useCallback;
  exports.useMemo = m.useMemo;
  exports.useEffect = m.useEffect;
  exports.useLayoutEffect = m.useLayoutEffect;
  exports.useRef = m.useRef;
})(require('uhooks'));
