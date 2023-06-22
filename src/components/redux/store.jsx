import { configureStore } from '@reduxjs/toolkit';
import missonsSlice from './missons/missonsSlice';
import rocketsSlice from './rockets/rocketsSlice';

const store = configureStore({
  reducer: {
    missions: missonsSlice,
    rockets: rocketsSlice,
  },
});

export default store;
