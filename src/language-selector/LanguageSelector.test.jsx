import React from 'react';
import { mergeConfig } from '@edx/frontend-platform';
import { getLocale } from '@edx/frontend-platform/i18n/lib';
import { changeUserSessionLanguage } from '@edx/frontend-platform/i18n';
import {
  act, fireEvent, initializeMockApp, render, screen,
} from '../setupTest';
import LanguageSelector from './LanguageSelector';

jest.mock('@edx/frontend-platform/i18n', () => ({
  ...jest.requireActual('@edx/frontend-platform/i18n'),
  changeUserSessionLanguage: jest.fn().mockResolvedValue({}),
}));

jest.mock('@edx/frontend-platform/i18n/lib', () => ({
  ...jest.requireActual('@edx/frontend-platform/i18n/lib'),
  getLocale: jest.fn(),
}));

jest.mock('@openedx/paragon/icons', () => ({
  Language: () => <div>LanguageIcon</div>,
}));

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useWindowSize: () => ({ width: global.innerWidth }),
}));

const LANGUAGE_PREFERENCE_COOKIE_NAME = 'language-preference';

describe('LanguageSelector', () => {
  let mockReload;

  beforeEach(() => {
    jest.clearAllMocks();

    mergeConfig({
      ENABLE_HEADER_LANG_SELECTOR: true,
      LANGUAGE_PREFERENCE_COOKIE_NAME,
      SITE_SUPPORTED_LANGUAGES: ['es', 'en'],
    });

    initializeMockApp();

    mockReload = jest.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: { reload: mockReload },
    });

    global.innerWidth = 1200;
  });

  it('should not render when no supported languages are available', () => {
    mergeConfig({
      SITE_SUPPORTED_LANGUAGES: [],
    });

    const { container } = render(<LanguageSelector />);
    // expect(container).toMatchSnapshot('no-supported-languages');
    expect(container.querySelector('#language-selector')).toBeNull();
  });

  it('should change the language when different language is selected', async () => {
    getLocale.mockReturnValue('en');

    const { container } = render(<LanguageSelector />);
    expect(container).toMatchSnapshot('before-language-change');

    const langDropdown = screen.getByRole('button', { id: 'lang-selector-dropdown' });
    fireEvent.click(langDropdown);

    const spanishOption = screen.getByRole('button', { name: 'Español' });

    await act(async () => {
      fireEvent.click(spanishOption);
    });

    expect(container).toMatchSnapshot('after-language-change');
    expect(changeUserSessionLanguage).toHaveBeenCalledWith('es');
  });

  it('should not change language if the same language is selected', async () => {
    getLocale.mockReturnValue('en');

    const { container } = render(<LanguageSelector />);
    expect(container).toMatchSnapshot('before-same-language-selection');

    const langDropdown = screen.getByRole('button', { id: 'lang-selector-dropdown' });
    fireEvent.click(langDropdown);

    const englishOption = screen.getByRole('button', { name: 'English' });
    await act(async () => {
      fireEvent.click(englishOption);
    });

    expect(container).toMatchSnapshot('after-same-language-selection');
    expect(changeUserSessionLanguage).not.toHaveBeenCalled();
  });

  it('should display full language name on large screens', () => {
    getLocale.mockReturnValue('en');

    global.innerWidth = 1200;
    render(<LanguageSelector />);

    const button = screen.getByRole('button', { id: 'lang-selector-dropdown' });
    expect(button).toMatchSnapshot('large-screen-button');
  });

  it('should display language code on medium screens', () => {
    getLocale.mockReturnValue('en');

    global.innerWidth = 700;
    render(<LanguageSelector />);

    const button = screen.getByRole('button', { id: 'lang-selector-dropdown' });
    expect(button).toMatchSnapshot('medium-screen-button');
  });

  it('should display only icon on small screens', () => {
    getLocale.mockReturnValue('en');

    global.innerWidth = 500;
    render(<LanguageSelector />);

    const button = screen.getByRole('button', { id: 'lang-selector-dropdown' });
    expect(button).toMatchSnapshot('small-screen-button');
  });
});
