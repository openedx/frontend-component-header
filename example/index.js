import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { initialize, APP_READY } from '@edx/frontend-platform/init';
import { getConfig } from '@edx/frontend-platform/config';
import { AppContext, AppProvider } from '@edx/frontend-platform/react';
import { subscribe } from '@edx/frontend-platform/pubSub';
import './index.scss';
import Header from '../src/';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      {/* We can fake out authentication by including another provider here with the data we want */}
      <AppContext.Provider value={{
        authenticatedUser: null,
        config: getConfig(),
      }}>
        <Header />
      </AppContext.Provider>
      <h5 className="mt-2 mb-5">Logged out state</h5>

      {/* We can fake out authentication by including another provider here with the data we want */}
      <AppContext.Provider value={{
        authenticatedUser: {
          userId: '123abc',
          username: 'testuser',
          roles: [],
          administrator: false,
        },
        config: getConfig(),
      }}>
        <Header />
      </AppContext.Provider>
      <h5 className="mt-2">Logged in state</h5>
    </AppProvider>,
    document.getElementById('root'),
  );
});

initialize({
  messages: []
});
