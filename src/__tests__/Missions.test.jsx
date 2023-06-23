import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Missions from '../routes/Missions';
import {
  getMissionItems,
  joinMission,
  leaveMission,
} from '../components/redux/missions/missionsSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../components/redux/missions/missionsSlice', () => ({
  getMissionItems: jest.fn(),
  joinMission: jest.fn(),
  leaveMission: jest.fn(),
}));

describe('Missions', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      missions: [],
      isLoading: false,
      error: null,
    });
  });

  it('should render loading message when isLoading is true', () => {
    useSelector.mockReturnValue({
      missions: [],
      isLoading: true,
      error: null,
    });

    render(<Missions />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error message when error exists', () => {
    useSelector.mockReturnValue({
      missions: [],
      isLoading: false,
      error: 'Something went wrong',
    });

    render(<Missions />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    const { container } = render(<Missions />);
    expect(container).toMatchSnapshot();
  });

  it('should dispatch getMissionItems when rockets array is empty', () => {
    useSelector.mockReturnValue({
      missions: [],
      isLoading: false,
      error: null,
    });

    const { container } = render(<Missions />);

    expect(getMissionItems).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  it('should render the missions', () => {
    useSelector.mockReturnValue({
      missions: [
        {
          mission_id: '1',
          mission_name: 'Thaicom',
          description: 'Mission description',
          reserved: false,
        },
      ],
      isLoading: false,
      error: null,
    });

    const { container } = render(<Missions />);

    expect(screen.getByText('Thaicom')).toBeInTheDocument();
    expect(screen.getByText('Mission description')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should dispatch joinMission when clicking on "Join Mission" button', () => {
    const missionId = '1';
    useSelector.mockReturnValue({
      missions: [
        {
          mission_id: missionId,
          mission_name: 'Thaicom',
          description: 'Mission description',
          reserved: false,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<Missions />);

    const reserveButton = screen.getByText('Join Mission');
    fireEvent.click(reserveButton);

    expect(joinMission).toHaveBeenCalledWith(missionId);
  });

  it('should dispatch leaveMission when clicking on "Leave Mission" button', () => {
    const missionId = '1';
    useSelector.mockReturnValue({
      missions: [
        {
          mission_id: missionId,
          mission_name: 'Thaicom',
          description: 'Mission description',
          reserved: true,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<Missions />);

    const cancelButton = screen.getByText('Leave Mission');
    fireEvent.click(cancelButton);

    expect(leaveMission).toHaveBeenCalledWith(missionId);
  });
});
