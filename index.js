self.uhooksFX = (function (exports) {
  'use strict';

  let info = null, schedule = new Set;

  const invoke = effect => {
    const {$, r, h} = effect;
    if (isFunction(r)) {
      fx$1.get(h).delete(effect);
      r();
    }
    if (isFunction(effect.r = $()))
      fx$1.get(h).add(effect);
  };

  const runSchedule = () => {
    const previous = schedule;
    schedule = new Set;
    previous.forEach(({h, c, a, e}) => {
      // avoid running schedules when the hook is
      // re-executed before such schedule happens
      if (e)
        h.apply(c, a);
    });
  };

  const fx$1 = new WeakMap;
  const effects = [];
  const layoutEffects = [];

  function different(value, i) {
    return value !== this[i];
  }
  const dropEffect = hook => {
    const effects = fx$1.get(hook);
    if (effects)
      wait.then(() => {
        effects.forEach(effect => {
          effect.r();
          effect.r = null;
          effect.d = true;
        });
        effects.clear();
      });
  };

  const getInfo = () => info;

  const hasEffect = hook => fx$1.has(hook);

  const isFunction = f => typeof f === 'function';

  const hooked$1 = callback => {
    const current = {h: hook, c: null, a: null, e: 0, i: 0, s: []};
    return hook;
    function hook() {
      const prev = info;
      info = current;
      current.e = current.i = 0;
      try {
        return callback.apply(current.c = this, current.a = arguments);
      }
      finally {
        info = prev;
        if (effects.length)
          wait.then(effects.forEach.bind(effects.splice(0), invoke));
        if (layoutEffects.length)
          layoutEffects.splice(0).forEach(invoke);
      }
    }
  };

  const reschedule = info => {
    if (!schedule.has(info)) {
      info.e = 1;
      schedule.add(info);
      wait.then(runSchedule);
    }
  };

  const wait = Promise.resolve();

  const createContext = value => ({
    _: new Set,
    provide,
    value
  });

  const useContext = ({_, value}) => {
    _.add(getInfo());
    return value;
  };

  function provide(newValue) {
    const {_, value} = this;
    if (value !== newValue) {
      this._ = new Set;
      this.value = newValue;
      _.forEach(({h, c, a}) => {
        h.apply(c, a);
      });
    }
  }

  const useCallback = (fn, guards) => useMemo(() => fn, guards);

  const useMemo = (memo, guards) => {
    const info = getInfo();
    const {i, s} = info;
    if (i === s.length || !guards || guards.some(different, s[i]._))
      s[i] = {$: memo(), _: guards};
    return s[info.i++].$;
  };

  const createEffect = stack => (callback, guards) => {
    const info = getInfo();
    const {i, s, h} = info;
    const call = i === s.length;
    info.i++;
    if (call) {
      if (!fx$1.has(h))
        fx$1.set(h, new Set);
      s[i] = {$: callback, _: guards, r: null, d: false, h};
    }
    if (call || !guards || s[i].d || guards.some(different, s[i]._))
      stack.push(s[i]);
    s[i].$ = callback;
    s[i]._ = guards;
    s[i].d = false;
  };

  const useEffect = createEffect(effects);

  const useLayoutEffect = createEffect(layoutEffects);

  const getValue = (value, f) => isFunction(f) ? f(value) : f;

  const useReducer$1 = (reducer, value, init) => {
    const info = getInfo();
    const {i, s} = info;
    if (i === s.length)
      s.push({
        $: isFunction(init) ?
            init(value) : getValue(void 0, value),
        set: value => {
          s[i].$ = reducer(s[i].$, value);
          reschedule(info);
        }
      });
    const {$, set} = s[info.i++];
    return [$, set];
  };

  const useState$1 = value => useReducer$1(getValue, value);

  const useRef = current => {
    const info = getInfo();
    const {i, s} = info;
    if (i === s.length)
      s.push({current});
    return s[info.i++];
  };

  /*! (c) Andrea Giammarchi - ISC */

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

  const hooked = (callback, outer) => {
    const hook = hooked$1(
      outer ?
        /*async*/ function () {
          const [ph, pc, pa] = [h, c, a];
          [h, c, a] = [hook, this, arguments];
          try {
            return /*await*/ callback.apply(c, a);
          }
          finally {
            [h, c, a] = [ph, pc, pa];
          }
        } :
        callback
    );
    return hook;
  };

  const useReducer = (reducer, value, init) =>
                              wrap(h, c, a, useReducer$1(reducer, value, init));

  const useState = value => wrap(h, c, a, useState$1(value));

  exports.createContext = createContext;
  exports.dropEffect = dropEffect;
  exports.hasEffect = hasEffect;
  exports.hooked = hooked;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useEffect = useEffect;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;
  exports.wait = wait;

  return exports;

})({});
