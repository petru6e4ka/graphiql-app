import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { ReactNode } from 'react';
import { SessionWrapper } from './AuthProvider';

describe('ToastProvider', () => {
  it('renders children and SessionWrapper', async () => {
    const auth = await import('next-auth/react');

    const testComponent = ({ children }: { children: ReactNode }) => <div data-testid="wrapper">{children}</div>;

    auth.SessionProvider = testComponent;

    render(
      <SessionWrapper>
        <div>Child Component</div>
      </SessionWrapper>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });
});
