/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const IDLE = 'idle';
export const LOADING = 'loading';
export const LOADED = 'loaded';
export const FAILED = 'failed';
export const DENIED = 'denied';

const initialState = {
  notificationStatus: 'idle',
  appName: 'reminders',
  appsId: [],
  apps: {},
  notifications: {},
  tabsCount: {},
  showNotificationTray: false,
  pagination: {
    count: 10,
    numPages: 1,
    currentPage: 1,
    nextPage: null,
  },
};
const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetchNotificationDenied: (state, { payload }) => {
      state.appName = payload.appName;
      state.notificationStatus = DENIED;
    },
    fetchNotificationFailure: (state, { payload }) => {
      state.appName = payload.appName;
      state.notificationStatus = FAILED;
    },
    fetchNotificationRequest: (state, { payload }) => {
      if (state.appName !== payload.appName) { state.apps[payload.appName] = []; }
      state.appName = payload.appName;
      state.notificationStatus = LOADING;
    },
    fetchNotificationSuccess: (state, { payload }) => {
      const { notifications, numPages, currentPage } = payload;
      const newNotificationIds = notifications.map(notification => notification.id.toString());
      const existingNotificationIds = state.apps[state.appName];
      const notificationsKeyValuePair = notifications.reduce((acc, obj) => { acc[obj.id] = obj; return acc; }, {});
      const currentAppCount = state.tabsCount[state.appName];

      state.apps[state.appName] = Array.from(new Set([...existingNotificationIds, ...newNotificationIds]));
      state.notifications = { ...state.notifications, ...notificationsKeyValuePair };
      state.tabsCount.count -= currentAppCount;
      state.tabsCount[state.appName] = 0;
      state.notificationStatus = LOADED;
      state.pagination.numPages = numPages;
      state.pagination.currentPage = currentPage;
    },
    fetchNotificationsCountDenied: (state) => {
      state.notificationStatus = DENIED;
    },
    fetchNotificationsCountFailure: (state) => {
      state.notificationStatus = FAILED;
    },
    fetchNotificationsCountRequest: (state) => {
      state.notificationStatus = LOADING;
    },
    fetchNotificationsCountSuccess: (state, { payload }) => {
      const { countByAppName, count, showNotificationTray } = payload;
      state.tabsCount = { count, ...countByAppName };
      state.appsId = Object.keys(countByAppName);
      state.apps = Object.fromEntries(Object.keys(countByAppName).map(key => [key, []]));
      state.showNotificationTray = showNotificationTray;
      state.notificationStatus = LOADED;
    },
    markNotificationsAsSeenRequest: (state) => {
      state.notificationStatus = LOADING;
    },
    markNotificationsAsSeenSuccess: (state) => {
      state.notificationStatus = LOADED;
    },
    markNotificationsAsSeenDenied: (state) => {
      state.notificationStatus = DENIED;
    },
    markNotificationsAsSeenFailure: (state) => {
      state.notificationStatus = FAILED;
    },
    markAllNotificationsAsReadRequest: (state) => {
      state.notificationStatus = LOADING;
    },
    markAllNotificationsAsReadSuccess: (state) => {
      const updatedNotifications = Object.fromEntries(
        Object.entries(state.notifications).map(([key, notification]) => [
          key, { ...notification, lastRead: new Date().toISOString() },
        ]),
      );
      state.notifications = updatedNotifications;
      state.notificationStatus = LOADED;
    },
    markAllNotificationsAsReadDenied: (state) => {
      state.notificationStatus = DENIED;
    },
    markAllNotificationsAsReadFailure: (state) => {
      state.notificationStatus = FAILED;
    },
    markNotificationsAsReadRequest: (state) => {
      state.notificationStatus = LOADING;
    },
    markNotificationsAsReadSuccess: (state, { payload }) => {
      const date = new Date().toISOString();
      state.notifications[payload.id] = { ...state.notifications[payload.id], lastRead: date };
      state.notificationStatus = LOADED;
    },
    markNotificationsAsReadDenied: (state) => {
      state.notificationStatus = DENIED;
    },
    markNotificationsAsReadFailure: (state) => {
      state.notificationStatus = FAILED;
    },
    resetNotificationStateRequest: () => initialState,
    updateAppNameRequest: (state, { payload }) => {
      state.appName = payload.appName;
      state.pagination.currentPage = 1;
    },
    updatePaginationRequest: (state) => {
      state.pagination.currentPage += 1;
    },
  },
});

export const {
  fetchNotificationDenied,
  fetchNotificationFailure,
  fetchNotificationRequest,
  fetchNotificationSuccess,
  fetchNotificationsCountDenied,
  fetchNotificationsCountFailure,
  fetchNotificationsCountRequest,
  fetchNotificationsCountSuccess,
  markNotificationsAsSeenRequest,
  markNotificationsAsSeenSuccess,
  markNotificationsAsSeenFailure,
  markNotificationsAsSeenDenied,
  markAllNotificationsAsReadDenied,
  markAllNotificationsAsReadRequest,
  markAllNotificationsAsReadSuccess,
  markAllNotificationsAsReadFailure,
  markNotificationsAsReadDenied,
  markNotificationsAsReadRequest,
  markNotificationsAsReadSuccess,
  markNotificationsAsReadFailure,
  resetNotificationStateRequest,
  updateAppNameRequest,
  updatePaginationRequest,
} = slice.actions;

export const notificationsReducer = slice.reducer;
