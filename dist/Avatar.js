import React from 'react';
import PropTypes from 'prop-types';
import { AvatarIcon } from './Icons';
var Avatar = function Avatar(_ref) {
  var size = _ref.size,
    src = _ref.src,
    alt = _ref.alt,
    className = _ref.className;
  var avatar = src ? /*#__PURE__*/React.createElement("img", {
    className: "d-block w-100 h-100",
    src: src,
    alt: alt
  }) : /*#__PURE__*/React.createElement(AvatarIcon, {
    style: {
      width: size,
      height: size
    },
    role: "img",
    "aria-hidden": true,
    focusable: "false"
  });
  return /*#__PURE__*/React.createElement("span", {
    style: {
      height: size,
      width: size
    },
    className: "avatar overflow-hidden d-inline-flex rounded-circle ".concat(className)
  }, avatar);
};
Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string
};
Avatar.defaultProps = {
  src: null,
  size: '2rem',
  alt: null,
  className: null
};
export default Avatar;
//# sourceMappingURL=Avatar.js.map