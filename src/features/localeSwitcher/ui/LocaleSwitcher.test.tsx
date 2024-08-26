import { render, screen, fireEvent } from '@testing-library/react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { LocaleSwitcher } from '@/features/localeSwitcher/ui/LocaleSwitcher';

import { locales } from '@/features/localeSwitcher/config/locales';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => 'en/signin',
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}));

describe('LocaleSwitcher', () => {
  it('select element with locale options', () => {
    render(<LocaleSwitcher />);

    const selectElement = screen.getByTestId('locale-switcher');

    expect(selectElement).toBeInTheDocument();

    locales.forEach((locale) => {
      expect(screen.getByText(`langs.${locale}`)).toBeInTheDocument();
    });
  });

  it('new locale when a new locale is selected', () => {
    pushMock.mockClear();

    render(<LocaleSwitcher />);

    const selectElement = screen.getByTestId('locale-switcher');

    fireEvent.change(selectElement, { target: { value: 'de' } });
    expect(pushMock).toHaveBeenCalledWith('de/signin');
  });
});
