/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs } from '@edx/paragon';
import NotificationSections from './NotificationSections';
import { fetchNotificationList, markNotificationsAsSeen } from './data/thunks';
import {
  selectNotificationTabs, selectNotificationTabsCount, selectPaginationData, selectSelectedAppName,
} from './data/selectors';
import { updateAppNameRequest } from './data/slice';

const NotificationTabs = () => {
  const dispatch = useDispatch();
  const selectedAppName = useSelector(selectSelectedAppName());
  const notificationUnseenCounts = useSelector(selectNotificationTabsCount());
  const notificationTabs = useSelector(selectNotificationTabs());
  const { currentPage } = useSelector(selectPaginationData());

  useEffect(() => {
    dispatch(fetchNotificationList({ appName: selectedAppName, page: currentPage }));
    if (selectedAppName) { dispatch(markNotificationsAsSeen(selectedAppName)); }
  }, [currentPage, selectedAppName]);

  const handleActiveTab = useCallback((appName) => {
    dispatch(updateAppNameRequest({ appName }));
  }, []);

  const tabArray = useMemo(() => notificationTabs?.map((appName) => (
    <Tab
      key={appName}
      eventKey={appName}
      title={appName}
      notification={notificationUnseenCounts[appName]}
      tabClassName="pt-0 pb-10px px-2.5 d-flex border-top-0 mb-0 align-items-center line-height-24 text-capitalize"
      data-testid={`notification-tab-${appName}`}
    >
      {appName === selectedAppName && (<NotificationSections />)}
    </Tab>
  )), [notificationUnseenCounts, selectedAppName, notificationTabs]);

  return (
    <Tabs
      variant="tabs"
      defaultActiveKey={selectedAppName}
      onSelect={handleActiveTab}
      className="px-2.5 text-primary-500"
    >
      {tabArray}
    </Tabs>
  );
};

export default React.memo(NotificationTabs);
