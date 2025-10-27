import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { Nav, IconButton, Icon } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from '../../studio-header/messages';

const StudioHeaderSearchButtonSlot = ({ searchButtonAction }) => {
  const intl = useIntl();
  return (
    <PluginSlot
      id="org.openedx.frontend.layout.studio_header_search_button_slot.v1"
    >
      {searchButtonAction && (
        <Nav>
          <IconButton
            src={Search}
            iconAs={Icon}
            onClick={searchButtonAction}
            aria-label={intl.formatMessage(messages['header.label.search.nav'])}
            alt={intl.formatMessage(messages['header.label.search.nav'])}
          />
        </Nav>
      )}
    </PluginSlot>
  );
};

StudioHeaderSearchButtonSlot.propTypes = {
  searchButtonAction: PropTypes.func,
};

export default StudioHeaderSearchButtonSlot;
