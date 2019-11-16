import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import routes from './routes';
import store from './store';

import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { FAKE_ENDPOINT_GET_USERS } from './actions/user.actions';

let mock;
beforeEach(() => {
  mock = new MockAdapter(axios);
  mock.onGet(FAKE_ENDPOINT_GET_USERS).reply(200, []);
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </MuiThemeProvider>
    , div);
});