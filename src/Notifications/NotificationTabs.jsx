import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { Tabs, Tab } from '@edx/paragon';
import { useSelector, useDispatch } from 'react-redux';
import NotificationSections from './NotificationSections';
import { getNotificationTotalUnseenCounts, getSelectedAppName } from './data/selectors';
import { fetchNotificationList, markNotificationsAsSeen } from './data/thunks';
import { notificationTabsOptions } from './data/constants';

const NotificationTabs = () => {
  const notificationUnseenCounts = useSelector(getNotificationTotalUnseenCounts());
  const selectedappName = useSelector(getSelectedAppName());
  const [activeTab, setActiveTab] = useState(notificationTabsOptions[0].key);
  const [loadMoreCount, setLoadMoreCount] = useState(10);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationList({
      appName: activeTab, notificationCount: loadMoreCount, page, pageSize: 10,
    }));
    dispatch(markNotificationsAsSeen(activeTab));
  }, [dispatch, activeTab, loadMoreCount, page]);

  const handleActiveTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleLoadMoreNotification = useCallback((count) => {
    setLoadMoreCount(count);
    setPage(page + 1);
  }, [page]);

  const tabArray = useMemo(() => notificationTabsOptions.map((option) => (
    <Tab
      eventKey={option.key}
      title={option.title}
      notification={notificationUnseenCounts.countByAppName[option.key]}
      tabClassName="pt-0 pb-2.5 px-2.5 d-flex flex-row align-items-center line-height-24"
    >
      {option.key === selectedappName
      && <NotificationSections handleLoadMoreNotification={handleLoadMoreNotification} loadMoreCount={loadMoreCount} />}
    </Tab>
  )), [notificationUnseenCounts, handleLoadMoreNotification, loadMoreCount, selectedappName]);

  // This code is used to replace More... text to More to match the UI
  const buttons = document.getElementsByClassName('dropdown-toggle');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].firstChild.nodeValue = 'More';
  }

  return (
    <Tabs
      variant="tabs"
      defaultActiveKey={activeTab}
      onSelect={handleActiveTab}
      className="px-2.5"
    >
      {tabArray}
    </Tabs>
  );
};

export default NotificationTabs;
