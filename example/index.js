import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from '@edx/frontend-i18n';
import { AuthenticationContext } from '@edx/frontend-base';

import './index.scss';
import SiteHeader from '../src/';

const App = () => (
  <div>
    <IntlProvider locale="en">
      <>
        <AuthenticationContext.Provider value={{
          userId: null,
          username: null,
          administrator: false,
        }}>
          <SiteHeader />
        </AuthenticationContext.Provider>
        <h5 className="mt-2 mb-5">Logged out state</h5>

        <AuthenticationContext.Provider value={{
          userId: null,
          username: 'testuser',
          administrator: false,
        }}>
          <SiteHeader />
        </AuthenticationContext.Provider>
        <h5 className="mt-2">Logged in state</h5>
      </>
    </IntlProvider>
  </div>
);

render(<App />, document.getElementById('root'));
