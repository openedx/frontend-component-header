import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
// import * as timeago from 'timeago.js';
import { messages } from './messages';
import { PostOutline } from './icons';

const NotificationRowItem = () => {
  const intl = useIntl();

  return (
    <div style={{ padding: '10px 24px 10px 24px' }} className="d-flex pb-2">
      <div style={{ padding: '12px 12px 12px 0px' }} className="mr-2">
        <Icon
          src={PostOutline}
          className="post-summary-comment-count-dimensions mr-0.5"
          style={{ height: '28px', width: '28px' }}
        />
      </div>
      <div className="d-flex w-100">
        <div style={{ display: 'contents' }}>
          <span className="px-0 text-primary-500 mb-2 w-100" style={{ lineHeight: '24px', width: '417px' }}>
            SCM_Lead <span className="text-gray-500">posted </span>
            <a
              className="text-primary-500"
              href="url"
            >
              Hello and welcome to SC0x!
            </a>
          </span>
          <div
            className="d-flex flex-column justify-content-end"
            style={{
              height: '24px', width: '24px',
            }}
          >
            <div
              className="bg-brand-500"
              style={{
                background: '#D23228', borderRadius: '100px', height: '10px', width: '10px',
              }}
            />
          </div>
        </div>
        {/* <div style={{ display: 'contents' }}>
          <span className="px-0 text-primary-500 mb-2 w-100" style={{ lineHeight: '24px', width: '417px' }}>
            <span className="text-gray-500">Supply Chain Analytics</span>
            <span
              className="mr-1.5 font-size-8 font-style text-light-700"
              style={{ lineHeight: '15px' }}
            >
              {intl.formatMessage(messages.fullStop)}
            </span>
            <span>
              {timeago.format(postCreatedAt, 'time-locale')}

            </span>

          </span>
        </div> */}
      </div>
    </div>
  );
};

NotificationRowItem.propTypes = {
};

export default React.memo(NotificationRowItem);
