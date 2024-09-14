import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { ToastProvider } from './ToastProvider';

describe('ToastProvider', () => {
  it('renders children and ToastContainer', () => {
    render(
      <ToastProvider>
        <div>Child Component</div>
      </ToastProvider>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
