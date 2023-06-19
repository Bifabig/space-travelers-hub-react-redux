import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Rockets from './routes/Rockets';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="rockets" element={<Rockets />} />
    </Route>
  </Routes>
);

export default App;
