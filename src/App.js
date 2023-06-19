import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* <Route index element={<Rockets />} />
      <Route path="rockets" element={<Rockets />} />
      <Route path="missons" element={<Missons />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<NotMatch />} /> */}
    </Route>
  </Routes>
);

export default App;
