import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('header component', () => {
  test('Header renders', () => {
    render(
      <Header>
        <div data-testid="mock" />
      </Header>,
    );

    expect(screen.getByRole('link')).toHaveProperty('href', 'http://localhost:3000/');
    expect(screen.getByTestId('mock')).toBeInTheDocument();
  });
});
