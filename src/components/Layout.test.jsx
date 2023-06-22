import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Layout from './Layout';

it('renders correctly', () => {
  const tree = renderer.create(<Router><Layout /></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
