import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';

import { initializeStore } from '../../store';
import executeThunk from '../../test-utils';
import {
  getNotificationsApiUrl, getNotificationsCountApiUrl, markAllNotificationsAsReadpiUrl, markNotificationsSeenApiUrl,
  getNotificationCounts, getNotifications, markNotificationSeen, markAllNotificationRead, markNotificationRead,
} from './api';
import {
  fetchAppsNotificationCount,
  fetchNotificationList,
  markAllNotificationsAsRead,
  markNotificationsAsRead,
  markNotificationsAsSeen,
} from './thunks';

import './__factories__';

const notificationCountsApiUrl = getNotificationsCountApiUrl();
const notificationsApiUrl = getNotificationsApiUrl();
const markedAllNotificationsAsSeenApiUrl = markNotificationsSeenApiUrl('discussions');
const markedAllNotificationsAsReadApiUrl = markAllNotificationsAsReadpiUrl('discussions');
const markedNotificationAsReadApiUrl = markAllNotificationsAsReadpiUrl('discussions', 1);

let axiosMock = null;
let store;

describe('Notifications API', () => {
  beforeEach(async () => {
    initializeMockApp({
      authenticatedUser: {
        userId: '123abc',
        username: 'testuser',
        administrator: false,
        roles: [],
      },
    });
    axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    Factory.resetAll();
    store = initializeStore();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('successfully get notification counts for different tabs.', async () => {
    axiosMock.onGet(notificationCountsApiUrl).reply(200, (Factory.build('notificationsCount')));

    const { count, countByAppName } = await getNotificationCounts();

    expect(count).toEqual(45);
    expect(countByAppName.reminders).toEqual(10);
    expect(countByAppName.discussions).toEqual(20);
    expect(countByAppName.grades).toEqual(10);
    expect(countByAppName.authoring).toEqual(5);
  });

  it('failed to get notification counts.', async () => {
    axiosMock.onGet(notificationCountsApiUrl).reply(404);
    await executeThunk(fetchAppsNotificationCount(), store.dispatch, store.getState);

    expect(store.getState().notifications.notificationStatus).toEqual('failed');
  });

  it('denied to get notification counts.', async () => {
    axiosMock.onGet(notificationCountsApiUrl).reply(403, {});
    await executeThunk(fetchAppsNotificationCount(), store.dispatch);

    expect(store.getState().notifications.notificationStatus).toEqual('denied');
  });

  it('successfully get notifications.', async () => {
    axiosMock.onGet(notificationsApiUrl).reply(
      200,
      (Factory.buildList('notification', 2, null, { createdDate: new Date().toISOString() })),
    );

    const { notifications } = await getNotifications('discussions', 1, 10);

    expect(notifications).toHaveLength(2);
  });

  it('failed to get notifications.', async () => {
    axiosMock.onGet(notificationsApiUrl).reply(404);
    await executeThunk(fetchNotificationList({ page: 1, pageSize: 10 }), store.dispatch, store.getState);

    expect(store.getState().notifications.notificationStatus).toEqual('failed');
  });

  it('denied to get notifications.', async () => {
    axiosMock.onGet(notificationsApiUrl).reply(403, {});
    await executeThunk(fetchNotificationList({ page: 1, pageSize: 10 }), store.dispatch);

    expect(store.getState().notifications.notificationStatus).toEqual('denied');
  });

  it('successfully marked all notifications as seen for selected app.', async () => {
    axiosMock.onPut(markedAllNotificationsAsSeenApiUrl).reply(200, { message: 'Notifications marked seen.' });

    const { message } = await markNotificationSeen('discussions');

    expect(message).toEqual('Notifications marked seen.');
  });

  it('failed to mark all notifications as seen for selected app.', async () => {
    axiosMock.onPut(markedAllNotificationsAsSeenApiUrl).reply(404);
    await executeThunk(markNotificationsAsSeen('discussions'), store.dispatch, store.getState);

    expect(store.getState().notifications.notificationStatus).toEqual('failed');
  });

  it('denied to mark all notifications as seen for selected app.', async () => {
    axiosMock.onPut(markedAllNotificationsAsSeenApiUrl).reply(403, {});
    await executeThunk(markNotificationsAsSeen('discussions'), store.dispatch);

    expect(store.getState().notifications.notificationStatus).toEqual('denied');
  });

  it('successfully marked all notifications as read for selected app.', async () => {
    axiosMock.onPut(markedAllNotificationsAsReadApiUrl).reply(200, { message: 'Notifications marked read.' });

    const { message } = await markAllNotificationRead('discussions');

    expect(message).toEqual('Notifications marked read.');
  });

  it('failed to mark all notifications as read for selected app.', async () => {
    axiosMock.onPut(markedAllNotificationsAsReadApiUrl).reply(404);
    await executeThunk(markAllNotificationsAsRead('discussions'), store.dispatch, store.getState);

    expect(store.getState().notifications.notificationStatus).toEqual('failed');
  });

  it('denied to mark all notifications as read for selected app.', async () => {
    axiosMock.onPut(markedAllNotificationsAsReadApiUrl).reply(403, {});
    await executeThunk(markAllNotificationsAsRead('discussions'), store.dispatch);

    expect(store.getState().notifications.notificationStatus).toEqual('denied');
  });

  it('successfully marked notification as read.', async () => {
    axiosMock.onPut(markedNotificationAsReadApiUrl).reply(200, { message: 'Notification marked read.' });

    const { data } = await markNotificationRead('discussions', 1);

    expect(data.message).toEqual('Notification marked read.');
  });

  it('failed to mark notification as read .', async () => {
    axiosMock.onPut(markedNotificationAsReadApiUrl).reply(404);
    await executeThunk(markNotificationsAsRead('discussions', 1), store.dispatch, store.getState);

    expect(store.getState().notifications.notificationStatus).toEqual('failed');
  });

  it('denied to mark notification as read.', async () => {
    axiosMock.onPut(markedNotificationAsReadApiUrl).reply(403, {});
    await executeThunk(markNotificationsAsRead('discussions', 1), store.dispatch);

    expect(store.getState().notifications.notificationStatus).toEqual('denied');
  });
});
