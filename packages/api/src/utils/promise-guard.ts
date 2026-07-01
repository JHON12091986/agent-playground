/**
 * Safely executes a promise with error handling.
 * @param promise - The promise to execute.
 * @param fallback - The fallback value if the promise rejects (default: undefined).
 * @returns The resolved value or fallback.
 */
export async function promiseGuard<T>(
  promise: Promise<T>,
  fallback?: T
): Promise<T | undefined> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}