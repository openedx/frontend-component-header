import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

import BrandNav from './BrandNav';

const studioBaseUrl = 'https://example.com/';
const logo = 'logo.png';
const logoAltText = 'Example Logo';

const RootWrapper = () => (
  <MemoryRouter>
    <BrandNav
      studioBaseUrl={studioBaseUrl}
      logo={logo}
      logoAltText={logoAltText}
    />
  </MemoryRouter>
);

describe('BrandNav Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo with the correct alt text', () => {
    render(<RootWrapper />);

    const img = screen.getByAltText(logoAltText);
    expect(img).toHaveAttribute('src', logo);
  });

  it('displays a link that navigates to studioBaseUrl', () => {
    render(<RootWrapper />);

    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link.href).toBe(studioBaseUrl);
  });
});
