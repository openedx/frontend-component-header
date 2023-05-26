/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useContext } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
import * as timeago from 'timeago.js';
import PropTypes from 'prop-types';
import { AppContext } from '@edx/frontend-platform/react';
import {
  CheckCircle, HelpOutline, QuestionAnswerOutline, Verified, Report, EditOutline, ThumbUpOutline, PostOutline,
} from '@edx/paragon/icons';
import { messages } from './messages';
import timeLocale from '../common/time-locale';

const NotificationRowItem = ({ notification }) => {
  const intl = useIntl();
  timeago.register('time-locale', timeLocale);
  const { authenticatedUser } = useContext(AppContext);

  const getIconByType = (type) => {
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
    return iconMap[type] || null;
  };

  const getContentMessageByType = useCallback(() => {
    const contentMessage = {
      post: messages.notificationPostedContent,
      help: messages.notificationHelpedContent,
      respond: (authenticatedUser && authenticatedUser.username) !== notification.author
        ? messages.notificationResponseOnOtherPostLabel : null,
      comment: notification.targetUser
        ? messages.notificationCommentedOnLabel : messages.notificationCommentedOnYourPostLabel,
      question: messages.notificationQuestionLabel,
      answer: messages.notificationAnswerLabel,
      endorsed: messages.notificationEndorsedLabel,
      reported: messages.notificationReportedLabel,
      postLiked: messages.notificationPostLikedLabel,
      commentLiked: messages.notificationCommentLikedLabel,
      edited: messages.notificationEditedLabel,
    };
    return contentMessage[notification.type] ? intl.formatMessage(contentMessage[notification.type]) : null;
  }, [authenticatedUser, notification, intl]);

  const iconComponent = getIconByType(notification.type);
  return (
    <div className="d-flex mb-2">
      <div className="mr-2 py-4 pr-2.5">
        <Icon
          src={iconComponent && iconComponent.icon}
          style={{ height: '23.33px', width: '23.33px' }}
          className={iconComponent && iconComponent.class}
        />
      </div>
      <div className="row d-flex w-100 py-0 px-0 py-2.5">
        <div style={{ display: 'contents' }} className="col-md-12 w-100">
          <span className="col-md-11 px-0 text-primary-500 mb-2 w-100 notification-item-content overflow-hidden">
            {notification?.respondingUser} {' '}
            <span className="text-gray-500">{getContentMessageByType()} </span>
            {notification?.targetUser && (
            <>
              {notification?.targetUser}
              <span className="text-gray-500">
                {(authenticatedUser && authenticatedUser.username) !== notification.author
                  ? intl.formatMessage(messages.notificationResponseOnOtherPostLabel)
                  : intl.formatMessage(messages.notificationResponseOnYourPostLabel)}
              </span>
            </>
            )}
            <a className="text-primary-500" href={notification.URL}>
              {' '}{notification?.notificationContent}
            </a>
          </span>
          <div className="col-md-1 d-flex flex-column justify-content-end mb-2">
            {notification.status === 'unread' && <div className="bg-brand-500 rounded unread" />}
          </div>
          <div className="w-100 px-0 py-0 d-flex flex-row align-items-center">
            <span className="text-gray-500 mb-2 w-100 font-size-12">
              <span className="">{notification?.courseName}</span>
              <span className="font-size-12 text-light-700 px-1.5">
                {intl.formatMessage(messages.fullStop)}
              </span>
              <span>
                {timeago.format(notification?.time, 'time-locale')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

NotificationRowItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default React.memo(NotificationRowItem);
