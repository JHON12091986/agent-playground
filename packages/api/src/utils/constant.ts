/**
 * A utility function that returns a constant value.
 * @param value - The constant value to return.
 * @returns A function that returns the constant value.
 */
export function constant<T>(value: T): () => T {
  return () => value;
}