// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store'; import thunk from 'redux-thunk';
import axios from 'axios';
import rocketsReducer, {
  getRockets,
  reserveRocket,
  cancelReserveRocket,
} from '../components/redux/rockets/rocketsSlice';

const mockStore = configureStore([thunk]);
jest.mock('axios');

describe('rocketsSlice', () => {
  describe('reducers', () => {
    it('should handle reserveRocket', () => {
      const initialState = {
        rockets: [
          { rocket_id: '1', reserved: false },
          { rocket_id: '2', reserved: false },
        ],
      };
      const nextState = rocketsReducer(initialState, reserveRocket('1'));
      expect(nextState.rockets[0].reserved).toBe(true);
      expect(nextState.rockets[1].reserved).toBe(false);
    });

    it('should handle cancelReserveRocket', () => {
      const initialState = {
        rockets: [
          { rocket_id: '1', reserved: true },
          { rocket_id: '2', reserved: true },
        ],
      };
      const nextState = rocketsReducer(initialState, cancelReserveRocket('1'));
      expect(nextState.rockets[0].reserved).toBe(false);
      expect(nextState.rockets[1].reserved).toBe(true);
    });
  });

  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    it('should create an action to get rockets', async () => {
      const mockPayload = [{ rocket_id: '1' }, { rocket_id: '2' }];
      axios.get.mockResolvedValueOnce({ data: mockPayload });

      await store.dispatch(getRockets());

      const actions = store.getActions();
      expect(actions[0].type).toBe(getRockets.pending.type);
      expect(actions[1].type).toBe(getRockets.rejected.type);
      await store.dispatch(getRockets.fulfilled(mockPayload));

      expect(actions[2].type).toBe(getRockets.fulfilled.type);
      expect(actions[2].payload).toEqual(mockPayload);
    });
  });
});
