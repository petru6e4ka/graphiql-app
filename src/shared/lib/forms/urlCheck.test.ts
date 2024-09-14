import { expect, test, describe } from 'vitest';
import { urlCheck } from './urlCheck';

describe('URL check', () => {
  test('Returns function', async () => {
    const arg = 'Invalid';
    const checker = urlCheck(arg);

    expect(typeof checker).toBe('function');
    expect(checker('1')).toBe(arg);
    expect(checker('qqqqqqqqq')).toBe(arg);
    expect(checker('https://test.com')).toBe(null);
    expect(checker('http://test2.com')).toBe(null);
  });
});
