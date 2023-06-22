import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Rockets from '../routes/Rockets';
import { getRockets, reserveRocket, cancelReserveRocket } from '../components/redux/rockets/rocketsSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../components/redux/rockets/rocketsSlice', () => ({
  getRockets: jest.fn(),
  reserveRocket: jest.fn(),
  cancelReserveRocket: jest.fn(),
}));

describe('Rockets', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      rockets: [],
      isLoading: false,
      error: null,
    });
  });

  it('should render loading message when isLoading is true', () => {
    useSelector.mockReturnValue({
      rockets: [],
      isLoading: true,
      error: null,
    });

    render(<Rockets />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error message when error exists', () => {
    useSelector.mockReturnValue({
      rockets: [],
      isLoading: false,
      error: 'Something went wrong',
    });

    render(<Rockets />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    const { container } = render(<Rockets />);
    expect(container).toMatchSnapshot();
  });

  it('should render the rockets', () => {
    useSelector.mockReturnValue({
      rockets: [
        {
          rocket_id: '1',
          rocket_name: 'Falcon 9',
          flickr_images: ['image_url'],
          reserved: false,
          description: 'Rocket description',
        },
      ],
      isLoading: false,
      error: null,
    });

    const { container } = render(<Rockets />);

    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByText('Rocket description')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
