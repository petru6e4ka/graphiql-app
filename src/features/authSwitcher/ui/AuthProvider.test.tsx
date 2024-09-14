import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { SessionWrapper } from './AuthProvider';

describe('ToastProvider', () => {
  it('renders children and SessionWrapper', () => {
    render(
      <SessionWrapper>
        <div>Child Component</div>
      </SessionWrapper>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
