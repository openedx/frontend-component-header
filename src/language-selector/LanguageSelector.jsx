import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import { changeUserSessionLanguage, getPrimaryLanguageSubtag, injectIntl } from '@edx/frontend-platform/i18n';
import { getLocale } from '@edx/frontend-platform/i18n/lib';
import { AppContext } from '@edx/frontend-platform/react';
import { Dropdown } from '@openedx/paragon';
import { Language } from '@openedx/paragon/icons';

/**
 * Gets the localized display name of a language in its own language.
 *
 * @function getDisplayName
 * @param {string} locale - The locale code (e.g., 'en', 'es', 'ar')
 * @returns {string} The capitalized display name of the language in its native form
 * @example
 */
const getDisplayName = (locale) => {
  const langName = new Intl.DisplayNames([locale], { type: 'language', languageDisplay: 'standard' }).of(locale);
  return langName.charAt(0).toUpperCase() + langName.slice(1);
};

/**
 * Language Selector component that displays a dropdown allowing users to change the site language.
 *
 * The component is responsive and adapts to different screen sizes:
 * - On large screens: Shows the full language name (e.g., "English")
 * - On medium screens: Shows the language code (e.g., "EN")
 * - On small screens: Shows only the language icon
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS class names to apply to the component
 * @returns {React.Element|null} The rendered component or null if disabled or no supported languages
 *
 * @requires config.SITE_SUPPORTED_LANGUAGES - Must be a non-empty array of locale codes
 * @requires config.LANGUAGE_PREFERENCE_COOKIE_NAME - Cookie name for storing language preference
 */
const LanguageSelector = ({ className }) => {
  const { config } = useContext(AppContext);

  const languageOptions = config.SITE_SUPPORTED_LANGUAGES;
  const [currentLocale, setCurrentLocale] = useState(getLocale());

  /**
   * Handles the selection of a language from the dropdown.
   * Only triggers language change if the selected language is different from the current one.
   *
   * @param {string} selectedLocale - The locale code selected by the user
   */
  const handleSelect = (selectedLocale) => {
    if (currentLocale !== selectedLocale) {
      changeUserSessionLanguage(selectedLocale);
      setCurrentLocale(selectedLocale);
    }
  };

  const currentLangCode = getPrimaryLanguageSubtag(currentLocale).toUpperCase();
  const currentlangDisplayName = getDisplayName(currentLocale);

  // Don't render the component if there are no language options
  if (!Array.isArray(languageOptions)
    || languageOptions.length === 0) {
    return null;
  }

  return (
    <div className={`${className} language-selector`} id="language-selector">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle
          id="lang-selector-dropdown"
          iconBefore={Language}
          variant="outline-primary"
          size="sm"
        >
          <span className="lang-label-medium">{currentLangCode}</span>
          <span className="lang-label-large">{currentlangDisplayName}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {languageOptions.map((locale) => (
            <Dropdown.Item key={`lang-selector-${locale}`} eventKey={locale}>
              {getDisplayName(locale)}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

LanguageSelector.propTypes = {
  className: PropTypes.string,
};

LanguageSelector.defaultProps = {
  className: '',
};

export default injectIntl(LanguageSelector);
