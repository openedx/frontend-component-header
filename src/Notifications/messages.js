import { defineMessages } from '@edx/frontend-platform/i18n';

// eslint-disable-next-line import/prefer-default-export
export const messages = defineMessages({
  notificationTitle: {
    id: 'notification.title',
    defaultMessage: 'Notifications',
    description: 'Notifications',
  },
  notificationTodayHeading: {
    id: 'notification.today.heading',
    defaultMessage: 'Today',
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
  notificationPostedContent: {
    id: 'notification.posted.content',
    defaultMessage: 'posted',
    description: 'Display notification content for post type',
  },
  notificationHelpedContent: {
    id: 'notification.helped.content',
    defaultMessage: 'asked',
    description: 'Display notification content for help type',
  },
  notificationRespondedLabel: {
    id: 'notification.responded.label',
    defaultMessage: 'responded to a post you’re following',
    description: 'Display notification content for respond type',
  },
  notificationCommentedOnLabel: {
    id: 'notification.commented.on.label',
    defaultMessage: 'commented on',
    description: 'Display notification content for comment type',
  },
  notificationResponseOnOtherPostLabel: {
    id: 'notification.response.on.other.post.label',
    defaultMessage: 'response on a post you’re following:',
    description: 'Display notification content for comment type for other posts',
  },
  notificationQuestionLabel: {
    id: 'notification.question.label',
    defaultMessage: 'responded to your question',
    description: 'Display notification content for question type',
  },
  notificationResponseOnYourPostLabel: {
    id: 'notification.response.on.your.post.label',
    defaultMessage: 'response to your post',
    description: 'Display notification content for comment type for your post',
  },
  notificationCommentedOnYourPostLabel: {
    id: 'notification.commented.on.your.post.label',
    defaultMessage: 'commented on your response in',
    description: 'Display notification content for comment type on your response',
  },
  notificationAnswerLabel: {
    id: 'notification.answer.label',
    defaultMessage: 'response has been marked as answer in your post',
    description: 'Display notification content for answer type',
  },
  notificationEndorsedLabel: {
    id: 'notification.endorsed.label',
    defaultMessage: 'Your response has been endorsed in',
    description: 'Display notification content for endorsed type',
  },
  notificationReportedLabel: {
    id: 'notification.reported.label',
    defaultMessage: 'post has been reported',
    description: 'Display notification content for reported type',
  },
  notificationPostLikedLabel: {
    id: 'notification.post.liked.label',
    defaultMessage: 'liked your post',
    description: 'Display notification content for post liked type',
  },
  notificationCommentLikedLabel: {
    id: 'notification.comment.liked.label',
    defaultMessage: 'liked your response in',
    description: 'Display notification content for response liked type',
  },
  notificationEditedLabel: {
    id: 'notification.edited.label',
    defaultMessage: 'edited your post',
    description: 'Display notification content for edited type',
  },
  fullStop: {
    id: 'notification.fullStop',
    defaultMessage: '•',
    description: 'Fullstop shown to users to indicate who edited a post.',
  },
});
