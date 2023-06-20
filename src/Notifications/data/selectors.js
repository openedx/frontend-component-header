import { createSelector } from '@reduxjs/toolkit';

export const selectNotificationStatus = () => state => state.notifications.notificationStatus;

export const selectNotificationTabsCount = () => state => state.notifications.tabsCount;

export const selectNotificationTabs = () => state => state.notifications.appsId;

export const selectSelectedAppNotificationIds = (appName) => state => state.notifications.apps[appName] ?? [];

export const selectShowNotificationTray = () => state => state.notifications.showNotificationsTray;

export const selectNotifications = () => state => state.notifications.notifications;

export const selectNotificationsByIds = (appName) => createSelector(
  selectNotifications(),
  selectSelectedAppNotificationIds(appName),
  (notifications, notificationIds) => notificationIds.map((notificationId) => notifications[notificationId]) || [],
);

export const selectSelectedAppName = () => state => state.notifications.appName;

export const selectPaginationData = () => state => state.notifications.pagination;
