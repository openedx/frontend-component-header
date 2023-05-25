import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { Tabs, Tab } from '@edx/paragon';
import { useSelector, useDispatch } from 'react-redux';
import NotificationSections from './NotificationSections';
import { getNotificationTotalUnseenCounts, getSelectedNotificationType } from './data/selectors';
import { fetchNotificationList } from './data/thunks';
import { notificationTabsOptions } from './data/constants';

const NotificationTabs = () => {
  const notificationUnseenCounts = useSelector(getNotificationTotalUnseenCounts());
  const selectedNotificationType = useSelector(getSelectedNotificationType());
  const [activeTab, setActiveTab] = useState(notificationTabsOptions[0].key);
  const [loadMoreCount, setLoadMoreCount] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationList({ notificationType: activeTab, notificationCount: loadMoreCount }));
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
      tabClassName="d-flex flex-row align-items-center pt-0 pb-2.5 line-height-24 px-0 mr-4"
    >
      {option.key === selectedNotificationType
      && <NotificationSections handleLoadMoreNotification={handleLoadMoreNotification} loadMoreCount={loadMoreCount} />}
    </Tab>
  )), [notificationUnseenCounts, handleLoadMoreNotification, loadMoreCount, selectedNotificationType]);

  // This code is used to replace More... text to More to match the UI
  const buttons = document.getElementsByClassName('dropdown-toggle');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].firstChild.nodeValue = 'More';
  }

  return (
    activeTab && (
    <Tabs
      defaultActiveKey={activeTab}
      className="notification-tabs"
      onSelect={handleActiveTab}
    >
      {tabArray}
    </Tabs>
    )
  );
};

export default NotificationTabs;
