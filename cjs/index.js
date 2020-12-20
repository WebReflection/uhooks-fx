'use strict';
/*! (c) Andrea Giammarchi - ISC */

const {
  hooked: $hooked,
  useReducer: $useReducer,
  useState: $useState,
  wait
} = require('uhooks');

let fx = null;

const effects = new WeakMap;

const wrap = (fx, reduced) => (
  fx ? [
    reduced[0],
    value => {
      if (!effects.has(fx)) {
        effects.set(fx, 0);
        wait.then(() => {
          effects.delete(fx);
          fx();
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
      const prev = fx;
      fx = hook;
      try {
        return callback.apply(this, arguments);
      }
      finally {
        fx = prev;
      }
    } :
    callback
);
exports.hooked = hooked;

const useReducer = (reducer, value, init) =>
                            wrap(fx, $useReducer(reducer, value, init));
exports.useReducer = useReducer;

const useState = value => wrap(fx, $useState(value));
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
