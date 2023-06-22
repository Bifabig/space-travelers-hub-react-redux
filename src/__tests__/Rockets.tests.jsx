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
});
