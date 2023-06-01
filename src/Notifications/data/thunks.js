import { camelCaseObject } from '@edx/frontend-platform';
import {
  fetchNotificationSuccess,
  fetchNotificationRequest,
  fetchNotificationFailure,
  fetchNotificationsCountFailure,
  fetchNotificationsCountRequest,
  fetchNotificationsCountSuccess,
  markNotificationsAsSeenRequest,
  markNotificationsAsSeenSuccess,
  markNotificationsAsSeenFailure,
} from './slice';
import { getNotifications, getNotificationCounts, markNotificationSeen } from './api';

export const fetchNotificationList = ({
  appName, notificationCount, page, pageSize,
}) => (
  async (dispatch) => {
    try {
      dispatch(fetchNotificationRequest({ appName }));
      const data = await getNotifications(appName, notificationCount, page, pageSize);
      dispatch(fetchNotificationSuccess(data));
    } catch (errors) {
      dispatch(fetchNotificationFailure({ appName }));
    }
  }
);

export const fetchAppsNotificationCount = () => (
  async (dispatch) => {
    try {
      dispatch(fetchNotificationsCountRequest());
      const data = await getNotificationCounts();
      dispatch(fetchNotificationsCountSuccess(camelCaseObject(data)));
    } catch (errors) {
      dispatch(fetchNotificationsCountFailure());
    }
  }
);

export const markNotificationsAsSeen = (appName) => (
  async (dispatch) => {
    try {
      dispatch(markNotificationsAsSeenRequest({ appName }));
      const data = await markNotificationSeen(appName);
      dispatch(markNotificationsAsSeenSuccess(data));
    } catch (errors) {
      dispatch(markNotificationsAsSeenFailure({ appName }));
    }
  }
);
