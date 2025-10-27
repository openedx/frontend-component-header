import React, { type ReactNode, type ComponentProps } from 'react';
import classNames from 'classnames';
import {
  ActionRow,
  Button,
  Container,
  Nav,
  Row,
} from '@openedx/paragon';
import { Close, MenuIcon } from '@openedx/paragon/icons';

import CourseLockUp from './CourseLockUp';
import UserMenu from './UserMenu';
import BrandNav from './BrandNav';
import NavDropdownMenu from './NavDropdownMenu';
import StudioHeaderSearchButtonSlot from '../plugin-slots/StudioHeaderSearchButtonSlot';

export interface HeaderBodyProps {
  studioBaseUrl: string;
  logoutUrl: string;
  setModalPopupTarget?: ((instance: HTMLButtonElement | null) => void) | null;
  toggleModalPopup?: React.MouseEventHandler<HTMLButtonElement>;
  isModalPopupOpen?: boolean;
  number?: string;
  org?: string;
  title: string;
  logo: string;
  logoAltText: string;
  authenticatedUserAvatar?: string;
  username?: string;
  isAdmin?: boolean;
  isMobile?: boolean;
  isHiddenMainMenu?: boolean;
  mainMenuDropdowns?: {
    id: string;
    buttonTitle: ReactNode;
    items: { title: ReactNode; href: string; }[];
  }[];
  outlineLink?: string;
  searchButtonAction?: React.MouseEventHandler<HTMLButtonElement>;
  containerProps?: Omit<ComponentProps<typeof Container>, 'children'>;
}

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
  setModalPopupTarget = null,
  toggleModalPopup,
  isModalPopupOpen = false,
  isHiddenMainMenu = false,
  mainMenuDropdowns = [],
  outlineLink,
  searchButtonAction,
  containerProps = {},
}: HeaderBodyProps) => {

  const renderBrandNav = (
    <BrandNav
      {...{
        studioBaseUrl,
        logo,
        logoAltText,
      }}
    />
  );

  const { className: containerClassName, ...restContainerProps } = containerProps;

  return (
    <Container
      size="xl"
      className={classNames('px-2.5', containerClassName)}
      {...restContainerProps}
    >
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
              <div className="w-25">
                <Row className="m-0 flex-nowrap">
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
              </div>
            )}
            {isMobile ? (
              <>
                <ActionRow.Spacer />
                {renderBrandNav}
              </>
            ) : (
              <Nav data-testid="desktop-menu" className="ml-2">
                {mainMenuDropdowns.map(dropdown => {
                  const { id, buttonTitle, items } = dropdown;
                  return (
                    <NavDropdownMenu
                      key={id}
                      {...{
                        id, buttonTitle, items,
                      }}
                    />
                  );
                })}
              </Nav>
            )}
          </>
        )}
        <ActionRow.Spacer />
        <StudioHeaderSearchButtonSlot
          searchButtonAction={searchButtonAction}
        />
        <Nav>
          <UserMenu
            {...{
              username,
              studioBaseUrl,
              logoutUrl,
              authenticatedUserAvatar,
              isAdmin,
              isMobile,
            }}
          />
        </Nav>
      </ActionRow>
    </Container>
  );
};

export default HeaderBody;
