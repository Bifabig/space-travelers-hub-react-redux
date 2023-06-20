import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/missions';
const initialState = {
  missions: [],
  isLoading: false,
  error: undefined,
};

export const getMissionItems = createAsyncThunk(
  'missions/getMissionItems',
  async (thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const missonsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMissionItems.pending, (state) => {
        const pendingState = state;
        pendingState.isLoading = false;
      })
      .addCase(getMissionItems.fulfilled, (state, action) => {
        const fulfilledState = state;
        fulfilledState.isLoading = false;
        fulfilledState.missions = [...state.missions, action.payload];
      })
      .addCase(getMissionItems.rejected, (state, action) => {
        const rejectedState = state;
        rejectedState.isLoading = false;
        rejectedState.error = action.payload;
      });
  },
});
export default missonsSlice.reducer;
