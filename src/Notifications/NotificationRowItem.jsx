/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
import React, { useCallback } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
import * as timeago from 'timeago.js';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { messages } from './messages';
import timeLocale from '../common/time-locale';
import { markNotificationsAsRead } from './data/thunks';
import { getIconByType } from './utils';

const NotificationRowItem = ({ notification }) => {
  const intl = useIntl();
  timeago.register('time-locale', timeLocale);
  const dispatch = useDispatch();

  const handleRedirectToURL = useCallback(() => {
    dispatch(markNotificationsAsRead(notification.id));
    window.open(notification.contentUrl, '_blank');
  }, [notification]);

  const handleMarkAllAsRead = useCallback(() => {
    dispatch(markNotificationsAsRead(notification.id));
  }, [notification.id]);

  const iconComponent = getIconByType(notification.type);

  return (
    <div className="d-flex mb-2 align-items-center">
      <Icon
        src={iconComponent && iconComponent.icon}
        style={{ height: '23.33px', width: '23.33px' }}
        className={iconComponent && `${iconComponent.class} mr-4`}
      />
      <div className="d-flex w-100">
        <div className="d-flex align-items-center w-100">
          <div className="py-2 w-100 px-0 cursor-pointer" onClick={handleRedirectToURL}>
            <span
              className="line-height-24 text-gray-700 mb-2 notification-item-content overflow-hidden"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: notification.content }}
            />
            <div className="py-0 d-flex flex-row align-items-center">
              <span className="font-size-12 text-gray-500 line-height-20">
                <span>{notification?.courseName}</span>
                <span className="text-light-700 px-1.5">{intl.formatMessage(messages.fullStop)}</span>
                <span>{timeago.format(notification?.createdAt, 'time-locale')}</span>
              </span>
            </div>
          </div>
          {!notification.lastRead && (
            <div className="d-flex py-1.5 px-1.5 ml-2 cursor-pointer" onClick={handleMarkAllAsRead}>
              <span className="bg-brand-500 rounded unread" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

NotificationRowItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default React.memo(NotificationRowItem);
