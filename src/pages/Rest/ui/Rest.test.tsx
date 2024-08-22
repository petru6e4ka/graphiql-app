import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Rest } from './Rest';

test('Rest page', () => {
  render(<Rest />);
  expect(screen.getByRole('heading', { level: 1, name: 'Rest' })).toBeDefined();
});
