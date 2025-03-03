import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import Avatar from '../../Avatar';
import { CaretIcon } from '../../Icons';

const DesktopUsername = ({ username, avatar }) => (
  <>
    <Avatar size="1.5em" src={avatar} alt="" className="mr-2" />
    {username} <CaretIcon role="img" aria-hidden focusable="false" />
  </>
);

const DesktopUsernameSlot = ({ username, avatar }) => (
  <PluginSlot
    id="desktop_username_slot"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <DesktopUsername username={username} avatar={avatar} />
  </PluginSlot>
);

DesktopUsername.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
};

DesktopUsername.defaultProps = {
  avatar: null,
};

DesktopUsernameSlot.propTypes = DesktopUsername.propTypes;
DesktopUsernameSlot.defaultProps = DesktopUsername.defaultProps;

export default DesktopUsernameSlot;
