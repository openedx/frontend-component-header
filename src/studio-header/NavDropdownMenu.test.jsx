import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavDropdownMenu from './NavDropdownMenu';

const mockOnNavigate = jest.fn();

const defaultProps = {
  id: 'menu-id',
  buttonTitle: 'Menu',
  items: [
    { href: '/item1', title: 'Item 1' },
    { href: 'https://external.com', title: 'External Link' },
  ],
  onNavigate: mockOnNavigate,
};

describe('NavDropdownMenu Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the dropdown button with correct title', () => {
    render(<NavDropdownMenu {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: 'Menu' });
    expect(dropdownButton).toBeInTheDocument();
  });

  test('renders all dropdown items', () => {
    render(<NavDropdownMenu {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(dropdownButton);

    const item1 = screen.getByText('Item 1');
    const externalLink = screen.getByText('External Link');

    expect(item1).toBeInTheDocument();
    expect(externalLink).toBeInTheDocument();
  });

  test('calls onNavigate with the correct URL for internal link', () => {
    render(<NavDropdownMenu {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(dropdownButton);

    const item1 = screen.getByText('Item 1');
    fireEvent.click(item1);

    expect(mockOnNavigate).toHaveBeenCalledWith('/item1');
  });

  test('navigates to external URL when external link is clicked', () => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };

    render(<NavDropdownMenu {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(dropdownButton);

    const externalLink = screen.getByText('External Link');
    fireEvent.click(externalLink);

    expect(window.location.href).toBe('https://external.com');
  });
});
