import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import NavDropdownMenu from './NavDropdownMenu';

const defaultProps = {
  id: 'menu-id',
  buttonTitle: 'Menu',
  items: [
    { href: '/item1', title: 'Item 1' },
    { href: 'https://external.com', title: 'External Link' },
  ],
};

const RootWrapper = (props) => (
  <MemoryRouter>
    <NavDropdownMenu {...props} />
  </MemoryRouter>
);

describe('NavDropdownMenu Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the dropdown button with correct title', () => {
    render(<NavDropdownMenu {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: defaultProps.buttonTitle });
    expect(dropdownButton).toBeInTheDocument();
  });

  test('renders all dropdown items', () => {
    render(<RootWrapper {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: defaultProps.buttonTitle });
    fireEvent.click(dropdownButton);

    const item1 = screen.getByText(defaultProps.items[0].title);
    const externalLink = screen.getByText(defaultProps.items[1].title);

    expect(item1).toBeInTheDocument();
    expect(externalLink).toBeInTheDocument();
  });

  test('calls onNavigate with the correct URL for internal link', () => {
    render(<RootWrapper {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: defaultProps.buttonTitle });
    fireEvent.click(dropdownButton);

    const item1 = screen.getByText(defaultProps.items[0].title);
    expect(item1.getAttribute('href')).toBe(defaultProps.items[0].href);
  });

  test('navigates to external URL when external link is clicked', () => {
    render(<RootWrapper {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: defaultProps.buttonTitle });
    fireEvent.click(dropdownButton);

    const externalLink = screen.getByText(defaultProps.items[1].title);
    expect(externalLink.getAttribute('href')).toBe(defaultProps.items[1].href);
  });

  describe('link target and rel', () => {
    const items = [
      { href: '/same-tab', title: 'Same tab' },
      { href: '/new-tab', title: 'New tab', target: '_blank' as const },
      {
        href: '/custom-rel', title: 'Custom rel', target: '_blank' as const, rel: 'noopener',
      },
      { href: '/named-target', title: 'Named target', target: 'studio-help' },
    ];

    const openMenu = async () => {
      const user = userEvent.setup();
      render(<RootWrapper {...defaultProps} items={items} />);
      await user.click(screen.getByRole('button', { name: defaultProps.buttonTitle }));
    };

    test('leaves target and rel unset when the item has no target', async () => {
      await openMenu();
      const link = screen.getByText('Same tab');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });

    test('adds a safe rel default when target is _blank', async () => {
      await openMenu();
      const link = screen.getByText('New tab');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('uses the item rel when one is provided', async () => {
      await openMenu();
      expect(screen.getByText('Custom rel')).toHaveAttribute('rel', 'noopener');
    });

    test('passes through any other target value without a rel', async () => {
      await openMenu();
      const link = screen.getByText('Named target');
      expect(link).toHaveAttribute('target', 'studio-help');
      expect(link).not.toHaveAttribute('rel');
    });
  });
});
