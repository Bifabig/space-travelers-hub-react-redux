import { configureStore } from '@reduxjs/toolkit';
import missonsSlice from './missons/missonsSlice';

const store = configureStore({
  reducer: {
    missions: missonsSlice,
  },
});

export default store;
