import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useToggle, ModalPopup } from '@openedx/paragon';
import HeaderBody from './HeaderBody';
import MobileMenu from './MobileMenu';

const MobileHeader = ({
  mainMenuDropdowns,
  ...props
}) => {
  const [isOpen, , close, toggle] = useToggle(false);
  const [target, setTarget] = useState(null);

  return (
    <>
      <HeaderBody
        {...props}
        isMobile
        setModalPopupTarget={setTarget}
        toggleModalPopup={toggle}
        isModalPopupOpen={isOpen}
      />
      <ModalPopup
        hasArrow
        placement="bottom"
        positionRef={target}
        isOpen={isOpen}
        onClose={close}
        onEscapeKey={close}
        className="mobile-menu-container"
      >
        <MobileMenu {...{ mainMenuDropdowns }} />
      </ModalPopup>
    </>
  );
};

MobileHeader.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  logoutUrl: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  number: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  org: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  title: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  logo: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  logoAltText: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  authenticatedUserAvatar: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  username: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  isAdmin: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.node,
    })),
  })),
  outlineLink: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

MobileHeader.defaultProps = {
  logo: null,
  logoAltText: null,
  number: null,
  org: null,
  title: null,
  authenticatedUserAvatar: null,
  username: null,
  isAdmin: false,
  mainMenuDropdowns: [],
  outlineLink: null,
};

export default MobileHeader;
