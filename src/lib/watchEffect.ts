import { _effect } from './internal/core';

export type StopEffectCallback = () => void;

export const watchEffect = (fn: () => void): StopEffectCallback => {
  return _effect(fn);
};
