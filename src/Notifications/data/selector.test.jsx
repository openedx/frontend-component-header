import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';

import { initializeStore } from '../../store';
import executeThunk from '../../test-utils';
import { getNotificationsApiUrl, getNotificationsCountApiUrl } from './api';
import {
  selectNotifications,
  selectNotificationsByIds,
  selectNotificationStatus,
  selectNotificationTabs,
  selectNotificationTabsCount,
  selectPaginationData,
  selectSelectedAppName,
  selectSelectedAppNotificationIds,
  selectShowNotificationTray,
} from './selectors';
import { fetchAppsNotificationCount, fetchNotificationList } from './thunks';

import './__factories__';

const notificationCountsApiUrl = getNotificationsCountApiUrl();
const notificationsApiUrl = getNotificationsApiUrl();

let axiosMock;
let store;

describe('Notification Selectors', () => {
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

    axiosMock.onGet(notificationCountsApiUrl).reply(200, (Factory.build('notificationsCount')));
    axiosMock.onGet(notificationsApiUrl).reply(200, (Factory.buildList('notification', 2, null)));
    await executeThunk(fetchAppsNotificationCount(), store.dispatch, store.getState);
    await executeThunk(fetchNotificationList({ page: 1, pageSize: 10 }), store.dispatch, store.getState);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('should return notification status.', async () => {
    const state = store.getState();
    const status = selectNotificationStatus()(state);

    expect(status).toEqual('successful');
  });

  it('should return notification tabs count.', async () => {
    const state = store.getState();
    const tabsCount = selectNotificationTabsCount()(state);

    expect(tabsCount.count).toEqual(25);
    expect(tabsCount.reminders).toEqual(10);
    expect(tabsCount.discussions).toEqual(0);
    expect(tabsCount.grades).toEqual(10);
    expect(tabsCount.authoring).toEqual(5);
  });

  it('should return notification tabs.', async () => {
    const state = store.getState();
    const tabs = selectNotificationTabs()(state);

    expect(tabs).toHaveLength(4);
  });

  it('should return selected app notification ids.', async () => {
    const state = store.getState();
    const notificationIds = selectSelectedAppNotificationIds('discussions')(state);

    expect(notificationIds).toHaveLength(2);
  });

  it('should return show notification tray status.', async () => {
    const state = store.getState();
    const showNotificationTrayStatus = selectShowNotificationTray()(state);

    expect(showNotificationTrayStatus).toEqual(true);
  });

  it('should return notifications.', async () => {
    const state = store.getState();
    const notifications = selectNotifications()(state);

    expect(Object.keys(notifications)).toHaveLength(2);
  });

  it('should return notifications from Ids.', async () => {
    const state = store.getState();
    const notifications = selectNotificationsByIds('discussions')(state);

    expect(notifications).toHaveLength(2);
  });

  it('should return selected app name.', async () => {
    const state = store.getState();
    const appName = selectSelectedAppName()(state);

    expect(appName).toEqual('discussions');
  });

  it('should return pagination data.', async () => {
    const state = store.getState();
    const paginationData = selectPaginationData()(state);

    expect(paginationData.count).toEqual(10);
    expect(paginationData.currentPage).toEqual(1);
    expect(paginationData.numPages).toEqual(2);
  });
});
