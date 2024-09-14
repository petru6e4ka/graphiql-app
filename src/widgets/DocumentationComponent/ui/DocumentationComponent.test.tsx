import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { DocumentationComponent } from './DocumentationComponent';

describe('DocumentationComponent', () => {
  test('renders documentation when provided', async () => {
    const documentationText = 'GraphQL SDL Documentation';

    await renderWithWrappers(<DocumentationComponent documentation={documentationText} />);

    expect(screen.getByRole('heading', { name: /Documentation/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('SDL Documentation')).toBeInTheDocument();
    expect(screen.getByDisplayValue(documentationText)).toBeInTheDocument();
  });

  test('does not render when documentation is empty', async () => {
    await renderWithWrappers(<DocumentationComponent documentation="" />);

    expect(screen.queryByRole('heading', { name: /Documentation/i })).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('SDL Documentation')).not.toBeInTheDocument();
  });
});
