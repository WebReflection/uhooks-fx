/*! (c) Andrea Giammarchi - ISC */

import {
  hooked as $hooked,
  useReducer as $useReducer,
  useState as $useState,
  wait
} from 'uhooks';

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

export const hooked = (callback, outer) => $hooked(
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

export const useReducer = (reducer, value, init) =>
                            wrap(fx, $useReducer(reducer, value, init));

export const useState = value => wrap(fx, $useState(value));

export {
  dropEffect, hasEffect, wait,
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useRef
} from 'uhooks';
