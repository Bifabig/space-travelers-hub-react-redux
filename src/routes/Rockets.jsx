import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { cancelReserveRocket, reserveRocket, getRockets } from '../components/redux/rockets/rocketsSlice';
import styles from '../styles/Rockets.module.css';

const Rockets = () => {
  const dispatch = useDispatch();
  const { rockets, isLoading, error } = useSelector((state) => state.rockets);
  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(getRockets());
    }
  }, [dispatch, rockets.length]);

  const handleReserveRocket = (id) => {
    dispatch(reserveRocket(id));
  };
  const handleCancelReserveRocket = (id) => {
    dispatch(cancelReserveRocket(id));
  };
  if (error) return <h2>Something went wrong</h2>;

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <hr />
      <div className={styles.rocketsWrapper}>
        {rockets.map((rocket) => (
          <div key={rocket.rocket_id} className={styles.rocket}>
            <img className={styles.image} src={rocket.flickr_images[0]} alt="" />
            <div className={styles.rocketInfo}>
              <h2>{rocket.rocket_name}</h2>
              <p className={styles.rocketDescription}>
                {rocket.reserved ? (
                  <span className={styles.reserved}>
                    <Badge bg="success">Reserved</Badge>
                  </span>
                ) : null}

                {rocket.description}
              </p>
              {rocket.reserved ? (
                <Button
                  variant="outline-secondary"
                  onClick={() => handleCancelReserveRocket(rocket.rocket_id)}
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
