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
    expect(screen.getByLabelText(/Endpoint URL:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Query:/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Response/i, level: 2 })).toBeInTheDocument();
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
    fireEvent.click(screen.getByText(/Fetch documentation/i));

    await waitFor(
      () => {
        expect(screen.getByRole('heading', { name: /Documentation/i, level: 3 })).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  test('updates query', async () => {
    await renderWithWrappers(<GraphiQLClient />);
    const queryInput = screen.getByLabelText(/Query:/i) as HTMLInputElement;
    fireEvent.change(queryInput, { target: { value: 'query { character { name } }' } });
    await waitFor(() => {
      expect(normalizeWhitespace(queryInput.value)).toBe(normalizeWhitespace('query { character { name } }'));
    });
  });

  test('updates headers', async () => {
    await renderWithWrappers(<GraphiQLClient />);

    const addButton = screen.getAllByAltText(/Plus/i)[0];
    fireEvent.click(addButton);

    const headerNameInput = screen.getAllByPlaceholderText(/Key/i)[0];
    const headerValueInput = screen.getAllByPlaceholderText(/Value/i)[0];

    fireEvent.change(headerNameInput, { target: { value: 'Authorization' } });
    fireEvent.change(headerValueInput, { target: { value: 'Bearer token' } });

    await waitFor(() => {
      expect(headerNameInput).toHaveValue('Authorization');
    });

    await waitFor(() => {
      expect(headerValueInput).toHaveValue('Bearer token');
    });
  });

  test('updates vals', async () => {
    await renderWithWrappers(<GraphiQLClient />);

    const addButton = screen.getAllByAltText(/Plus/i)[1];
    fireEvent.click(addButton);

    const headerNameInput = screen.getAllByPlaceholderText(/Key/i)[1];
    const headerValueInput = screen.getAllByPlaceholderText(/Value/i)[1];

    fireEvent.change(headerNameInput, { target: { value: 'planetID' } });
    fireEvent.change(headerValueInput, { target: { value: '2' } });

    await waitFor(() => {
      expect(headerNameInput).toHaveValue('planetID');
    });

    await waitFor(() => {
      expect(headerValueInput).toHaveValue('2');
    });
  });
});
