import { expect, test, describe } from 'vitest';
import { isJsonString } from './isJsonString';

describe('JSON string check', () => {
  test('Returns false', async () => {
    expect(isJsonString('test12345')).toBe(false);
  });

  test('Returns true', async () => {
    expect(isJsonString(JSON.stringify({ test: 1 }))).toBe(true);
  });
});
