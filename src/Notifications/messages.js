import { defineMessages } from '@edx/frontend-platform/i18n';

// eslint-disable-next-line import/prefer-default-export
export const messages = defineMessages({
  notificationTodayHeading: {
    id: 'notification.today.heading',
    defaultMessage: 'Today',
    description: 'Today Notifications',
  },
  notificationMarkAsRead: {
    id: 'notification.mark.as.read',
    defaultMessage: 'Mark all as read',
    description: 'Mark all Notifications as read',
  },
  notificationPostedContent: {
    id: 'notification.posted.content',
    defaultMessage: '{respondingUser} posted {notificationContent}',
    description: 'Display notification content for post type',
  },
  notificationHelpedContent: {
    id: 'notification.helped.content',
    defaultMessage: '{respondingUser} asked {notificationContent}',
    description: 'Display notification content for help type',
  },
});
