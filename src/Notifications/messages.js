import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  notificationTitle: {
    id: 'notification.title',
    defaultMessage: 'Notifications',
    description: 'Notifications',
  },
  notificationTodayHeading: {
    id: 'notification.today.heading',
    defaultMessage: 'Last 24 hours',
    description: 'Today Notifications',
  },
  notificationEarlierHeading: {
    id: 'notification.earlier.heading',
    defaultMessage: 'Earlier',
    description: 'Earlier Notifications',
  },
  notificationMarkAsRead: {
    id: 'notification.mark.as.read',
    defaultMessage: 'Mark all as read',
    description: 'Mark all Notifications as read',
  },
  fullStop: {
    id: 'notification.fullStop',
    defaultMessage: '•',
    description: 'Fullstop shown to users to indicate who edited a post.',
  },
  loadMoreNotifications: {
    id: 'notification.load.more.notifications',
    defaultMessage: 'Load more notifications',
    description: 'Load more button to load more notifications',
  },
});

export default messages;
