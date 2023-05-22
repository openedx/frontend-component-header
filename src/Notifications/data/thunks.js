import {
  fetchNotificationSuccess,
  fetchNotificationRequest,
  fetchNotificationFailure,
  fetchNotificationsCountFailure,
  fetchNotificationsCountRequest,
  fetchNotificationsCountSuccess,
} from './slice';
import {
  getNotifications,
  getNotificationCounts,
} from './api';

export const fetchNotificationList = ({ notificationType, notificationCount }) => (
  async (dispatch) => {
    try {
      dispatch(fetchNotificationRequest({ notificationType }));
      const data = await getNotifications(notificationType, notificationCount);
      dispatch(fetchNotificationSuccess(data));
    } catch (errors) {
      dispatch(fetchNotificationFailure({ notificationType }));
    }
  }
);

export const fetchNotificationsCountsList = () => (
  async (dispatch) => {
    try {
      dispatch(fetchNotificationsCountRequest());
      const data = await getNotificationCounts();
      dispatch(fetchNotificationsCountSuccess(data));
    } catch (errors) {
      dispatch(fetchNotificationsCountFailure());
    }
  }
);
