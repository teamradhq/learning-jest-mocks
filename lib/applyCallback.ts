/**
 * Applies a callback to a value.
 *
 * @param callback
 * @param value
 */
export function applyCallback<T, U>(
  callback: (value: T) => U,
  value: T,
): U {
  return callback(value);
}
