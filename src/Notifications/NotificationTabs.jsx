import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { Tabs, Tab } from '@edx/paragon';
import { useSelector, useDispatch } from 'react-redux';
import NotificationSections from './NotificationSections';
import { getNotificationTabsCount, getSelectedAppName, getNotificationTabs } from './data/selectors';
import { fetchNotificationList, markNotificationsAsSeen } from './data/thunks';

const NotificationTabs = () => {
  const notificationUnseenCounts = useSelector(getNotificationTabsCount());
  const notificationTabs = useSelector(getNotificationTabs());
  const selectedAppName = useSelector(getSelectedAppName());
  const [activeTab, setActiveTab] = useState(selectedAppName);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationList({ appName: activeTab, page, pageSize: 10 }));
    if (selectedAppName) { dispatch(markNotificationsAsSeen(selectedAppName)); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page, selectedAppName]);

  const handleActiveTab = useCallback((tab) => {
    setActiveTab(tab);
    setPage(1);
  }, []);

  const handleLoadMoreNotification = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const tabArray = useMemo(() => notificationTabs?.map((option) => (
    <Tab
      eventKey={option}
      title={option}
      notification={notificationUnseenCounts[option]}
      tabClassName="pt-0 pb-2.5 px-2.5 d-flex flex-row align-items-center line-height-24 text-capitalize"
    >
      {option === selectedAppName && (
      <NotificationSections
        handleLoadMoreNotification={handleLoadMoreNotification}
      />
      )}
    </Tab>
  )), [notificationUnseenCounts, handleLoadMoreNotification, selectedAppName, notificationTabs]);

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
