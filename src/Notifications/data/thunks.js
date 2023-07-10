import { camelCaseObject } from '@edx/frontend-platform';
import {
  fetchNotificationSuccess,
  fetchNotificationRequest,
  fetchNotificationFailure,
  fetchNotificationDenied,
  fetchNotificationsCountFailure,
  fetchNotificationsCountRequest,
  fetchNotificationsCountSuccess,
  fetchNotificationsCountDenied,
  markNotificationsAsSeenRequest,
  markNotificationsAsSeenSuccess,
  markNotificationsAsSeenFailure,
  markNotificationsAsSeenDenied,
  markNotificationsAsReadDenied,
  resetNotificationStateRequest,
  markAllNotificationsAsReadRequest,
  markAllNotificationsAsReadSuccess,
  markAllNotificationsAsReadFailure,
  markAllNotificationsAsReadDenied,
  markNotificationsAsReadRequest,
  markNotificationsAsReadSuccess,
  markNotificationsAsReadFailure,
} from './slice';
import {
  getNotificationsList, getNotificationCounts, markNotificationSeen, markAllNotificationRead, markNotificationRead,
} from './api';
import { getHttpErrorStatus } from '../utils';

const normalizeNotificationCounts = ({ countByAppName, count, showNotificationsTray }) => {
  const appIds = Object.keys(countByAppName);
  const apps = appIds.reduce((acc, appId) => { acc[appId] = []; return acc; }, {});
  return {
    countByAppName, appIds, apps, count, showNotificationsTray,
  };
};

const normalizeNotifications = (data) => {
  const newNotificationIds = data.results.map(notification => notification.id.toString());
  const notificationsKeyValuePair = data.results.reduce((acc, obj) => { acc[obj.id] = obj; return acc; }, {});
  const pagination = {
    numPages: data.numPages,
    currentPage: data.currentPage,
    hasMorePages: !!data.next,
  };
  return {
    newNotificationIds, notificationsKeyValuePair, pagination,
  };
};

export const fetchNotificationList = ({ appName, page }) => (
  async (dispatch) => {
    try {
      dispatch(fetchNotificationRequest({ appName }));
      const data = await getNotificationsList(appName, page);
      const normalisedData = normalizeNotifications((camelCaseObject(data)));
      dispatch(fetchNotificationSuccess({ ...normalisedData }));
    } catch (error) {
      if (getHttpErrorStatus(error) === 403) {
        dispatch(fetchNotificationDenied(appName));
      } else {
        dispatch(fetchNotificationFailure(appName));
      }
    }
  }
);

export const fetchAppsNotificationCount = () => (
  async (dispatch) => {
    try {
      dispatch(fetchNotificationsCountRequest());
      const data = await getNotificationCounts();
      const normalisedData = normalizeNotificationCounts((camelCaseObject(data)));
      dispatch(fetchNotificationsCountSuccess({ ...normalisedData }));
    } catch (error) {
      if (getHttpErrorStatus(error) === 403) {
        dispatch(fetchNotificationsCountDenied());
      } else {
        dispatch(fetchNotificationsCountFailure());
      }
    }
  }
);

export const markAllNotificationsAsRead = (appName) => (
  async (dispatch) => {
    try {
      dispatch(markAllNotificationsAsReadRequest({ appName }));
      const data = await markAllNotificationRead(appName);
      dispatch(markAllNotificationsAsReadSuccess(camelCaseObject(data)));
    } catch (error) {
      if (getHttpErrorStatus(error) === 403) {
        dispatch(markAllNotificationsAsReadDenied());
      } else {
        dispatch(markAllNotificationsAsReadFailure());
      }
    }
  }
);

export const markNotificationsAsRead = (notificationId) => (
  async (dispatch) => {
    try {
      dispatch(markNotificationsAsReadRequest({ notificationId }));
      const data = await markNotificationRead(notificationId);
      dispatch(markNotificationsAsReadSuccess(camelCaseObject(data)));
    } catch (error) {
      if (getHttpErrorStatus(error) === 403) {
        dispatch(markNotificationsAsReadDenied());
      } else {
        dispatch(markNotificationsAsReadFailure());
      }
    }
  }
);

export const markNotificationsAsSeen = (appName) => (
  async (dispatch) => {
    try {
      dispatch(markNotificationsAsSeenRequest({ appName }));
      const data = await markNotificationSeen(appName);
      dispatch(markNotificationsAsSeenSuccess(camelCaseObject(data)));
    } catch (error) {
      if (getHttpErrorStatus(error) === 403) {
        dispatch(markNotificationsAsSeenDenied());
      } else {
        dispatch(markNotificationsAsSeenFailure());
      }
    }
  }
);

export const resetNotificationState = () => (
  async (dispatch) => { dispatch(resetNotificationStateRequest()); }
);
