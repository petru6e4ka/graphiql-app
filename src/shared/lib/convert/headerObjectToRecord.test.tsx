import { expect, test, describe } from 'vitest';
import { headerObjectToRecord } from './headerObjToRecord';

describe('headerObjToRecord', () => {
  test('Converts object to record', async () => {
    expect(
      headerObjectToRecord([
        {
          name: 'test1',
          value: 'test2',
        },
        {
          name: 'name',
          value: 'value',
        },
      ]),
    ).toEqual({
      test1: 'test2',
      name: 'value',
    });
  });
});
