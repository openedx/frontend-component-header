import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';
import MobileMenu from './MobileMenu';

const mockOnNavigate = jest.fn();

const defaultProps = {
  mainMenuDropdowns: [
    {
      id: 'menu1',
      buttonTitle: 'Menu 1',
      items: [
        { href: '/menu1/item1', title: 'Item 1' },
        { href: '/menu1/item2', title: 'Item 2' },
      ],
    },
    {
      id: 'menu2',
      buttonTitle: 'Menu 2',
      items: [
        { href: 'https://external-link.com', title: 'External Link' },
      ],
    },
  ],
  onNavigate: mockOnNavigate,
};

const RootWrapper = (props) => (
  <MemoryRouter>
    <MobileMenu {...props} />
  </MemoryRouter>
);

describe('MobileMenu Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the mobile menu with dropdowns and items', () => {
    render(<RootWrapper {...defaultProps} />);

    const menu1Title = screen.getByText('Menu 1');
    const menu2Title = screen.getByText('Menu 2');

    expect(menu1Title).toBeInTheDocument();
    expect(menu2Title).toBeInTheDocument();
  });

  test('navigates to internal URL when item is clicked', () => {
    render(<RootWrapper {...defaultProps} />);

    const menu1Title = screen.getByText(defaultProps.mainMenuDropdowns[0].buttonTitle);
    fireEvent.click(menu1Title);

    const menuItem = screen.getByText(defaultProps.mainMenuDropdowns[0].items[0].title);
    expect(menuItem.getAttribute('href')).toBe(defaultProps.mainMenuDropdowns[0].items[0].href);
  });

  test('navigates to an external URL when external link is clicked', () => {
    render(<RootWrapper {...defaultProps} />);

    const menu2Title = screen.getByText(defaultProps.mainMenuDropdowns[1].buttonTitle);
    fireEvent.click(menu2Title);

    const externalLink = screen.getByText(defaultProps.mainMenuDropdowns[1].items[0].title);
    expect(externalLink.getAttribute('href')).toBe(defaultProps.mainMenuDropdowns[1].items[0].href);
  });

  test('renders empty state when there are no dropdowns', () => {
    render(<RootWrapper mainMenuDropdowns={[]} onNavigate={mockOnNavigate} />);

    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();

    const menuItems = screen.queryAllByRole('listitem');
    expect(menuItems.length).toBe(0);
  });
});
