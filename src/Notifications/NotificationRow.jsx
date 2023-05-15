import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { messages } from './messages';
import NotificationRowItem from './NotificationRowItem';

const NotificationRow = () => {
  const intl = useIntl();

  return (
    <div className="pt-4">
      <div style={{ padding: '10px 24px 10px 24px' }} className="d-flex pb-2">
        <span className="w-100 px-0">
          {intl.formatMessage(messages.notificationTodayHeading)}
        </span>
        <span className="w-100 px-0 text-right text-info-500">
          {intl.formatMessage(messages.notificationMarkAsRead)}
        </span>
      </div>
      <div>
        <NotificationRowItem />
      </div>
    </div>
  );
};

NotificationRow.propTypes = {
};

export default React.memo(NotificationRow);
