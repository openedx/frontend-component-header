import React, { type FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  studioBaseUrl: string;
  logo: string;
  logoAltText: string;
}

const BrandNav: FunctionComponent<Props> = ({
  studioBaseUrl,
  logo,
  logoAltText,
}) => (
  <Link to={studioBaseUrl}>
    <img
      src={logo}
      alt={logoAltText}
      className="d-block logo"
    />
  </Link>
);

export default BrandNav;
