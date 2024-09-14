import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { RestForm } from './RestForm';

describe('RestForm', async () => {
  test('RestForm renders', async () => {
    await renderWithWrappers(<RestForm />);

    expect(screen.getByPlaceholderText('Method')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('URL')).toBeInTheDocument();
  });
});
