import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { getConfig } from "@edx/frontend-platform";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";
import { Dropdown } from "@edx/paragon";
import NavDropdown from "react-bootstrap/NavDropdown";

import messages from "./messages";

function AuthenticatedUserDropdown({ intl, username }) {
  const dashboardMenuItem = (
    <NavDropdown.Item href={`${getConfig().LMS_BASE_URL}/dashboard`}>
      {intl.formatMessage(messages.dashboard)}
    </NavDropdown.Item>
  );

  const title = (
    <>
      <FontAwesomeIcon icon={faUserCircle} className="d-md-none" size="lg" />
      <span data-hj-suppress className="d-none d-md-inline">
        {username}
      </span>
    </>
  );

  return (
    <>
      <li className="nav-item mr-3">
        <a className="nav-link" href={`${getConfig().SUPPORT_URL}`}>
          {intl.formatMessage(messages.help)}
        </a>
      </li>

      <li className="nav-item dropdown">
        <NavDropdown title={title} className="user-dropdown">
          {dashboardMenuItem}
          <NavDropdown.Item href={`${getConfig().LMS_BASE_URL}/u/${username}`}>
            {intl.formatMessage(messages.profile)}
          </NavDropdown.Item>
          <NavDropdown.Item
            href={`${getConfig().LMS_BASE_URL}/account/settings`}
          >
            {intl.formatMessage(messages.account)}
          </NavDropdown.Item>
          {getConfig().ORDER_HISTORY_URL && (
            <NavDropdown.Item href={getConfig().ORDER_HISTORY_URL}>
              {intl.formatMessage(messages.orderHistory)}
            </NavDropdown.Item>
          )}
          <NavDropdown.Item href={getConfig().LOGOUT_URL}>
            {intl.formatMessage(messages.signOut)}
          </NavDropdown.Item>
        </NavDropdown>
      </li>
    </>
  );
}

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
};

export default injectIntl(AuthenticatedUserDropdown);
