import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const {
    missions,
    isLoading: missionsLoading,
    error: missionsError,
  } = useSelector((state) => state.missions);

  const {
    rockets,
    isLoading: rocketsLoading,
    error: rocketsError,
  } = useSelector((state) => state.rockets);

  if (missionsError || rocketsError) return <h2>Something went wrong</h2>;

  return (
    <div className={styles.wrapper}>
      <hr />
      <div className={styles.profile}>
        <div className={styles.missions}>
          <h2>My Missions</h2>
          {missionsLoading ? (<div>Loading</div>) : (
            <ListGroup>
              {missions.map((mission) => (mission.reserved ? (
                <ListGroup.Item key={mission.mission_id} className={styles.listItem}>
                  {mission.mission_name}
                </ListGroup.Item>
              ) : (
                ''
              )))}
            </ListGroup>
          )}

        </div>
        <div>
          <h2>My Rockets</h2>
          {rocketsLoading ? (<div>Loading</div>) : (
            <ListGroup>
              {rockets.map((rocket) => (rocket.reserved ? (
                <ListGroup.Item key={rocket.rocket_id} className={styles.listItem}>
                  {rocket.rocket_id}
                </ListGroup.Item>
              ) : (
                ''
              )))}
            </ListGroup>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
