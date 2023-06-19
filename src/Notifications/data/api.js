import { getConfig, snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export const getNotificationsCountApiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/count/`;
export const getNotificationsApiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/`;
export const markNotificationsSeenApiUrl = (appName) => `${getConfig().LMS_BASE_URL}/api/notifications/mark-notifications-unseen/${appName}/`;
export const markAllNotificationsAsReadpiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/read/`;

export async function getNotifications(appName, page, pageSize) {
  const params = snakeCaseObject({ page, pageSize });
  const { data } = await getAuthenticatedHttpClient().get(getNotificationsApiUrl(), { params });

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const notifications = data.slice(startIndex, endIndex);
  return { notifications, numPages: 2, currentPage: page };
}

export async function getNotificationCounts() {
  const { data } = await getAuthenticatedHttpClient().get(getNotificationsCountApiUrl());

  return data;
}

export async function markNotificationSeen(appName) {
  const { data } = await getAuthenticatedHttpClient().put(`${markNotificationsSeenApiUrl(appName)}`);

  return data;
}

export async function markAllNotificationRead(appName) {
  const params = snakeCaseObject({ appName });
  const { data } = await getAuthenticatedHttpClient().put(markAllNotificationsAsReadpiUrl(), { params });

  return data;
}

export async function markNotificationRead(notificationId) {
  const params = snakeCaseObject({ notificationId });
  const { data } = await getAuthenticatedHttpClient().put(markAllNotificationsAsReadpiUrl(), { params });

  return { data, id: notificationId };
}
