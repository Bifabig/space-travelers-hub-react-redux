import { NavLink } from 'react-router-dom';
import Icon from '../Assets/Icon.png';
import styles from '../styles/Navbar.module.css';

const links = [
  { path: '/rockets', text: 'Rockets' },
  { path: '/missions', text: 'Missions' },
  { path: '/profile', text: 'Profile' },
];
const Navbar = () => (
  <nav className={styles.wrapper}>
    <div className={styles.navbar}>
      <div className={styles.navlogo}>
        <img className={styles.logoIcon} src={Icon} alt="Icon" />
        <h1>Space Travelers&apos; Hub</h1>
      </div>
      <div>
        <ul className={styles.navItems}>
          {links.map((link) => (
            <li key={link.text}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? styles.active : styles.none)}
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);
export default Navbar;
