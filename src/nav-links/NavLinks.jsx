import React, { useEffect, useState } from "react";
import { getConfig } from "@edx/frontend-platform";
import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";

import './navlinks.scss';

const Navlinks = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab] = useState("catalog");
  
  useEffect(() => {
    const url = `${getConfig().LMS_BASE_URL}/wikimedia_general/api/v0/lms_tabs`;

    getAuthenticatedHttpClient().get(url).then(({ data }) => {
        setTabs(data.tabs);
      });

  }, []);

  return (
    <div class="nav-links">
      <div class="main">
        {tabs.map((tab) => (
          <div class="mobile-nav-item hidden-mobile nav-item nav-tab">
            <a
              class={`${activeTab === tab.id ? "active " : ""}tab-nav-link`}
              href={getConfig().LMS_BASE_URL+tab.url}
              aria-current={activeTab === tab.id ? "page" : "false"}
            >
              {tab.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navlinks;
