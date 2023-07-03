import { getConfig, snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export const getNotificationsCountApiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/count/`;
export const getNotificationsListApiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/`;
export const markNotificationsSeenApiUrl = (appName) => `${getConfig().LMS_BASE_URL}/api/notifications/mark-seen/${appName}/`;
export const markNotificationAsReadApiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/read/`;

export async function getNotificationsList(appName, page) {
  const params = snakeCaseObject({ appName, page });
  const { data } = await getAuthenticatedHttpClient().get(getNotificationsListApiUrl(), { params });
  return data;
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
  const { data } = await getAuthenticatedHttpClient().patch(markNotificationAsReadApiUrl(), params);

  return data;
}

export async function markNotificationRead(notificationId) {
  const params = snakeCaseObject({ notificationId });
  const { data } = await getAuthenticatedHttpClient().patch(markNotificationAsReadApiUrl(), params);

  return { data, id: notificationId };
}
