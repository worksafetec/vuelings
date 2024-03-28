import { ref, watch } from '@reactivity';
import { expect, test, vi } from 'vitest';

/**
 * In this chapter we talk about how we can watch refs explicitly.
 *
 * Implementation: `src/lib/watch.ts`.
 * Vue implementation: https://vuejs.org/api/reactivity-core.html#watch
 */

/**
 * Watch the value of a ref.
 * In contrast to `effect` you can explicitly define the dependencies of a callback.
 * Also, compared to `effect` the callback is only called when the dependencies change.
 */
test('1. Watching a single ref', () => {
  const counter = ref(0);
  const callback = vi.fn(() => void 0);

  // TODO: Use `watch` to watch the counter ref, pass `callback`

  for (let i = 0; i < 10; i++) {
    counter.value++;
  }

  expect(callback).toHaveBeenCalledTimes(10);
});

/**
 * Like previously, you can also use `watch` to react to multiple refs.
 * Keep in mind that the callback is only called when one of the dependencies changes.
 */
test('2. Calculating the sum of two refs using `watch`', () => {
  const a = ref(5);
  const b = ref(3);
  const sum = ref(-1);

  // TODO: Somethings wrong with the watcher, fix it!
  watch([], () => {
    sum.value = a.value + b.value;
  });

  const initialSum = 0; // TODO: What is `sum` at this point?
  expect(sum.value).toEqual(initialSum);

  a.value = 3;
  expect(sum.value).toEqual(6);
});

/**
 * You can, however, configure the watcher to immediately call the callback.
 */
test('3. Making use of options', () => {
  const a = ref(5);
  const b = ref(3);
  const sum = ref(-1);

  watch([a, b], () => {
    sum.value = a.value + b.value;
  }); // TODO: Something is missing as a third argument...

  expect(sum.value).toEqual(8);
});
