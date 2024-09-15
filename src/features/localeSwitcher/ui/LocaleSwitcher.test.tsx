import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { LocaleSwitcher } from './LocaleSwitcher';

describe('LocaleSwitcher', () => {
  it('renders', async () => {
    vi.mock('next/navigation');

    await renderWithWrappers(<LocaleSwitcher />);

    const selectElement = screen.getByRole('textbox', {
      name: 'Switch locale',
    });

    expect(selectElement).toBeInTheDocument();
  });

  it('changes locale', async () => {
    const nextRouter = await import('next/navigation');

    nextRouter.useRouter = vi.fn().mockReturnValue({
      push: vi.fn(),
    });

    nextRouter.usePathname = vi.fn().mockReturnValue({
      replace: vi.fn(),
    });

    const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

    await renderWithWrappers(<LocaleSwitcher />);

    const languageBtn = screen.getByAltText('RU Flag');

    fireEvent.click(languageBtn as HTMLImageElement);

    expect(spyFn).toHaveBeenCalled();
  });
});
