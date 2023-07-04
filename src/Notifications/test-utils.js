import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import { initializeStore } from '../store';
import executeThunk from '../test-utils';
import { getNotificationsApiUrl, getNotificationsCountApiUrl } from './data/api';
import { fetchAppsNotificationCount, fetchNotificationList } from './data/thunks';

import './data/__factories__';

const notificationCountsApiUrl = getNotificationsCountApiUrl();
const notificationsApiUrl = getNotificationsApiUrl();

export default async function mockNotificationsResponse() {
  const store = initializeStore();
  const axiosMock = new MockAdapter(getAuthenticatedHttpClient());

  axiosMock.onGet(notificationCountsApiUrl).reply(200, (Factory.build('notificationsCount')));
  axiosMock.onGet(notificationsApiUrl).reply(
    200,
    (Factory.buildList('notification', 8, null, { createdDate: new Date().toISOString() }).concat(
      Factory.buildList('notification', 8, null, { createdDate: '2023-06-01T00:46:11.979531Z' }),
    )),
  );

  await executeThunk(fetchAppsNotificationCount(), store.dispatch, store.getState);
  await executeThunk(fetchNotificationList({ page: 1, pageSize: 10 }), store.dispatch, store.getState);
  return { store, axiosMock };
}
