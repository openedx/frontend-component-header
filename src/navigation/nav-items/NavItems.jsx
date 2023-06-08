import React, { Fragment } from "react";
import { getConfig } from "@edx/frontend-platform";

const NavItems = ({ tabs, activeTab }) => {
  return (
    <Fragment>
      {tabs.map((tab) => (
        <div key={tab.id} className="mobile-nav-item hidden-mobile nav-item nav-tab mobile-nav-link">
          <a
            className={`${activeTab === tab.id ? "active " : ""}tab-nav-link`}
            href={getConfig().LMS_BASE_URL + tab.url}
            aria-current={activeTab === tab.id ? "page" : "false"}
          >
            {tab.name}
          </a>
        </div>
      ))}
    </Fragment>
  );
};

export default NavItems;
