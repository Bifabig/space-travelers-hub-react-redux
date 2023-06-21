import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const { missions, isLoading, error } = useSelector((state) => state.missions);

  if (isLoading) <div>Loading</div>;

  if (error) <h2>Something went wrong</h2>;

  return (
    <div className={styles.wrapper}>
      <hr />
      <div className={styles.profile}>
        <div className={styles.missions}>
          <h2>My Missions</h2>
          <ListGroup>
            {missions.map((mission) => (mission.reserved ? (
              <ListGroup.Item key={mission.mission_id} className={styles.listItem}>
                {mission.mission_name}
              </ListGroup.Item>
            ) : (
              ''
            )))}
          </ListGroup>
        </div>
        <div>
          <h2>My Rockets</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
