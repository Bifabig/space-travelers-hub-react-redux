import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Profile from '../routes/Profile';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Profile', () => {
  it('renders loading state when missions are loading', () => {
    useSelector.mockReturnValue({
      missions: [],
      isLoading: true,
      error: null,
    });

    render(<Profile />);

    expect(screen.getByText('Missions Loading')).toBeInTheDocument();
  });

  it('renders loading state when rockets are loading', () => {
    useSelector.mockReturnValueOnce({
      rockets: [],
      isLoading: true,
      error: null,
    });

    render(<Profile />);

    expect(screen.getByText('Rockets Loading')).toBeInTheDocument();
  });
});
