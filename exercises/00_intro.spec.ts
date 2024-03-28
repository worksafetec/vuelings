import { ref } from '@reactivity';
import { expect, test } from 'vitest';

/**
 * This is the first exercise of the course.
 * Each exercise contains a half-written code that you need to complete.
 * A `TODO: ...` comment indicates what and where you need to implement something.
 *
 * To run an exercise execute `npm start <exercise-number>` in the root directory.
 * For this one run `npm start 00` to start the exercise.
 *
 * Each exercise covers a different part of reactivity, for the start
 * we'll make use of the library that is included in this repository where you can
 * have a look at the implementation in the `src/lib` directory, named `@reactivity.
 *
 * There will also be always a link to the vue documentation and, in the beginning, a link
 * to the implementation in this repository.
 *
 * I HIGHLY recommend you to have a look at the implementations, if available, in this repository
 * to get a better understanding of how things work.
 *
 *
 * If all tests pass you can jump to the next exercise by running `npm start 01` and opening the next file.
 */

/**
 * In this exercise you need to increment the counter value by 1.
 * A `ref` is a reactive reference that can be used to store a value.
 * It's basically just an object with a `value` property that you can read and write.
 *
 * Implementation: `src/lib/ref.ts`
 * Vue implementation: https://vuejs.org/api/reactivity-core.html#shallowRef
 */
test('Count up a ref', () => {
  const counter = ref(0);
  expect(counter.value).toEqual(0);

  // TODO: Increment the counter value by 1

  expect(counter.value).toEqual(1);
});

/**
 * Values from refs can be accessed and modified like any other object property.
 */
test('Calculate the sum of two refs', () => {
  const a = ref(5);
  const b = ref(3);

  expect(a.value).toEqual(5);
  expect(b.value).toEqual(3);

  const sum = 0; // TODO: Calculate the sum of a and b

  expect(sum).toEqual(8);
});
