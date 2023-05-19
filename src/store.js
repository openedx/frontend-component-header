import { configureStore } from '@reduxjs/toolkit';

import { notificationsReducer } from './Notifications/data';

export function initializeStore(preloadedState = undefined) {
  return configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    preloadedState,
  });
}

const store = initializeStore();

export default store;
