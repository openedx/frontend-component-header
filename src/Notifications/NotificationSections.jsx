import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';
import { Button } from '@edx/paragon';
import PropTypes from 'prop-types';
import { messages } from './messages';
import NotificationRowItem from './NotificationRowItem';
import { getNotifications } from './data/selectors';

const NotificationSections = ({ handleLoadMoreNotification, loadMoreCount }) => {
  const intl = useIntl();
  const notifications = useSelector(getNotifications());
  const { TODAY, EARLIER, totalCount } = notifications || {};

  return (
    notifications && (
    <div className="mt-4 px-4">
      <div className="d-flex flex-row justify-content-between pb-2">
        {TODAY && TODAY.length > 0 && (
        <>
          <span className="text-gray-500">
            { intl.formatMessage(messages.notificationTodayHeading)}
          </span>
          {totalCount > 0 && (
          <span className="text-info-500 line-height-24">
            {intl.formatMessage(messages.notificationMarkAsRead)}
          </span>
          )}
        </>
        )}
      </div>
        {TODAY && TODAY.map(
          (notification) => <NotificationRowItem notification={notification} />,
        )}
      <div className="d-flex flex-row justify-content-between pb-2">
        <span className="text-gray-500">
          {EARLIER && EARLIER.length > 0
            && intl.formatMessage(messages.notificationEarlierHeading)}
        </span>
        {totalCount > 0 && TODAY && TODAY.length === 0 && (
          <span className="text-info-500 line-height-24">
            {intl.formatMessage(messages.notificationMarkAsRead)}
          </span>
        )}
      </div>
        {EARLIER && EARLIER.map(
          (notification) => <NotificationRowItem notification={notification} />,
        )}
        {loadMoreCount < totalCount && (
          <Button
            variant="primary"
            className="w-100 bg-primary-500"
            onClick={() => handleLoadMoreNotification(loadMoreCount + 10)}
          >
            {intl.formatMessage(messages.loadMoreNotifications)}
          </Button>
        )}
    </div>
    )
  );
};

NotificationSections.propTypes = {
  handleLoadMoreNotification: PropTypes.func.isRequired,
  loadMoreCount: PropTypes.number.isRequired,
};

export default React.memo(NotificationSections);
