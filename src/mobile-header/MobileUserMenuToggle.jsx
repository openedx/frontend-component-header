import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';

const MobileUserMenuToggle = ({ avatar, username }) => <Avatar size="1.5rem" src={avatar} alt={username} />;

export const MobileUserMenuTogglePropTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
};

MobileUserMenuToggle.propTypes = MobileUserMenuTogglePropTypes;

export default MobileUserMenuToggle;
