import React, { type FunctionComponent, useState } from 'react';
import { useToggle, ModalPopup } from '@openedx/paragon';
import HeaderBody, { type HeaderBodyProps } from './HeaderBody';
import MobileMenu from './MobileMenu';

type Props = Pick<HeaderBodyProps,
| 'studioBaseUrl'
| 'logoutUrl'
| 'number'
| 'org'
| 'title'
| 'logo'
| 'logoAltText'
| 'authenticatedUserAvatar'
| 'username'
| 'isAdmin'
| 'mainMenuDropdowns'
| 'outlineLink'
>;

const MobileHeader: FunctionComponent<Props> = ({
  mainMenuDropdowns,
  ...props
}) => {
  const [isOpen, , close, toggle] = useToggle(false);
  const [target, setTarget] = useState<HTMLButtonElement | null>(null);

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

export default MobileHeader;
