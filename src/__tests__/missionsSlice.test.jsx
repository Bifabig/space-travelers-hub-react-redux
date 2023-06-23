import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import missionsReducer, {
  getMissionItems,
  joinMission,
  leaveMission,
} from '../redux/missions/missionsSlice';

const mockStore = configureStore([thunk]);
jest.mock('axios');

describe('missionsSlice', () => {
  describe('reducers', () => {
    it('should handle join mission', () => {
      const initialState = {
        missions: [
          { mission_id: '1', reserved: false },
          { mission_id: '2', reserved: false },
        ],
      };
      const nextState = missionsReducer(initialState, joinMission('1'));
      expect(nextState.missions[0].reserved).toBe(true);
      expect(nextState.missions[1].reserved).toBe(false);
    });

    it('should handle leave mission', () => {
      const initialState = {
        missions: [
          { mission_id: '1', reserved: true },
          { mission_id: '2', reserved: true },
        ],
      };
      const nextState = missionsReducer(initialState, leaveMission('1'));
      expect(nextState.missions[0].reserved).toBe(false);
      expect(nextState.missions[1].reserved).toBe(true);
    });
  });

  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    it('should create an action to get missions', async () => {
      const mockPayload = [{ mission_id: '1' }, { mission_id: '2' }];
      axios.get.mockResolvedValueOnce({ data: mockPayload });

      await store.dispatch(getMissionItems());

      const actions = store.getActions();
      expect(actions[0].type).toBe(getMissionItems.pending.type);
      expect(actions[1].type).toBe(getMissionItems.rejected.type);
      await store.dispatch(getMissionItems.fulfilled(mockPayload));

      expect(actions[2].type).toBe(getMissionItems.fulfilled.type);
      expect(actions[2].payload).toEqual(mockPayload);
    });
  });
});
