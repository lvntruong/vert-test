import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './components/Layout';
import Landing from './components/Landing';
import Users from './components/users/Users';

import { getCurrentUser, getAllUser } from './actions/user.actions';

import requireAuth from './lib/requireAuth';
// import waitingForAuth from './lib/waitingForAuth';

export default (
  <Route path="/" component={Layout} onEnter={getCurrentUser()}>
    <IndexRoute component={requireAuth(Landing)} />
    <Route path="test" onEnter={getAllUser()} component={requireAuth(Users)}/>
  </Route>
);