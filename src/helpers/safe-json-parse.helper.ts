export interface SafeJsonParseOptions {
  fallback?: unknown;
  returnNull?: boolean;
  logErrors?: boolean;
  validate?: (value: unknown) => boolean;
}

export function safeJsonParse<T = unknown>(
  input: unknown,
  options: SafeJsonParseOptions = {}
): T | undefined | null {
  const {
    fallback = undefined,
    returnNull = false,
    logErrors = false,
    validate
  } = options;

  if (input === null || input === undefined) {
    return returnNull ? null : fallback;
  }

  if (typeof input !== 'string') {
    return returnNull ? null : fallback;
  }

  const trimmed = input.trim();
  if (trimmed === '') {
    return returnNull ? null : fallback;
  }

  try {
    const parsed = JSON.parse(trimmed) as T;
    if (validate && !validate(parsed)) {
      return returnNull ? null : fallback;
    }
    return parsed;
  } catch (error) {
    if (logErrors) {
      console.warn('safeJsonParse: Failed to parse JSON', error);
    }
    return returnNull ? null : fallback;
  }
}

export function safeJsonParseWithDefault<T>(
  input: unknown,
  defaultValue: T
): T {
  const result = safeJsonParse<T>(input, { fallback: defaultValue });
  return result !== undefined ? result : defaultValue;
}

export function safeJsonParseOrNull<T>(input: unknown): T | null {
  return safeJsonParse<T>(input, { returnNull: true });
}

export function safeJsonParseWithValidation<T>(
  input: unknown,
  validator: (value: unknown) => value is T
): T | undefined {
  return safeJsonParse<T>(input, { validate: validator }) as T | undefined;
}
