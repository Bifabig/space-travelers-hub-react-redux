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
    useSelector.mockReturnValue({
      rockets: [],
      isLoading: true,
      error: null,
    });

    render(<Profile />);

    expect(screen.getByText('Rockets Loading')).toBeInTheDocument();
  });

  it('renders error message when missions or rockets have errors', () => {
    useSelector.mockReturnValue({
      missions: [],
      isLoading: false,
      error: 'error',
    });

    render(<Profile />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders missions list when missions are available', () => {
    const missions = [
      { mission_id: 1, mission_name: 'Mission 1', reserved: true },
      { mission_id: 2, mission_name: 'Mission 2', reserved: false },
    ];
    const rockets = [
      { rocket_id: 1, rocket_name: 'Rocket 1', reserved: true },
      { rocket_id: 2, rocket_name: 'Rocket 2', reserved: false },
    ];
    useSelector.mockReturnValueOnce({
      missions,
      isLoading: false,
      error: null,
    });

    useSelector.mockReturnValueOnce({
      rockets,
      isLoading: false,
      error: null,
    });

    render(<Profile />);
    missions.forEach((mission) => {
      if (mission.reserved) {
        expect(screen.getByText(mission.mission_name)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(mission.mission_name)).not.toBeInTheDocument();
      }
    });

    rockets.forEach((rocket) => {
      if (rocket.reserved) {
        expect(screen.getByText(rocket.rocket_id)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(rocket.rocket_id)).not.toBeInTheDocument();
      }
    });
  });
});
