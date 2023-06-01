import { camelCaseObject, getConfig, snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { splitNotificationsByTime } from '../utils';

import notificationsList from './notifications.json';

export const getNotificationsCountApiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/count/`;
export const getNotificationsApiUrl = () => `${getConfig().LMS_BASE_URL}/api/notifications/`;
export const markNotificationsSeenApiUrl = (appName) => `${getConfig().LMS_BASE_URL}/api/notifications/mark-notifications-unseen/${appName}/`;

export async function getNotifications(appName, notificationCount, page, pageSize) {
  // const params = snakeCaseObject({ page, pageSize });
  // const { data } = await getAuthenticatedHttpClient().get(getNotificationsApiUrl(), { params });
  const data = notificationsList.notifications;

  const { today, earlier } = splitNotificationsByTime(camelCaseObject(data));
  data = {
    discussions: {
      TODAY: today,
      EARLIER: earlier,
    },
    reminders: {
      TODAY: today,
      EARLIER: earlier,
    },
  };

  const notifications = data[appName];
  const { TODAY = [], EARLIER = [] } = notifications || [];
  let todayNotifications = TODAY;
  let earlierNotifications = [];
  let totalCount = 0;

  if (TODAY && EARLIER) {
    if (TODAY.length > notificationCount) {
      todayNotifications = TODAY.slice(0, notificationCount);
    } else {
      todayNotifications = TODAY;
      earlierNotifications = EARLIER.slice(0, notificationCount - TODAY.length);
    }
    totalCount = TODAY.length + EARLIER.length;
  }

  return { TODAY: todayNotifications, EARLIER: earlierNotifications, totalCount };
}

export async function getNotificationCounts() {
  // const { data } = await getAuthenticatedHttpClient().get(getNotificationsCountApiUrl());
  const data = {
    count: 40,
    count_by_app_name: {
      reminders: 10,
      discussions: 20,
      grades: 5,
      authoring: 5,
    },
  };

  return data;
}

export async function markNotificationSeen(appName) {
  const { data } = await getAuthenticatedHttpClient().put(`${markNotificationsSeenApiUrl(appName)}`);
  return camelCaseObject(data);
}
