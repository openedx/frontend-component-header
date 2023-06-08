import React, { useState } from "react";
import PropTypes from "prop-types";
import NavItems from "../nav-items/NavItems";

const HamburgerMenu = ({ tabs, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="hamburger-menu">
      <div className={`hamburger-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen((prev) => !prev)}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <NavItems tabs={tabs} activeTab={activeTab} />
      </div>
    </div>
  );
};

HamburgerMenu.propTypes = {
  tabs: PropTypes.array,
  activeTab: PropTypes.string,
};

HamburgerMenu.defaultProps = {
  tabs: [],
  activeTab: "",
};

export default HamburgerMenu;
