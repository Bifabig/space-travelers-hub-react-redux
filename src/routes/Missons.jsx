import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMissionItems } from '../components/redux/missons/missonsSlice';

const Missons = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMissionItems());
  }, [dispatch]);
  return <div>Missons</div>;
};

export default Missons;
