/*! (c) Andrea Giammarchi - ISC */

import {
  hooked as $hooked,
  useReducer as $useReducer,
  useState as $useState,
  wait
} from 'uhooks';

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

export const hooked = (callback, outer) => $hooked(
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

export const useReducer = (reducer, value, init) =>
                            wrap(h, c, a, $useReducer(reducer, value, init));

export const useState = value => wrap(h, c, a, $useState(value));

export {
  dropEffect, hasEffect, wait,
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useRef
} from 'uhooks';
