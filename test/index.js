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
    true
  );

  parent();

  setTimeout(dropEffect, 0, first);
  setTimeout(dropEffect, 0, second);
};

console.log('\x1b[1muhooks\x1b[0m');
test(require('uhooks'));

setTimeout(() => {
  console.log('');
  console.log('\x1b[1muhooks-fx\x1b[0m');
  test(require('../cjs'));
}, 100);
