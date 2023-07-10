import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import { initializeStore } from '../store';
import executeThunk from '../test-utils';
import { getNotificationsListApiUrl, getNotificationsCountApiUrl } from './data/api';
import { fetchAppsNotificationCount, fetchNotificationList } from './data/thunks';

import './data/__factories__';

const notificationCountsApiUrl = getNotificationsCountApiUrl();
const notificationsApiUrl = getNotificationsListApiUrl();

export default async function mockNotificationsResponse() {
  const store = initializeStore();
  const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
  const notifications = (Factory.buildList('notification', 8, null, { createdDate: new Date().toISOString() }).concat(
    Factory.buildList('notification', 2, null, { createdDate: '2023-06-01T00:46:11.979531Z' }),
  ));
  axiosMock.onGet(notificationCountsApiUrl).reply(200, (Factory.build('notificationsCount')));
  axiosMock.onGet(notificationsApiUrl).reply(200, (Factory.build('notificationsList', {
    results: notifications,
    num_pages: 2,
    next: `${notificationsApiUrl}?app_name=discussion&page=2`,
  })));

  await executeThunk(fetchAppsNotificationCount(), store.dispatch, store.getState);
  await executeThunk(fetchNotificationList({ appName: 'discussion', page: 1 }), store.dispatch, store.getState);
  return { store, axiosMock };
}
