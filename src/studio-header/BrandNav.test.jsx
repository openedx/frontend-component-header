import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BrandNav from './BrandNav';

describe('BrandNav Component', () => {
  const mockOnNavigate = jest.fn();
  const studioBaseUrl = 'https://example.com';
  const logo = 'logo.png';
  const logoAltText = 'Example Logo';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo with the correct alt text', () => {
    render(
      <BrandNav
        studioBaseUrl={studioBaseUrl}
        logo={logo}
        logoAltText={logoAltText}
        onNavigate={mockOnNavigate}
      />,
    );

    const img = screen.getByAltText(logoAltText);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', logo);
  });

  it('navigates to an absolute URL by changing window location', () => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };

    render(
      <BrandNav
        studioBaseUrl={studioBaseUrl}
        logo={logo}
        logoAltText={logoAltText}
        onNavigate={mockOnNavigate}
      />,
    );

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(window.location.href).toBe(studioBaseUrl);
  });

  it('calls onNavigate for relative URLs', () => {
    const relativeUrl = '/studio/dashboard';

    render(
      <BrandNav
        studioBaseUrl={relativeUrl}
        logo={logo}
        logoAltText={logoAltText}
        onNavigate={mockOnNavigate}
      />,
    );

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(mockOnNavigate).toHaveBeenCalledWith(relativeUrl);
  });
});
