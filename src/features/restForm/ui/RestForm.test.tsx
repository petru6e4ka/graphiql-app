import { describe, expect, test, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { RestForm } from './RestForm';

describe('RestForm', async () => {
  test('Renders', async () => {
    await renderWithWrappers(<RestForm onSubmit={vi.fn()} />);

    expect(screen.getByPlaceholderText('Method')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('URL')).toBeInTheDocument();
  });

  test('Submit data', async () => {
    const spy = vi.fn();
    await renderWithWrappers(<RestForm onSubmit={spy} />);

    const submitBtn = screen.getByText('Send');
    const urlInput = screen.getByPlaceholderText('URL');

    expect(submitBtn).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();

    fireEvent.change(urlInput, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });

    fireEvent.click(submitBtn);
    expect(spy).toHaveBeenCalled();
  });

  test('Toggles body format', async () => {
    await renderWithWrappers(<RestForm onSubmit={vi.fn()} />);

    const toggleToJSON = screen.getByText('JSON');
    const toggleBtnToString = screen.getByText('String');
    const stringArea = screen.getByTestId('string-area');

    expect(toggleToJSON).toBeInTheDocument();
    expect(toggleBtnToString).toBeInTheDocument();
    expect(stringArea).toBeInTheDocument();

    fireEvent.click(toggleToJSON);

    expect(stringArea).not.toBeInTheDocument();
    expect(screen.getByTestId('json-area')).toBeInTheDocument();
  });
});
