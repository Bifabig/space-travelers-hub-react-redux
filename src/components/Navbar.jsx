import { NavLink } from 'react-router-dom';
import Icon from '../Assets/Icon.png';

const links = [
  { path: '/rockets', text: 'Rockets' },
  { path: '/missons', text: 'Missons' },
  { path: '/profile', text: 'Profile' },
];
const Navbar = () => (
  <nav className="navbar-wrapper">
    <div className="navbar">
      <img className="logo-icon" src={Icon} alt="Icon" />
      <h1>Space Travelers&apos; Hub</h1>
      <ul>
        {links.map((link) => (
          <li key={link.text}>
            <NavLink to={link.path}>{link.text}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);
export default Navbar;
