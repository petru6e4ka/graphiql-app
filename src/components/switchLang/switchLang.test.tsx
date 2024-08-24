import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SwitchLang from './switchLang';

describe('SwitchLang component', () => {
  test('SwitchLang renders', () => {
    render(<SwitchLang />);

    expect(screen.getAllByRole('radio').length).toBe(3);
    expect(screen.getByLabelText('English', { selector: 'input' })).toHaveProperty('value', 'en');
    expect(screen.getByLabelText('Russian', { selector: 'input' })).toHaveProperty('value', 'ru');
    expect(screen.getByLabelText('Deutsch', { selector: 'input' })).toHaveProperty('value', 'de');
    expect(screen.getByLabelText('English', { selector: 'input' })).toHaveProperty('checked', true);
  });

  test('Choose input "Russian" after click', () => {
    fireEvent.click(screen.getByLabelText('Russian', { selector: 'input' }));
    expect(screen.getByLabelText('Russian', { selector: 'input' })).toHaveProperty('checked', true);
  });
});
