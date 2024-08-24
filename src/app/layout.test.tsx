import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

describe('Layout component', () => {
  test('Footer renders', () => {
    render(<RootLayout children={undefined} />);

    expect(screen.getByRole('img', { name: 'RSSchool' })).toHaveProperty('alt', 'RSSchool');
    expect(screen.getByText('2024')).toBeDefined();
    expect(screen.getByText('Evgeny')).toHaveProperty('href', 'https://github.com/zytsev');
    expect(screen.getByText('Anastasiia')).toHaveProperty('href', 'https://github.com/petru6e4ka');
    expect(screen.getByText('Ivan')).toHaveProperty('href', 'https://github.com/mindvan');
  });
});
