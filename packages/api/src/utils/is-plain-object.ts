/**
 * Checks if a value is a plain object.
 * @param value - The value to check.
 * @returns True if the value is a plain object, false otherwise.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}