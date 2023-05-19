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

export const fetchNotificationList = ({ notificationType }) => (
  async (dispatch) => {
    try {
      dispatch(fetchNotificationRequest({ notificationType }));
      const data = await getNotifications(notificationType);
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
