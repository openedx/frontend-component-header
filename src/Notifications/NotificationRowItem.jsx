/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useContext } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
import * as timeago from 'timeago.js';
import PropTypes from 'prop-types';
import { AppContext } from '@edx/frontend-platform/react';
import { messages } from './messages';
import {
  PostOutline, HelpOutline, QuestionAnswerOutline, CheckCircleFilled, Verified, Report, ThumbsUpOutline, EditOutline,
} from './icons';
import timeLocale from '../time-locale';

const NotificationRowItem = ({ notification }) => {
  const intl = useIntl();
  timeago.register('time-locale', timeLocale);
  const { authenticatedUser } = useContext(AppContext);

  const handleIconByType = (type) => {
    switch (type) {
      case 'post': return PostOutline;
      case 'help': return HelpOutline;
      case 'respond': return QuestionAnswerOutline;
      case 'comment': return QuestionAnswerOutline;
      case 'question': return QuestionAnswerOutline;
      case 'answer': return CheckCircleFilled;
      case 'endorsed': return Verified;
      case 'reported': return Report;
      case 'postLiked': return ThumbsUpOutline;
      case 'commentLiked': return ThumbsUpOutline;
      case 'edited': return EditOutline;
      default: return null;
    }
  };

  const getContentMessageByType = useCallback(() => {
    const typeMap = {
      post: messages.notificationPostedContent,
      help: messages.notificationHelpedContent,
      respond: authenticatedUser.username !== notification.author
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
    return typeMap[notification.type] ? intl.formatMessage(typeMap[notification.type]) : null;
  }, [authenticatedUser, notification, intl]);

  return (
    <div className="d-flex notification-item mb-2 notification-item">
      <div className="mr-2 icon-container">
        <Icon
          src={handleIconByType(notification.type)}
          style={{ height: '28px', width: '28px' }}
        />
      </div>
      <div className="row d-flex w-100 ml-0">
        <div style={{ display: 'contents' }} className="col-md-12 w-100">
          <span className="col-md-11 px-0 text-primary-500 mb-2 w-100 notification-item-content">
            {notification?.respondingUser} {' '}
            <span className="text-gray-500">{getContentMessageByType()} </span>
            {notification?.targetUser && (
            <>
              {notification?.targetUser}
              <span className="text-gray-500">
                {authenticatedUser.username !== notification.author
                  ? intl.formatMessage(messages.notificationResponseOnOtherPostLabel)
                  : intl.formatMessage(messages.notificationResponseOnYourPostLabel)}
              </span>
            </>
            )}
            <a className="text-primary-500" href={notification.URL}>
              {' '}{notification?.notificationContent}
            </a>
          </span>
          <div className="col-md-1 d-flex flex-column justify-content-end mb-2 unread">
            {notification.status === 'unread'
            && <div className="bg-brand-500" />}
          </div>
          <div className="w-100 px-0">
            <span className="text-gray-500 mb-2 w-100 course-container">
              <span className="">{notification?.courseName}</span>
              <span className="mr-1.5 font-size-8 font-style text-light-700" style={{ padding: '0px 6px' }}>
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
