/* eslint-disable @typescript-eslint/no-explicit-any */
import { _touch } from './internal/core';

// This type also exists in vue, but is more complex.
export type UnwrapRefs<T extends Ref[] | Ref> = T extends Ref[]
  ? { [K in keyof T]: T[K] extends Ref ? T[K]['value'] : never }
  : T extends Ref
    ? T['value']
    : never;

export type Subscriber<T = any> = (value: T, oldValue: T) => void;

// Possible, internal interface of a `ref`.
// In reality, it would be a lot more complex.
export interface Ref<T = any> {
  subscribe(fn: Subscriber<T>): void;
  unSubscribe(fn: Subscriber<T>): void;
  value: T;
}

/**
 * Creates a reactive reference that only shallowly tracks the value.
 * In vue it'd be a shallowRef: https://vuejs.org/api/reactivity-advanced.html#shallowref
 */
export const ref = <T = any>(init?: T): Ref<T> => {
  const subscribers: Set<Subscriber<T>> = new Set();
  let updating = false;
  let value = init;

  return {
    // Subscribing and unsubscribing to the ref.
    subscribe: (fn: Subscriber<T>) => subscribers.add(fn),
    unSubscribe: (fn: Subscriber<T>) => subscribers.delete(fn),

    set value(v: T) {
      if (v === value) {
        return;
      }

      const oldValue = value;
      value = v;

      if (updating) {
        return;
      }

      // subscribers may be changed when one is called
      updating = true;
      const subscriberCount = subscribers.size;
      const iterator = subscribers[Symbol.iterator]();
      for (let i = 0; i < subscriberCount; i++) {
        iterator.next().value(value, oldValue);
      }

      updating = false;
    },

    get value() {
      _touch(this);
      return value;
    }
  };
};
