import React, { Fragment } from 'react';

import Main from '../Home/Main';
import Facts from '../Facts/Facts';
import Dashboard from './Dashboard';
import Bottom from './Bottom';

const home = () => {
  return (
    <Fragment>
    <Main />
    <Dashboard />
    <Facts />
    <Bottom />
  </Fragment>
  
  );
};

export default home;
