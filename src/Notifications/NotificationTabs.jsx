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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationList({ notificationType: activeTab || 'reminders' }));
  }, [dispatch, activeTab]);

  useEffect(() => {
    setActiveTab(activeTab || 'reminders');
  }, [activeTab]);

  const handleActiveTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const tabArray = useMemo(() => notificationTabsOptions.map((option) => (
    <Tab
      eventKey={option.key}
      title={option.title}
      notification={notificationUnseenCounts[option.title]}
      tabClassName="notification-tab"
    >
      <NotificationSections />
    </Tab>
  )), [notificationUnseenCounts]);

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
