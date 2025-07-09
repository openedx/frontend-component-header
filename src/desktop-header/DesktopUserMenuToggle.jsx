import React from 'react';
import PropTypes from 'prop-types';
import { CaretIcon } from '../Icons';
import Avatar from '../Avatar';

const DesktopUserMenuToggle = ({ avatar, username }) => (
  <>
    <Avatar size="1.5em" src={avatar} alt="" className="mr-2" />
    {username} <CaretIcon role="img" aria-hidden focusable="false" />
  </>
);

export const DesktopUserMenuTogglePropTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
};

DesktopUserMenuToggle.propTypes = DesktopUserMenuTogglePropTypes;

export default DesktopUserMenuToggle;
