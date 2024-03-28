import { watchEffect, ref } from '@reactivity';
import { expect, test, vi } from 'vitest';

/**
 * In this chapter we talk about how we can watch and track the value of a ref.
 *
 * Implementation: `src/lib/watchEffect.ts`.
 * Vue implementation: https://vuejs.org/api/reactivity-core.html#watcheffect
 */

/**
 * In this exercise you need to log the value of a ref.
 */
test('1. Logging the value of a ref', () => {
  const counter = ref(0);

  // vi.fn is only used to track the calls of the callback
  // normally you'd just pass a function to `effect`.
  const callback = vi.fn(() => {
    // TODO: Log the value of the counter
  });

  watchEffect(callback);

  for (let i = 0; i < 10; i++) {
    counter.value++;
  }

  expect(callback).toHaveBeenCalledTimes(11);
});

/**
 * Changing the value of a ref to the same value does not trigger the effect.
 * However, to first track the dependencies of a callback, it has to be called once.
 * Otherwise, the effect would not know when it should be triggered again.
 */
test('2. Changing the value of a ref to the current value', () => {
  const counter = ref(0);

  // Note: `void` evaluates any expression and returns undefined.
  // Useful if you want to access a variable without the linter telling you that you didn't use it.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
  const callback = vi.fn(() => void counter.value);
  watchEffect(callback);

  for (const v of [1, 1, 2, 2, 3, 3]) {
    counter.value = v;
  }

  const callCount = 0; // TODO: How often was the callback called?

  expect(callback).toHaveBeenCalledTimes(callCount);
});

/**
 * Everytime the effect function is called the dependencies are re-calculated.
 * This means that if you never access a ref in the callback, it will never be tracked / triggered again.
 * This usually never happens in a real-world scenario, but it's good to know.
 *
 * Again, keep in mind that an effect callback has to be called at least once.
 */
test('3. Implicitly deactivating an effect', () => {
  const counter = ref(0);
  let callBackCalled = 0;

  const callback = vi.fn(() => {
    callBackCalled++;

    if (callBackCalled < 5) {
      counter.value; // Note that we access the value here
    }
  });

  watchEffect(callback);

  for (let i = 0; i < 10; i++) {
    counter.value++;
  }

  const callCount = 0; // TODO: How often was the callback called?

  expect(callback).toHaveBeenCalledTimes(callCount);
});

/**
 * You can change the value of a ref in an effect callback.
 */
test('4. Changing refs in effects', () => {
  const counterWasDivisibleByTwo = ref(0);
  const counter = ref(0);

  const callback = vi.fn(() => {
    // TODO: Update the counterWasDivisibleByTwo value based on the counter value
  });

  watchEffect(callback);

  for (let i = 0; i < 10; i++) {
    counter.value++;
  }

  expect(callback).toHaveBeenCalledTimes(11);
  expect(counterWasDivisibleByTwo.value).toEqual(6);
});

/**
 * The `effect` function is triggered if any of the refs it depends on changes.
 */
test('5. Reacting to several refs', () => {
  const counter2 = ref(0);
  const counter = ref(0);

  const callback = vi.fn(() => {
    void counter.value;
    void counter2.value;
  });

  watchEffect(callback);

  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      counter2.value++;
    } else {
      counter.value++;
    }
  }

  const callCount = 0; // TODO: How often was the callback called?

  expect(callback).toHaveBeenCalledTimes(callCount);
});

/**
 * The `effect` function returns a function to stop the effect explicitly.
 */
test('6. Implicitly deactivating an effect', () => {
  const counter2 = ref(0);
  const counter = ref(0);

  watchEffect(() => {
    counter2.value = counter.value;
  });

  counter.value++;
  counter.value++;
  counter.value++;

  // TODO: Stop the effect, you might introduce a new variable for this as well

  counter.value++;
  counter.value++;

  expect(counter.value).toEqual(5);
  expect(counter2.value).toEqual(3);
});

/**
 * Let's now calculate the sum of two values.
 */
test('7. Calculating the sum of two refs using `effect`', () => {
  const a = ref(3);
  const b = ref(5);
  const sum = ref(-1);

  // TODO: Use `effect` to calculate the sum of a and b and store it in the sum ref

  // Remember: effects are triggered immediately to track dependencies
  // The sum should at this point already have the value of 8
  expect(sum.value).toEqual(8);

  a.value = 4;
  expect(sum.value).toEqual(9);

  a.value = 0;
  b.value = 3;
  expect(sum.value).toEqual(3);
});
