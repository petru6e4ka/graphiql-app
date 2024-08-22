import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Welcome } from './Welcome';

test('Welcome page', () => {
  render(<Welcome />);
  expect(screen.getByRole('heading', { level: 1, name: 'Welcome' })).toBeDefined();
});
