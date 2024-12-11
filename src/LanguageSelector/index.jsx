import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { publish } from '@edx/frontend-platform';
import {
  getLocale, injectIntl, intlShape, FormattedMessage, LOCALE_CHANGED, handleRtl,
} from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';
import { logError } from '@edx/frontend-platform/logging';

import { patchPreferences, postSetLang } from './data/api';

const onLanguageSelected = async (username, selectedLanguageCode) => {
  try {
    if (username) {
      await patchPreferences(username, { prefLang: selectedLanguageCode });
      await postSetLang(selectedLanguageCode);
    }
    publish(LOCALE_CHANGED, getLocale());
    handleRtl();
  } catch (error) {
    logError(error);
  }
};

const LanguageSelector = ({
  intl, options, authenticatedUser, compact, ...props
}) => {

  const languageLabel = (languageCode) => {
    const option = options.find( ({ value, label }) => value === languageCode )
    return option ? option.label : null
  }

  const handleChange = (languageCode, event) => {
    const previousSiteLanguage = getLocale();
    console.debug(previousSiteLanguage, languageCode, authenticatedUser);

    if (previousSiteLanguage !== languageCode) {
      onLanguageSelected(authenticatedUser?.username, languageCode);
    }

    event.target.parentElement.parentElement.querySelector(".languageLabel").innerHTML = languageLabel(languageCode);
  };

  const currentLangLabel = languageLabel(intl.locale)
  const showLabel = !Boolean(compact || false);

  return (
    <>
      <Dropdown className="language-selector">
        <Dropdown.Toggle variant="outline-primary">
          <FontAwesomeIcon icon={faGlobe} />
          {showLabel && (
            currentLangLabel ? (
              <span class="pl-1 languageLabel">
                {currentLangLabel}
              </span>
            ) : (
              <span class="pl-1">
                <FormattedMessage
                  id="footer.languageForm.select.label"
                  defaultMessage="Choose Language"
                  description="The label for the laguage select part of the language selection form."
                />
              </span>
            )
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {options.map(({ value, label }) => (
          <Dropdown.Item key={value} eventKey={value} onSelect={handleChange}>
            {label}
          </Dropdown.Item>
        ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

LanguageSelector.propTypes = {
  authenticatedUser: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  intl: intlShape.isRequired,
  compact: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

export default injectIntl(LanguageSelector);
