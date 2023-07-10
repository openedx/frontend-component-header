import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';

import { initializeStore } from '../../store';
import mockNotificationsResponse from '../test-utils';
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

import './__factories__';

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

    ({ store, axiosMock } = await mockNotificationsResponse());
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('Should return notification status.', async () => {
    const state = store.getState();
    const status = selectNotificationStatus()(state);

    expect(status).toEqual('successful');
  });

  it('Should return notification tabs count.', async () => {
    const state = store.getState();
    const tabsCount = selectNotificationTabsCount()(state);

    expect(tabsCount.count).toEqual(25);
    expect(tabsCount.reminders).toEqual(10);
    expect(tabsCount.discussion).toEqual(0);
    expect(tabsCount.grades).toEqual(10);
    expect(tabsCount.authoring).toEqual(5);
  });

  it('Should return notification tabs.', async () => {
    const state = store.getState();
    const tabs = selectNotificationTabs()(state);

    expect(tabs).toHaveLength(4);
  });

  it('Should return selected app notification ids.', async () => {
    const state = store.getState();
    const notificationIds = selectSelectedAppNotificationIds('discussion')(state);

    expect(notificationIds).toHaveLength(10);
  });

  it('Should return show notification tray status.', async () => {
    const state = store.getState();
    const showNotificationTrayStatus = selectShowNotificationTray()(state);

    expect(showNotificationTrayStatus).toEqual(true);
  });

  it('Should return notifications.', async () => {
    const state = store.getState();
    const notifications = selectNotifications()(state);

    expect(Object.keys(notifications)).toHaveLength(10);
  });

  it('Should return notifications from Ids.', async () => {
    const state = store.getState();
    const notifications = selectNotificationsByIds('discussion')(state);

    expect(notifications).toHaveLength(10);
  });

  it('Should return selected app name.', async () => {
    const state = store.getState();
    const appName = selectSelectedAppName()(state);

    expect(appName).toEqual('discussion');
  });

  it('Should return pagination data.', async () => {
    const state = store.getState();
    const paginationData = selectPaginationData()(state);

    expect(paginationData.currentPage).toEqual(1);
    expect(paginationData.numPages).toEqual(2);
    expect(paginationData.hasMorePages).toEqual(true);
  });
});
