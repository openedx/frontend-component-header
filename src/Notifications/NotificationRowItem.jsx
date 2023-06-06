import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';
import { Icon } from '@edx/paragon';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { getIconByType } from './utils';
import { markNotificationsAsRead } from './data/thunks';
import { messages } from './messages';
import timeLocale from '../common/time-locale';

const NotificationRowItem = ({
  id, type, contentUrl, content, courseName, createdAt, lastRead,
}) => {
  timeago.register('time-locale', timeLocale);
  const intl = useIntl();
  const dispatch = useDispatch();

  const handleMarkAsRead = useCallback(() => {
    dispatch(markNotificationsAsRead(id));
  }, [dispatch, id]);

  const iconComponent = getIconByType(type);

  return (
    <Link className="d-flex mb-2 align-items-center text-decoration-none" to={contentUrl} onClick={handleMarkAsRead}>
      <Icon
        src={iconComponent && iconComponent.icon}
        style={{ height: '23.33px', width: '23.33px' }}
        className={iconComponent && `${iconComponent.class} mr-4`}
      />
      <div className="d-flex w-100">
        <div className="d-flex align-items-center w-100">
          <div className="py-10px w-100 px-0 cursor-pointer">
            <span
              className="line-height-24 text-gray-700 mb-2 notification-item-content overflow-hidden content"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="py-0 d-flex">
              <span className="font-size-12 text-gray-500 line-height-20">
                <span>{courseName}</span>
                <span className="text-light-700 px-1.5">{intl.formatMessage(messages.fullStop)}</span>
                <span>{timeago.format(createdAt, 'time-locale')}</span>
              </span>
            </div>
          </div>
          {!lastRead && (
            <div className="d-flex py-1.5 px-1.5 ml-2 cursor-pointer">
              <span className="bg-brand-500 rounded unread" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

NotificationRowItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  contentUrl: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  courseName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  lastRead: PropTypes.string.isRequired,
};

export default React.memo(NotificationRowItem);
