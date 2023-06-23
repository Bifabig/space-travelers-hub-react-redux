import { configureStore } from '@reduxjs/toolkit';
import missionsSlice from './missions/missionsSlice';
import rocketsSlice from './rockets/rocketsSlice';

const store = configureStore({
  reducer: {
    missions: missionsSlice,
    rockets: rocketsSlice,
  },
});

export default store;
