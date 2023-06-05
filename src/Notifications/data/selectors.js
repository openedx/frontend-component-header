export const getNotificationStatus = () => state => state.notifications.notificationStatus;
export const getNotificationTabsCount = () => state => state.notifications.tabsCount;
export const getNotificationTabs = () => state => state.notifications.appsId;
export const getSelectedAppNotificationIds = (appName) => state => state.notifications.apps[appName] ?? [];
export const getNotificationTrayStatus = () => state => state.notifications.showNotificationTray;
export const getNotificationsByIds = (notificationIds) => state => Object.entries(state.notifications.notifications)
  .filter(([key]) => notificationIds.includes(key)).map(([, value]) => value);
export const getSelectedAppName = () => state => state.notifications.appName;
export const getPaginationData = () => state => state.notifications.pagination;
