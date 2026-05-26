import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock the items API module
vi.mock('../api/items', () => ({
  getItems: vi.fn().mockResolvedValue([]),
  createItem: vi.fn(),
  deleteItem: vi.fn(),
}));

describe('App', () => {
  it('renders the home page heading', () => {
    render(<App />);
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('renders the add item form', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Add new item...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });
});
