import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithLocalization } from '@/shared/lib/tests/withLocalization';
import { Footer } from './Footer';

describe('Footer component', () => {
  test('Footer renders', async () => {
    await renderWithLocalization(<Footer />);

    expect(screen.getByRole('img', { name: 'RSSchool' })).toHaveProperty('alt', 'RSSchool');
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Evgeny')).toHaveProperty('href', 'https://github.com/zytsev');
    expect(screen.getByText('Anastasiia')).toHaveProperty('href', 'https://github.com/petru6e4ka');
    expect(screen.getByText('Ivan')).toHaveProperty('href', 'https://github.com/mindvan');
  });
});
