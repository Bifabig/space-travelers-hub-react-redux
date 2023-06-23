import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import renderer from 'react-test-renderer';
import Layout from '../components/Layout';
import Rockets from '../routes/Rockets';
import Profile from '../routes/Profile';
import Missions from '../routes/Missions';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/rockets" />} />
            <Route path="rockets" element={<Rockets />} />
            <Route path="missions" element={<Missions />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
