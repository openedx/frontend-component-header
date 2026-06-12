import React from 'react';
import PropTypes from 'prop-types';

import { AvatarIcon } from './Icons';
import { getAvatarColor, getInitial } from './avatarUtils';

const Avatar = ({
  size,
  src,
  alt,
  className,
  username,
}) => {
  let avatar;
  if (src) {
    avatar = <img className="d-block w-100 h-100" src={src} alt={alt} />;
  } else if (username) {
    avatar = (
      <span
        className="d-flex w-100 h-100 align-items-center justify-content-center font-weight-bold"
        style={{
          backgroundColor: getAvatarColor(username),
          color: '#FFFFFF',
          fontSize: `calc(${size} * 0.55)`,
        }}
        role="img"
        aria-hidden
      >
        {getInitial(username)}
      </span>
    );
  } else {
    avatar = <AvatarIcon style={{ width: size, height: size }} role="img" aria-hidden focusable="false" />;
  }

  return (
    <span
      style={{ height: size, width: size }}
      className={`avatar overflow-hidden d-inline-flex rounded-circle ${className}`}
    >
      {avatar}
    </span>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  username: PropTypes.string,
};

Avatar.defaultProps = {
  src: null,
  size: '2rem',
  alt: null,
  className: null,
  username: null,
};

export default Avatar;
