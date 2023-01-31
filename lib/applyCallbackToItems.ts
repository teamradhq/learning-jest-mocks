import { applyCallback } from '@lib/applyCallback';

/**
 * Applies a callback to an array of items.
 *
 * @param callback
 * @param items
 */
export function applyCallbackToItems<T, U>(
  callback: (value: T) => U,
  items: T[],
): U[] {
  const result: U[] = [];

  for (const item of items) {
    result.push(applyCallback(callback, item));
  }

  return result;
}
