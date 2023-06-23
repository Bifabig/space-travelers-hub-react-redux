import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Rockets from './routes/Rockets';
import Profile from './routes/Profile';
import Missions from './routes/Missions';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Navigate to="/rockets" />} />
      <Route path="rockets" element={<Rockets />} />
      <Route path="missions" element={<Missions />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default App;
