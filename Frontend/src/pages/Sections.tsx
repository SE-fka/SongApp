import React, { Fragment } from 'react';

import Home from './Home/Home';
import Facts from './Facts/Facts';

const sections = () => {
  return (
    <Fragment>
      <Home />
      <Facts />
    </Fragment>
  );
};

export default sections;
