const {hooked, useState} = require('../cjs');

const Item = () => hooked(item => {
  const [done, update] = useState(item.done);
  return () => {
    update(item.done = !done);
  };
});

let tasks = [];

const Todo = () => hooked(
  items => {
    const [_, update] = useState();
    tasks = items.map(item => Item()(item));
    console.log(`Total: ${tasks.length}`);
    return {
      add(value) {
        items.push({value, done: false});
        update();
      }
    };
  },
  true
);

const App = Todo();

const app = App([]);
app.add('a');
app.add('b');

setTimeout(
  () => {
    tasks[0]();
    tasks[1]();
  },
  1000
);
