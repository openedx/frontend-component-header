import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { Tabs, Tab } from '@edx/paragon';
import { useSelector, useDispatch } from 'react-redux';
import NotificationSections from './NotificationSections';
import { getNotificationTabsCount, getSelectedAppName, getNotificationTabs } from './data/selectors';
import { fetchNotificationList, markNotificationsAsSeen } from './data/thunks';

const NotificationTabs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const selectedAppName = useSelector(getSelectedAppName());
  const notificationUnseenCounts = useSelector(getNotificationTabsCount());
  const notificationTabs = useSelector(getNotificationTabs());

  useEffect(() => {
    dispatch(fetchNotificationList({ appName: selectedAppName, page, pageSize: 10 }));
    if (selectedAppName) { dispatch(markNotificationsAsSeen(selectedAppName)); }
  }, [dispatch, page, selectedAppName]);

  const handleActiveTab = useCallback((appName) => {
    // dispatch(setSelectedAppName(appName));
  }, []);

  const tabArray = useMemo(() => notificationTabs?.map((appName) => (
    <Tab
      key={appName}
      eventKey={appName}
      title={appName}
      notification={notificationUnseenCounts[appName]}
      tabClassName="pt-0 pb-2.5 px-2.5 d-flex flex-row align-items-center line-height-24 text-capitalize"
    >
      {appName === selectedAppName && (<NotificationSections />)}
    </Tab>
  )), [notificationUnseenCounts, selectedAppName, notificationTabs]);

  return (
    <Tabs
      variant="tabs"
      defaultActiveKey={selectedAppName}
      onSelect={handleActiveTab}
      className="px-2.5"
    >
      {tabArray}
    </Tabs>
  );
};

export default NotificationTabs;
