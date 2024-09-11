import { describe, expect, test } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { TwoInputs } from '.';

describe('TwoInputs component', async () => {
  const prop = {
    id: 'example',
    ky: '',
    value: '',
  };

  test('Two inputs renders with value=""', async () => {
    await renderWithWrappers(<TwoInputs {...prop} />);

    expect(screen.getByPlaceholderText('Key')).toHaveProperty('value', '');
    expect(screen.getByPlaceholderText('Value')).toHaveProperty('value', '');
  });
  test('Inputs should change', async () => {
    await renderWithWrappers(<TwoInputs {...prop} />);

    fireEvent.change(screen.getByPlaceholderText('Key'), { target: { value: 'a' } });
    expect(screen.getByPlaceholderText('Key')).toHaveProperty('value', 'a');
    fireEvent.change(screen.getByPlaceholderText('Value'), { target: { value: 'b' } });
    expect(screen.getByPlaceholderText('Value')).toHaveProperty('value', 'b');
  });
});
