import { describe, expect, test, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { TwoInputs } from '.';

describe('TwoInputs component', async () => {
  test('Two inputs renders with value=""', async () => {
    await renderWithWrappers(<TwoInputs id="example" name="" value="" update={vi.fn()} />);

    expect(screen.getByPlaceholderText('Key')).toHaveProperty('value', '');
    expect(screen.getByPlaceholderText('Value')).toHaveProperty('value', '');
  });

  test('Inputs should change', async () => {
    await renderWithWrappers(<TwoInputs id="example" name="" value="" update={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('Key'), { target: { value: 'a' } });
    expect(screen.getByPlaceholderText('Key')).toHaveProperty('value', 'a');
    fireEvent.change(screen.getByPlaceholderText('Value'), { target: { value: 'b' } });
    expect(screen.getByPlaceholderText('Value')).toHaveProperty('value', 'b');
  });
});
