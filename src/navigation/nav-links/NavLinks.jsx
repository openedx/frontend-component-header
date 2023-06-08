import React from "react";
import PropTypes from "prop-types";
import NavItems from "../nav-items/NavItems";

const Navlinks = ({ tabs, activeTab }) => {
  return (
    <div className="nav-links">
      <div className="main">
        <NavItems tabs={tabs} activeTab={activeTab} />
      </div>
    </div>
  );
};

Navlinks.propTypes = {
  tabs: PropTypes.array,
  activeTab: PropTypes.string,
};

Navlinks.defaultProps = {
  tabs: [],
  activeTab: "",
};

export default Navlinks;
