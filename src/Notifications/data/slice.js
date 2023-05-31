/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const LOADING = 'loading';
export const LOADED = 'loaded';
export const FAILED = 'failed';
export const DENIED = 'denied';

const slice = createSlice({
  name: 'notifications',
  initialState: {
    notificationStatus: 'idle',
    notifications: {},
    totalUnseenCounts: {},
    appName: '',
  },
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
      state.appName = payload.appName;
      state.notificationStatus = LOADING;
    },
    fetchNotificationSuccess: (state, { payload }) => {
      state.notifications = payload;
      state.notificationStatus = LOADED;
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
      state.tabsCount = payload;
      state.notificationStatus = LOADED;
      state.totalUnseenCounts = payload;
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
} = slice.actions;

export const notificationsReducer = slice.reducer;
