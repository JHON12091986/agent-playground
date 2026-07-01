/**
 * Checks if a value is iterable.
 * @param value - The value to check.
 * @returns True if the value is iterable, false otherwise.
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  return typeof value === 'object' &&
    value !== null &&
    Symbol.iterator in value &&
    typeof (value as Iterable<unknown>)[Symbol.iterator] === 'function';
}