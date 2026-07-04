import { safeJsonParse, safeJsonParseWithDefault, safeJsonParseOrNull, safeJsonParseWithValidation } from '../safe-json-parse.helper';

describe('safeJsonParse', () => {
  test('parses valid JSON strings', () => {
    expect(safeJsonParse('{"name":"John"}')).toEqual({ name: 'John' });
    expect(safeJsonParse('[1,2,3]')).toEqual([1, 2, 3]);
    expect(safeJsonParse('"hello"')).toBe('hello');
    expect(safeJsonParse('42')).toBe(42);
    expect(safeJsonParse('true')).toBe(true);
    expect(safeJsonParse('null')).toBe(null);
  });

  test('handles invalid JSON strings', () => {
    expect(safeJsonParse('invalid')).toBeUndefined();
    expect(safeJsonParse('{"name":}')).toBeUndefined();
    expect(safeJsonParse('["unclosed')).toBeUndefined();
  });

  test('handles non-string inputs', () => {
    expect(safeJsonParse(42)).toBeUndefined();
    expect(safeJsonParse(null)).toBeUndefined();
    expect(safeJsonParse(undefined)).toBeUndefined();
    expect(safeJsonParse({})).toBeUndefined();
  });

  test('handles empty strings', () => {
    expect(safeJsonParse('')).toBeUndefined();
    expect(safeJsonParse('   ')).toBeUndefined();
  });

  test('handles fallback option', () => {
    expect(safeJsonParse('invalid', { fallback: {} })).toEqual({});
    expect(safeJsonParse('invalid', { fallback: 'default' })).toBe('default');
    expect(safeJsonParse('invalid', { fallback: 0 })).toBe(0);
  });

  test('handles returnNull option', () => {
    expect(safeJsonParse('invalid', { returnNull: true })).toBe(null);
    expect(safeJsonParse(null, { returnNull: true })).toBe(null);
  });

  test('handles validate option', () => {
    const validator = (value: unknown): boolean => {
      return typeof value === 'object' && value !== null && 'name' in value;
    };
    expect(safeJsonParse('{"name":"John"}', { validate: validator })).toEqual({ name: 'John' });
    expect(safeJsonParse('{"age":30}', { validate: validator })).toBeUndefined();
  });
});

describe('safeJsonParseWithDefault', () => {
  test('returns parsed value for valid JSON', () => {
    expect(safeJsonParseWithDefault('{"name":"John"}', {})).toEqual({ name: 'John' });
  });

  test('returns default for invalid JSON', () => {
    expect(safeJsonParseWithDefault('invalid', { default: true })).toEqual({ default: true });
    expect(safeJsonParseWithDefault('', { default: true })).toEqual({ default: true });
  });
});

describe('safeJsonParseOrNull', () => {
  test('returns parsed value for valid JSON', () => {
    expect(safeJsonParseOrNull('{"name":"John"}')).toEqual({ name: 'John' });
  });

  test('returns null for invalid JSON', () => {
    expect(safeJsonParseOrNull('invalid')).toBe(null);
    expect(safeJsonParseOrNull(null)).toBe(null);
  });
});

describe('safeJsonParseWithValidation', () => {
  test('returns validated value for valid JSON', () => {
    const isUser = (value: unknown): value is { name: string } => {
      return typeof value === 'object' && value !== null && 'name' in value;
    };
    expect(safeJsonParseWithValidation('{"name":"John"}', isUser)).toEqual({ name: 'John' });
  });

  test('returns undefined for invalid validation', () => {
    const isUser = (value: unknown): value is { name: string } => {
      return typeof value === 'object' && value !== null && 'name' in value;
    };
    expect(safeJsonParseWithValidation('{"age":30}', isUser)).toBeUndefined();
  });
});
