import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import Rest from './page';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Rest page', async () => {
  test('Rest renders', async () => {
    await renderWithWrappers(<Rest />);
    expect(screen.getByRole('heading', { name: /Rest client/i, level: 1 })).toBeInTheDocument();
  });

  test('Shows loading', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon', () => HttpResponse.json([], { status: 200 })));
    await renderWithWrappers(<Rest />);

    const submitBtn = screen.getByText('Send');
    const urlInput = screen.getByPlaceholderText('URL');

    expect(submitBtn).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();

    fireEvent.change(urlInput, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    fireEvent.click(submitBtn);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('Shows success response data', async () => {
    const response = 'TEST RESPONSE';

    server.use(http.get('https://pokeapi.co/api/v2/pokemon', () => HttpResponse.text(response, { status: 200 })));

    await renderWithWrappers(<Rest />);

    const submitBtn = screen.getByText('Send');
    const urlInput = screen.getByPlaceholderText('URL');

    expect(submitBtn).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();

    fireEvent.change(urlInput, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    fireEvent.click(submitBtn);

    const loader = await screen.findByTestId('loader');

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });

    const status = await screen.findByText('Status code');
    const statusCode = await screen.findByText('200');
    const responseBody = await screen.findByText(response);

    expect(status).toBeInTheDocument();
    expect(statusCode).toBeInTheDocument();
    expect(responseBody).toBeInTheDocument();
  });

  test('Shows data', async () => {
    const response = 'NOT FOUND';

    server.use(http.get('https://pokeapi.co/api/v2/pokemon', () => HttpResponse.text(response, { status: 404 })));

    await renderWithWrappers(<Rest />);

    const submitBtn = screen.getByText('Send');
    const urlInput = screen.getByPlaceholderText('URL');

    expect(submitBtn).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();

    fireEvent.change(urlInput, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    fireEvent.click(submitBtn);

    const loader = await screen.findByTestId('loader');

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });

    const status = await screen.findByText('Status code');
    const statusCode = await screen.findByText('404');
    const responseBody = await screen.findByText(response);

    expect(status).toBeInTheDocument();
    expect(statusCode).toBeInTheDocument();
    expect(responseBody).toBeInTheDocument();
  });
});
