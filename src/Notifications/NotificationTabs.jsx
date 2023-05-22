import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { Tabs, Tab } from '@edx/paragon';
import { useSelector, useDispatch } from 'react-redux';
import NotificationSections from './NotificationSections';
import { getNotificationTotalUnseenCounts } from './data/selectors';
import { fetchNotificationList } from './data/thunks';
import { notificationTabsOptions } from '../constants';

const NotificationTabs = () => {
  const notificationUnseenCounts = useSelector(getNotificationTotalUnseenCounts());
  const [activeTab, setActiveTab] = useState(notificationTabsOptions[0].key);
  const [loadMoreCount, setLoadMoreCount] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationList({ notificationType: activeTab || 'reminders', notificationCount: loadMoreCount }));
  }, [dispatch, activeTab, loadMoreCount]);

  const handleActiveTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleLoadMoreNotification = useCallback((count) => {
    setLoadMoreCount(count);
  }, []);

  const tabArray = useMemo(() => notificationTabsOptions.map((option) => (
    <Tab
      eventKey={option.key}
      title={option.title}
      notification={notificationUnseenCounts[option.title]}
      tabClassName="notification-tab"
    >
      <NotificationSections handleLoadMoreNotification={handleLoadMoreNotification} loadMoreCount={loadMoreCount} />
    </Tab>
  )), [notificationUnseenCounts, handleLoadMoreNotification, loadMoreCount]);

  return (
    activeTab && (
    <Tabs
      defaultActiveKey={activeTab}
      id="uncontrolled-tab-example"
      className="notification-tabs"
      onSelect={handleActiveTab}
    >
      {tabArray}
    </Tabs>
    )
  );
};

export default NotificationTabs;
