import {
  describe, expect, test, vi,
} from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import GraphiQLClient from './page';

const normalizeWhitespace = (str: string) => str.replace(/\s+/g, ' ').trim();

describe('GraphiQLClient page', () => {
  test('GraphiQLClient renders', async () => {
    await renderWithWrappers(<GraphiQLClient />);
    expect(screen.getByRole('heading', { name: /GraphiQL Client/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText(/Endpoint URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Query/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Response:/i, level: 2 })).toBeInTheDocument();
  });

  test('updates URL state', async () => {
    await renderWithWrappers(<GraphiQLClient />);
    const urlInput = screen.getByLabelText(/Endpoint URL/i);
    fireEvent.change(urlInput, { target: { value: 'https://rickandmortyapi.com/graphql' } });
    await waitFor(() => {
      expect(screen.getByLabelText(/Endpoint URL/i)).toHaveValue('https://rickandmortyapi.com/graphql');
    });
  });

  test('fetches documentation', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      text: () => Promise.resolve('Documentation'),
    })) as unknown as typeof fetch;

    await renderWithWrappers(<GraphiQLClient />);
    fireEvent.click(screen.getByText(/Fetch Documentation/i));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Documentation/i, level: 3 })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('updates query', async () => {
    await renderWithWrappers(<GraphiQLClient />);
    const queryInput = screen.getByLabelText(/Query/i) as HTMLInputElement;
    fireEvent.change(queryInput, { target: { value: 'query { character { name } }' } });
    await waitFor(() => {
      expect(normalizeWhitespace(queryInput.value)).toBe(normalizeWhitespace('query { character { name } }'));
    });
  });

  test('updates variables', async () => {
    await renderWithWrappers(<GraphiQLClient />);
    const variablesInput = screen.getByLabelText(/Variables/i) as HTMLTextAreaElement;
    fireEvent.change(variablesInput, { target: { value: '{ "name": "Rick" }' } });
    await waitFor(() => {
      expect(normalizeWhitespace(variablesInput.value)).toBe(normalizeWhitespace('{ "name": "Rick" }'));
    });
  });

  test('updates headers', async () => {
    await renderWithWrappers(<GraphiQLClient />);

    const addButton = screen.getByAltText(/Plus/i);
    fireEvent.click(addButton);

    const headerNameInput = screen.getByPlaceholderText(/Key/i);
    const headerValueInput = screen.getByPlaceholderText(/Value/i);

    fireEvent.change(headerNameInput, { target: { value: 'Authorization' } });
    fireEvent.change(headerValueInput, { target: { value: 'Bearer token' } });

    await waitFor(() => {
      expect(headerNameInput).toHaveValue('Authorization');
    });

    await waitFor(() => {
      expect(headerValueInput).toHaveValue('Bearer token');
    });
  });
});
