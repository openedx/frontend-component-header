/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const IDLE = 'idle';
export const LOADING = 'loading';
export const LOADED = 'loaded';
export const FAILED = 'failed';
export const DENIED = 'denied';
// today or earlier logic will shift on component level
const slice = createSlice({
  name: 'notifications',
  initialState: {
    notificationStatus: 'idle',
    appName: 'discussions',
    appsId: ['reminders', 'discussions', 'grades', 'authoring'],
    apps: {
      reminders: ['notification_1', 'notification_2'],
      discussions: ['notification_3'],
      grades: ['notification_4', 'notification_5'],
      authoring: ['notification_6'],
    },
    notifications: {
      notification_1: {},
      notification_2: {},
      notification_3: {},
      notification_4: {},
      notification_5: {},
      notification_6: {},
    },
    tabsCount: {
      reminders: 0,
      discussions: 0,
      grades: 0,
      authoring: 0,
      totalCount: 0,
    },
    pagination: {
      count: 90,
      numPages: 9,
      currentPage: 1,
    },
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
