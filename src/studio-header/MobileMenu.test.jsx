import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('MobileMenu Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the mobile menu with dropdowns and items', () => {
    render(<MobileMenu {...defaultProps} />);

    const menu1Title = screen.getByText('Menu 1');
    const menu2Title = screen.getByText('Menu 2');
    expect(menu1Title).toBeInTheDocument();
    expect(menu2Title).toBeInTheDocument();
  });

  test('navigates to internal URL when item is clicked', () => {
    render(<MobileMenu {...defaultProps} />);

    const menu1Title = screen.getByText('Menu 1');
    fireEvent.click(menu1Title);

    const menuItem = screen.getByText('Item 1');
    fireEvent.click(menuItem);

    expect(mockOnNavigate).toHaveBeenCalledWith('/menu1/item1');
  });

  test('navigates to an external URL when external link is clicked', () => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };

    render(<MobileMenu {...defaultProps} />);

    const menu2Title = screen.getByText('Menu 2');
    fireEvent.click(menu2Title);

    const externalLink = screen.getByText('External Link');
    fireEvent.click(externalLink);

    expect(window.location.href).toBe('https://external-link.com');
  });

  test('renders empty state when there are no dropdowns', () => {
    render(<MobileMenu mainMenuDropdowns={[]} onNavigate={mockOnNavigate} />);

    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();

    const menuItems = screen.queryAllByRole('listitem');
    expect(menuItems.length).toBe(0);
  });
});
