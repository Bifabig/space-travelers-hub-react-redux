import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getRocketsURL = 'https://api.spacexdata.com/v3/rockets';

const initialState = {
  rockets: [],
  isLoading: false,
  error: undefined,
};

export const getRockets = createAsyncThunk('rockets/getRockets', async (thunkAPI) => {
  try {
    const response = await axios(getRocketsURL);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const rocketId = action.payload;
      const newState = state;
      newState.rockets = state.rockets.map((rocket) => (
        rocket.rocket_id !== rocketId ? rocket : { ...rocket, reserved: true }
      ));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRockets.pending, (state) => {
        const pendingState = state;
        pendingState.isLoading = true;
      })
      .addCase(getRockets.fulfilled, (state, action) => {
        const fulfilledState = state;
        fulfilledState.isLoading = false;
        fulfilledState.rockets = action.payload;
        console.log(fulfilledState.rockets);
      })
      .addCase(getRockets.rejected, (state) => {
        const rejectedState = state;
        rejectedState.isLoading = false;
      });
  },
});

export const { reserveRocket, remove } = rocketsSlice.actions;
export default rocketsSlice.reducer;
