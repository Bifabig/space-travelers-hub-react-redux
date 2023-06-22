import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Rockets from './routes/Rockets';
import Missons from './routes/Missons';
import Profile from './routes/Profile';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Navigate to="/rockets" />} />
      <Route path="rockets" element={<Rockets />} />
      <Route path="missons" element={<Missons />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default App;
