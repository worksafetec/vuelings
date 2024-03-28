import { readonly, ref } from '@reactivity';
import { expect, test } from 'vitest';

/**
 * In this chapter we talk about how we can mark a `ref` as readonly.
 * This is useful when you want to expose a value that should not be modified.
 * The underlying value can still be changed, but the reference itself is readonly.
 *
 * Implementation: `src/lib/readonly.ts`.
 * Vue implementation: https://vuejs.org/api/reactivity-core.html#readonly
 */

/**
 * In this exercise you need to mark a `ref` as readonly.
 */
test('1. Marking a `ref` as readonly', () => {
  const counter = ref(0);

  const readonlyCounter = counter; // TODO: Make the counter readonly

  expect(() => (readonlyCounter.value = 1)).toThrow();
  expect(counter.value).toEqual(0);
});

/**
 * As mentioned earlier, marking a `ref` as readonly doesn't prevent the underlying value from being changed.
 * In most cases you keep the underlying ref locally and expose a readonly version of it.
 */
test('2. Change the underlying value of a readonly ref', () => {
  const value = ref(5);
  const readonlyValue = readonly(value);

  // TODO: Make the test pass

  expect(readonlyValue.value).toEqual(8);
  expect(value.value).toEqual(8);
});
