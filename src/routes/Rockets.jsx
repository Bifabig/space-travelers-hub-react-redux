import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { reserveRocket, getRockets } from '../components/redux/rockets/rocketsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const { rockets, isLoading, error } = useSelector((state) => state.rockets);
  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(getRockets());
    }
  }, [dispatch, rockets.length]);


  if (error) return <h2>Something went wrong</h2>;

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <hr />
      <div className="rockets-wrapper">
        {rockets.map((rocket) => (
          <div key={rocket.rocket_id} className="rocket">
            <img src={rocket.flickr_images[0]} alt="" />
            <div className="rocket-info">
              <h2>{rocket.rocket_name}</h2>
              <p className="rocket-description">
                {rocket.reserved ? (
                  <span className="reserved">
                    <Badge bg="success">Reserved</Badge>
                  </span>
                ) : null}

                {rocket.description}
              </p>
              {rocket.reserved ? (
                <Button
                  variant="secondary"
                >
                  Cancel Reservation
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => handleReserveRocket(rocket.rocket_id)}
                >
                  Reserve Rocket
                </Button>
              )}

            </div>
          </div>
        ))}
      </div>

    </>
  );
};
export default Rockets;
