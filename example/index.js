import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppContext, APP_READY, AppProvider } from '@edx/frontend-base';
import { NewRelicLoggingService } from '@edx/frontend-logging';
import './index.scss';
import SiteHeader from '../src/';

App.subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      {/* We can fake out authentication by including another provider here with the data we want */}
      <AppContext.Provider value={{
        authenticatedUser: {
          userId: null,
          username: null,
          roles: [],
          administrator: false,
        },
        config: App.config
      }}>
        <SiteHeader />
      </AppContext.Provider>
      <h5 className="mt-2 mb-5">Logged out state</h5>

      {/* We can fake out authentication by including another provider here with the data we want */}
      <AppContext.Provider value={{
        authenticatedUser: {
          userId: null,
          username: 'testuser',
          roles: [],
          administrator: false,
        },
        config: App.config
      }}>
        <SiteHeader />
      </AppContext.Provider>
      <h5 className="mt-2">Logged in state</h5>
    </AppProvider>,
    document.getElementById('root'),
  );
});

App.initialize({ messages: [], loggingService: NewRelicLoggingService });
