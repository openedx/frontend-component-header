import {
  CheckCircle, HelpOutline, QuestionAnswerOutline, Verified, Report, EditOutline, ThumbUpOutline, PostOutline,
} from '@edx/paragon/icons';

/**
 * Get HTTP Error status from generic error.
 * @param error Generic caught error.
 * @returns {number|null}
 */
export const getHttpErrorStatus = error => error?.customAttributes?.httpErrorStatus ?? error?.response?.status;

export const splitNotificationsByTime = (notificationList) => {
  let splittedData = [];
  if (notificationList.length > 0) {
    const currentTime = Date.now();
    const twentyFourHoursAgo = currentTime - (24 * 60 * 60 * 1000);

    splittedData = notificationList.reduce(
      (result, notification) => {
        if (notification) {
          const objectTime = new Date(notification.createdAt).getTime();
          if (objectTime >= twentyFourHoursAgo && objectTime <= currentTime) {
            result.today.push(notification);
          } else {
            result.earlier.push(notification);
          }
        }
        return result;
      },
      { today: [], earlier: [] },
    );
  }
  const { today, earlier } = splittedData;
  return { today, earlier };
};

export const getIconByType = (type) => {
  const iconMap = {
    post: { icon: PostOutline, class: 'text-primary-500' },
    help: { icon: HelpOutline, class: 'text-primary-500' },
    respond: { icon: QuestionAnswerOutline, class: 'text-primary-500' },
    comment: { icon: QuestionAnswerOutline, class: 'text-primary-500' },
    question: { icon: QuestionAnswerOutline, class: 'text-primary-500' },
    answer: { icon: CheckCircle, class: 'text-success' },
    endorsed: { icon: Verified, class: 'text-primary-500' },
    reported: { icon: Report, class: 'text-danger-500' },
    postLiked: { icon: ThumbUpOutline, class: 'text-primary-500' },
    commentLiked: { icon: ThumbUpOutline, class: 'text-primary-500' },
    edited: { icon: EditOutline, class: 'text-primary-500' },
  };
  return iconMap[type] || { icon: PostOutline, class: 'text-primary-500' };
};
