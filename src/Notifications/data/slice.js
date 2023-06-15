/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const RequestStatus = {
  IDLE: 'idle',
  LOADING: 'in-progress',
  LOADED: 'successful',
  FAILED: 'failed',
  DENIED: 'denied',
};

const initialState = {
  notificationStatus: 'idle',
  appName: 'discussions',
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
    fetchNotificationDenied: (state) => {
      state.notificationStatus = RequestStatus.DENIED;
    },
    fetchNotificationFailure: (state) => {
      state.notificationStatus = RequestStatus.FAILED;
    },
    fetchNotificationRequest: (state) => {
      state.notificationStatus = RequestStatus.LOADING;
    },
    fetchNotificationSuccess: (state, { payload }) => {
      const {
        newNotificationIds, notificationsKeyValuePair, numPages, currentPage,
      } = payload;
      const existingNotificationIds = state.apps[state.appName];

      state.apps[state.appName] = Array.from(new Set([...existingNotificationIds, ...newNotificationIds]));
      state.notifications = { ...state.notifications, ...notificationsKeyValuePair };
      state.tabsCount.count -= state.tabsCount[state.appName];
      state.tabsCount[state.appName] = 0;
      state.notificationStatus = RequestStatus.LOADED;
      state.pagination.numPages = numPages;
      state.pagination.currentPage = currentPage;
    },
    fetchNotificationsCountDenied: (state) => {
      state.notificationStatus = RequestStatus.DENIED;
    },
    fetchNotificationsCountFailure: (state) => {
      state.notificationStatus = RequestStatus.FAILED;
    },
    fetchNotificationsCountRequest: (state) => {
      state.notificationStatus = RequestStatus.LOADING;
    },
    fetchNotificationsCountSuccess: (state, { payload }) => {
      const {
        countByAppName, appIds, apps, count, showNotificationTray,
      } = payload;
      state.tabsCount = { count, ...countByAppName };
      state.appsId = appIds;
      state.apps = apps;
      state.showNotificationTray = showNotificationTray;
      state.notificationStatus = RequestStatus.LOADED;
    },
    markNotificationsAsSeenRequest: (state) => {
      state.notificationStatus = RequestStatus.LOADING;
    },
    markNotificationsAsSeenSuccess: (state) => {
      state.notificationStatus = RequestStatus.LOADED;
    },
    markNotificationsAsSeenDenied: (state) => {
      state.notificationStatus = RequestStatus.DENIED;
    },
    markNotificationsAsSeenFailure: (state) => {
      state.notificationStatus = RequestStatus.FAILED;
    },
    markAllNotificationsAsReadRequest: (state) => {
      state.notificationStatus = RequestStatus.LOADING;
    },
    markAllNotificationsAsReadSuccess: (state) => {
      const updatedNotifications = Object.fromEntries(
        Object.entries(state.notifications).map(([key, notification]) => [
          key, { ...notification, lastRead: new Date().toISOString() },
        ]),
      );
      state.notifications = updatedNotifications;
      state.notificationStatus = RequestStatus.LOADED;
    },
    markAllNotificationsAsReadDenied: (state) => {
      state.notificationStatus = RequestStatus.DENIED;
    },
    markAllNotificationsAsReadFailure: (state) => {
      state.notificationStatus = RequestStatus.FAILED;
    },
    markNotificationsAsReadRequest: (state) => {
      state.notificationStatus = RequestStatus.LOADING;
    },
    markNotificationsAsReadSuccess: (state, { payload }) => {
      const date = new Date().toISOString();
      state.notifications[payload.id] = { ...state.notifications[payload.id], lastRead: date };
      state.notificationStatus = RequestStatus.LOADED;
    },
    markNotificationsAsReadDenied: (state) => {
      state.notificationStatus = RequestStatus.DENIED;
    },
    markNotificationsAsReadFailure: (state) => {
      state.notificationStatus = RequestStatus.FAILED;
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
