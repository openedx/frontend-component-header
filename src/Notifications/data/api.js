import { camelCaseObject, getConfig } from '@edx/frontend-platform';

import notificationsList from './notifications.json';

export const getNotificationsCountApiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/count/`;
export const getNotificationsApiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/`;
export const markNotificationsSeenApiUrl = (appName) => `${getConfig().LMS_BASE_URL}/api/notifications/mark-notifications-unseen/${appName}/`;

export async function getNotifications(appName, page, pageSize) {
  const { data } = notificationsList;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const notifications = data.slice(startIndex, endIndex);
  return { notifications: camelCaseObject(notifications), numPages: 2, currentPage: page };
}

export async function getNotificationCounts() {
  const data = {
    count: 45,
    count_by_app_name: {
      reminders: 10,
      discussions: 20,
      grades: 10,
      authoring: 5,
    },
    show_notification_tray: true,
  };
  return camelCaseObject(data);
}

export async function markNotificationSeen() {
  const data = [];
  return camelCaseObject(data);
}

export async function markAllNotificationRead() {
  const { data } = camelCaseObject(notificationsList);
  return data;
}

export async function markNotificationRead(notificationId) {
  const { data } = camelCaseObject(notificationsList);
  return { data, id: notificationId };
}
