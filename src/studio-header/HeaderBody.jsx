import React from 'react';
import PropTypes from 'prop-types';
import {
  ActionRow,
  Button,
  Container,
  Nav,
  Row,
} from '@edx/paragon';
import { Close, MenuIcon } from '@edx/paragon/icons';

import CourseLockUp from './CourseLockUp';
import UserMenu from './UserMenu';
import BrandNav from './BrandNav';
import NavDropdownMenu from './NavDropdownMenu';

const HeaderBody = ({
  logo,
  logoAltText,
  number,
  org,
  title,
  username,
  isAdmin,
  studioBaseUrl,
  logoutUrl,
  authenticatedUserAvatar,
  isMobile,
  setModalPopupTarget,
  toggleModalPopup,
  isModalPopupOpen,
  isHiddenMainMenu,
  mainMenuDropdowns,
  outlineLink,
}) => {
  const renderBrandNav = (
    <BrandNav
      {...{
        studioBaseUrl,
        logo,
        logoAltText,
      }}
    />
  );

  return (
    <Container size="xl" className="px-4">
      <ActionRow as="header">
        {isHiddenMainMenu ? (
          <Row className="flex-nowrap ml-4">
            {renderBrandNav}
          </Row>
        ) : (
          <>
            {isMobile ? (
              <Button
                ref={setModalPopupTarget}
                className="d-inline-flex align-items-center"
                variant="tertiary"
                onClick={toggleModalPopup}
                iconBefore={isModalPopupOpen ? Close : MenuIcon}
                data-testid="mobile-menu-button"
              >
                Menu
              </Button>
            ) : (
              <Row className="flex-nowrap m-0">
                {renderBrandNav}
                <CourseLockUp
                  {...{
                    outlineLink,
                    number,
                    org,
                    title,
                  }}
                />
              </Row>
            )}
            {isMobile ? (
              <>
                <ActionRow.Spacer />
                {renderBrandNav}
              </>
            ) : (
              <Nav data-testid="desktop-menu" className="ml-4">
                {mainMenuDropdowns.map(dropdown => {
                  const { id, buttonTitle, items } = dropdown;
                  return (
                    <NavDropdownMenu {...{ id, buttonTitle, items }} />
                  );
                })}
              </Nav>
            )}
          </>
        )}
        <ActionRow.Spacer />
        <Nav>
          <UserMenu
            {...{
              username,
              studioBaseUrl,
              logoutUrl,
              authenticatedUserAvatar,
              isAdmin,
            }}
          />
        </Nav>
      </ActionRow>
    </Container>
  );
};

HeaderBody.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired,
  logoutUrl: PropTypes.string.isRequired,
  setModalPopupTarget: PropTypes.func.isRequired,
  toggleModalPopup: PropTypes.func.isRequired,
  isModalPopupOpen: PropTypes.bool.isRequired,
  number: PropTypes.string,
  org: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  authenticatedUserAvatar: PropTypes.string,
  username: PropTypes.string,
  isAdmin: PropTypes.bool,
  isMobile: PropTypes.bool,
  isHiddenMainMenu: PropTypes.bool,
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    })),
  })),
  outlineLink: PropTypes.string,
};

HeaderBody.defaultProps = {
  logo: null,
  logoAltText: null,
  number: '',
  org: '',
  title: '',
  authenticatedUserAvatar: null,
  username: null,
  isAdmin: false,
  isMobile: false,
  isHiddenMainMenu: false,
  mainMenuDropdowns: [],
  outlineLink: null,
};

export default HeaderBody;
