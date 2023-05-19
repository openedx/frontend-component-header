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
    notificationType: '',
  },
  reducers: {
    fetchNotificationDenied: (state, { payload }) => {
      state.notificationType = payload.notificationType;
      state.notificationStatus = DENIED;
    },
    fetchNotificationFailure: (state, { payload }) => {
      state.notificationType = payload.notificationType;
      state.notificationStatus = FAILED;
    },
    fetchNotificationRequest: (state, { payload }) => {
      state.notificationType = payload.notificationType;
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
} = slice.actions;

export const notificationsReducer = slice.reducer;
