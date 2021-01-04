# <em>µ</em>hooks-fx

This module allows reduced/state updates to propagate to an outer hook, avoiding duplicated execution of inner hooks for libraries that have contained updates such as [<em>µ</em>land](https://github.com/WebReflection/uland#readme).

This module exports same utilities via `uhooks-fx/async`, which is based on `uhooks/async` for asynchronous hooks.

### Example
```js
const test = ({hooked, dropEffect, useEffect, useState}) => {

  const state = initial => {
    const result = useState(initial);
    useEffect(() => {
      console.log('\x1b[2m', initial, 'fx in', '\x1b[0m');
      return () => {
        console.log('\x1b[2m', initial, 'fx out', '\x1b[0m');
      };
    }, []);
    console.log('\x1b[2m', 'state value:', result[0], '\x1b[0m');
    return result;
  };

  const first = hooked(state);
  const second = hooked(state);

  const parent = hooked(
    () => {
      const [a, $a] = first('a');
      const [b, $b] = second('b');
      // with uhooks inner updates don't propagate
      // so this will be logged only once
      // with uhooks-fx though, inner changes schedule
      // an update for the outer hook, in this case
      // the parent callback, so this will be logged
      // twice, with updated values too
      console.log('', a, b);
      if (a === 'a')
        $a('$a');
      if (b === 'b')
        $b('$b');
    },
    // there is an extra argument to flag a hook as parent
    true
  );

  parent();

  setTimeout(dropEffect, 0, first);
  setTimeout(dropEffect, 0, second);
};

// verify the difference
setTimeout(test, 100, require('uhooks'));
setTimeout(test, 200, require('uhooks-fx'));
```
