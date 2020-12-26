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
const states = new WeakMap;

const set = (h, c, a, update) => {
  const wrap = value => {
    if (!fx.has(h)) {
      fx.set(h, 0);
      wait.then(() => {
        fx.delete(h);
        h.apply(c, a);
      });
    }
    update(value);
  };
  states.set(update, wrap);
  return wrap;
};

const wrap = (h, c, a, state) => (
  h ? [
    state[0],
    states.get(state[1]) || set(h, c, a, state[1])
  ] :
  state
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
