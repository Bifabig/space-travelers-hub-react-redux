import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRockets } from '../components/redux/rockets/rocketsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const { rockets, isLoading, error } = useSelector((state) => state.rockets);
  console.log(rockets);
  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(getRockets());
    }
  }, [dispatch, rockets.length]);

  if (error) return <h2>Something went wrong</h2>;

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="rockets-form-wrapper">
      <div className="rockets-wrapper">
        Rockets
      </div>
    </div>
  );
};
export default Rockets;
