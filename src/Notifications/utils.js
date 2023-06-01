export const splitNotificationsByTime = (notificationList) => {
  const currentTime = Date.now();
  const twentyFourHoursAgo = currentTime - (24 * 60 * 60 * 1000);

  const { today, earlier } = notificationList.reduce(
    (result, notification) => {
      const objectTime = new Date(notification.createdAt).getTime();
      if (objectTime >= twentyFourHoursAgo && objectTime <= currentTime) {
        result.today.push(notification);
      } else {
        result.earlier.push(notification);
      }
      return result;
    },
    { today: [], earlier: [] },
  );

  return { today, earlier };
};

export const getNotificationCount = (notificationCounts, appName) => {
  const { countByAppName } = notificationCounts;
  return countByAppName[appName] || 0;
};
