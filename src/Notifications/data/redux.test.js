import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';

import { initializeStore } from '../../store';
import executeThunk from '../../test-utils';
import mockNotificationsResponse from '../test-utils';
import {
  getNotificationsListApiUrl, getNotificationsCountApiUrl, markNotificationAsReadApiUrl, markNotificationsSeenApiUrl,
} from './api';
import {
  fetchAppsNotificationCount, fetchNotificationList, markNotificationsAsRead, markAllNotificationsAsRead,
  resetNotificationState, markNotificationsAsSeen,
} from './thunks';

import './__factories__';

const notificationCountsApiUrl = getNotificationsCountApiUrl();
const notificationsListApiUrl = getNotificationsListApiUrl();
const markedAllNotificationsAsReadApiUrl = markNotificationAsReadApiUrl();
const markedAllNotificationsAsSeenApiUrl = markNotificationsSeenApiUrl('discussion');

let axiosMock;
let store;

describe('Notification Redux', () => {
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

    ({ store, axiosMock } = await mockNotificationsResponse());
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('Successfully loaded initial notification states in the redux.', async () => {
    executeThunk(resetNotificationState(), store.dispatch, store.getState);

    const { notifications } = store.getState();

    expect(notifications.notificationStatus).toEqual('idle');
    expect(notifications.appName).toEqual('discussion');
    expect(notifications.appsId).toHaveLength(0);
    expect(notifications.apps).toEqual({});
    expect(notifications.notifications).toEqual({});
    expect(notifications.tabsCount).toEqual({});
    expect(notifications.showNotificationsTray).toEqual(false);
    expect(notifications.pagination).toEqual({});
  });

  it('Successfully loaded notifications list in the redux.', async () => {
    const { notifications: { notifications } } = store.getState();
    expect(Object.keys(notifications)).toHaveLength(10);
  });

  it.each([
    { statusCode: 404, status: 'failed' },
    { statusCode: 403, status: 'denied' },
  ])('%s to load notifications list in the redux.', async ({ statusCode, status }) => {
    axiosMock.onGet(notificationsListApiUrl).reply(statusCode);
    await executeThunk(fetchNotificationList({ page: 1 }), store.dispatch, store.getState);

    const { notifications: { notificationStatus } } = store.getState();

    expect(notificationStatus).toEqual(status);
  });

  it('Successfully loaded notification counts in the redux.', async () => {
    const { notifications: { tabsCount } } = store.getState();

    expect(tabsCount.count).toEqual(25);
    expect(tabsCount.reminders).toEqual(10);
    expect(tabsCount.discussion).toEqual(0);
    expect(tabsCount.grades).toEqual(10);
    expect(tabsCount.authoring).toEqual(5);
  });

  it.each([
    { statusCode: 404, status: 'failed' },
    { statusCode: 403, status: 'denied' },
  ])('%s to load notification counts in the redux.', async ({ statusCode, status }) => {
    axiosMock.onGet(notificationCountsApiUrl).reply(statusCode);
    await executeThunk(fetchAppsNotificationCount(), store.dispatch, store.getState);

    const { notifications: { notificationStatus } } = store.getState();

    expect(notificationStatus).toEqual(status);
  });

  it('Successfully marked all notifications as seen for selected app.', async () => {
    axiosMock.onPut(markedAllNotificationsAsSeenApiUrl).reply(200);
    await executeThunk(markNotificationsAsSeen('discussion'), store.dispatch, store.getState);

    expect(store.getState().notifications.notificationStatus).toEqual('successful');
  });

  it.each([
    { statusCode: 404, status: 'failed' },
    { statusCode: 403, status: 'denied' },
  ])('%s to mark all notifications as seen for selected app.', async ({ statusCode, status }) => {
    axiosMock.onPut(markedAllNotificationsAsSeenApiUrl).reply(statusCode);
    await executeThunk(markNotificationsAsSeen('discussion'), store.dispatch, store.getState);

    const { notifications: { notificationStatus } } = store.getState();

    expect(notificationStatus).toEqual(status);
  });

  it('Successfully marked all notifications as read for selected app in the redux.', async () => {
    axiosMock.onPatch(markedAllNotificationsAsReadApiUrl).reply(200);
    await executeThunk(markAllNotificationsAsRead('discussion'), store.dispatch, store.getState);

    const { notifications: { notificationStatus, notifications } } = store.getState();
    const firstNotification = Object.values(notifications)[0];

    expect(notificationStatus).toEqual('successful');
    expect(firstNotification.lastRead).not.toBeNull();
  });

  it('Successfully marked notification as read in the redux.', async () => {
    axiosMock.onPatch(markedAllNotificationsAsReadApiUrl).reply(200);
    await executeThunk(markNotificationsAsRead(1), store.dispatch, store.getState);

    const { notifications: { notificationStatus, notifications } } = store.getState();
    const firstNotification = Object.values(notifications)[0];

    expect(notificationStatus).toEqual('successful');
    expect(firstNotification.lastRead).not.toBeNull();
  });

  it.each([
    { statusCode: 404, status: 'failed' },
    { statusCode: 403, status: 'denied' },
  ])('%s to marked notification as read in the redux.', async ({ statusCode, status }) => {
    axiosMock.onPatch(markedAllNotificationsAsReadApiUrl).reply(statusCode);
    await executeThunk(markNotificationsAsRead(1), store.dispatch, store.getState);

    const { notifications: { notificationStatus } } = store.getState();

    expect(notificationStatus).toEqual(status);
  });
});
