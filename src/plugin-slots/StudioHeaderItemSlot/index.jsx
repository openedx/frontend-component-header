import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { Nav, IconButton, Icon } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';

const StudioHeaderItemSlot = ({ searchButtonAction, ariaLabel, alt }) => (
  <PluginSlot
    id="org.openedx.frontend.layout.studio_header_item_slot.v1"
  >
    {searchButtonAction && (
      <Nav>
        <IconButton
          src={Search}
          iconAs={Icon}
          onClick={searchButtonAction}
          aria-label={ariaLabel}
          alt={alt}
        />
      </Nav>
    )}
  </PluginSlot>
);

StudioHeaderItemSlot.PropTypes = {
  searchButtonAction: PropTypes.func,
  ariaLabel: PropTypes.string,
  alt: PropTypes.string
}

export default StudioHeaderItemSlot;
