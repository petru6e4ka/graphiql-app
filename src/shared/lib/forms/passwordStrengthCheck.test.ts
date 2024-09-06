import { expect, test, describe } from 'vitest';
import { passwordStrengthCheck } from './passwordStrengthCheck';

describe('passwordStrengthCheck', () => {
  test('Returns function', async () => {
    const arg = 'Invalid';
    const checker = passwordStrengthCheck(arg);

    expect(typeof checker).toBe('function');
    expect(checker('1')).toBe(arg);
    expect(checker('qqqqqqqqq')).toBe(arg);
    expect(checker('111111111')).toBe(arg);
    expect(checker('111111qqq')).toBe(arg);
    expect(checker('111111qqq!')).toBe(null);
  });
});
