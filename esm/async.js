/*! (c) Andrea Giammarchi - ISC */

import {
  hooked as $hooked,
  useReducer as $useReducer,
  useState as $useState,
  wait
} from 'uhooks/async';

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

export const hooked = (callback, outer) => {
  const hook = $hooked(
    outer ?
      async function () {
        const [ph, pc, pa] = [h, c, a];
        [h, c, a] = [hook, this, arguments];
        try {
          return await callback.apply(c, a);
        }
        finally {
          [h, c, a] = [ph, pc, pa];
        }
      } :
      callback
  );
  return hook;
};

export const useReducer = (reducer, value, init) =>
                            wrap(h, c, a, $useReducer(reducer, value, init));

export const useState = value => wrap(h, c, a, $useState(value));

export {
  dropEffect, hasEffect, wait,
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useRef
} from 'uhooks/async';
