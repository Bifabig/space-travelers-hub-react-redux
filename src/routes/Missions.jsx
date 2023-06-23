import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {
  getMissionItems,
  joinMission,
  leaveMission,
} from '../redux/missions/missionsSlice';
import styles from '../styles/Missions.module.css';

const Missions = () => {
  const dispatch = useDispatch();
  const { missions, isLoading, error } = useSelector((state) => state.missions);
  useEffect(() => {
    if (missions.length === 0) {
      dispatch(getMissionItems());
    }
  }, [dispatch, missions.length]);
  const handleJoinMission = (id) => {
    dispatch(joinMission(id));
  };

  const handleLeaveMission = (id) => {
    dispatch(leaveMission(id));
  };

  if (error) return <h2>Something went wrong</h2>;

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className={styles.wrapper}>
      <hr />
      <div className={styles.table}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Mission</th>
              <th>Description</th>
              <th>Status</th>
              <th>{'    '}</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission.mission_id}>
                <td>{mission.mission_name}</td>
                <td className={styles.desc}>{mission.description}</td>
                <td>
                  <div className={styles.center}>
                    {mission.reserved ? (
                      <Badge bg="info">Active Member</Badge>
                    ) : (
                      <Badge bg="secondary">Not A Member</Badge>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.centerBtn}>
                    {mission.reserved ? (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleLeaveMission(mission.mission_id)}
                      >
                        Leave Mission
                      </Button>
                    ) : (
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleJoinMission(mission.mission_id)}
                      >
                        Join Mission
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default Missions;
