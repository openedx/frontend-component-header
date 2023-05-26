import { getConfig } from '@edx/frontend-platform';

export const getApiBaseUrl = () => getConfig().LMS_BASE_URL;

const parseNotificationList = (notificationList) => {
  const currentTime = Date.now();
  const twentyFourHoursAgo = currentTime - (24 * 60 * 60 * 1000);
  const today = [];
  const earlier = [];
  notificationList.forEach(obj => {
    const objectTime = obj.time;
    if (objectTime >= twentyFourHoursAgo && objectTime <= currentTime) { today.push(obj); } else { earlier.push(obj); }
  });
  return { today, earlier };
};
export async function getNotifications(notificationType, notificationCount) {
  const notificationData = [
    {
      type: 'post',
      respondingUser: 'SCM_Lead',
      notificationContent: 'Hello and welcome to SC0x!',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684996319038',
    },
    {
      type: 'post',
      respondingUser: 'SCM_Lead',
      notificationContent: 'Hello and welcome to SC0x!',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684996319038',
    },
    {
      type: 'post',
      respondingUser: 'SCM_Lead',
      notificationContent: 'Hello and welcome to SC0x!',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684996319038',
    },
    {
      type: 'help',
      respondingUser: 'MITx_Learner',
      notificationContent: 'What grade does a student need to get in order to pass the course and earn a certificate?',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684996339844',
    },
    {
      type: 'post',
      respondingUser: 'SCM_Lead',
      notificationContent: 'Hello and welcome to SC0x!',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684253634808',
      author: '',
    },
    {
      type: 'help',
      respondingUser: 'MITx_Learner',
      notificationContent: 'What grade does a student need to get in order to pass the course and earn a certificate?',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684253736371',
      author: '',
    },
    {
      type: 'respond',
      respondingUser: 'MITx_Learner',
      notificationContent: 'Can’t find linear regression in section 3 review',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684253736371',
      author: '',
    },
    {
      type: 'comment',
      respondingUser: 'MITx_Learner',
      notificationContent: 'Can’t find linear regression in section 3 review',
      targetUser: 'MITx_Expert’s ',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684253736371',
      author: '',
    },
    {
      type: 'question',
      respondingUser: 'MITx_Learner',
      notificationContent: 'Examples of quadratic equations in supply chains',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684253736371',
      author: '',
    },
    {
      type: 'comment',
      respondingUser: 'MITx_Learner',
      notificationContent: 'What grade does a student need to get in order to pass the course and earn a certificate?',
      targetUser: 'MITx_Expert’s ',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684253736371',
      author: 'testuser',
    },
    {
      type: 'comment',
      respondingUser: 'MITx_Learner',
      notificationContent: 'Convexity of f(x)=1/x , x>1',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1684253736371',
      author: 'testuser',
    },
    {
      type: 'answer',
      respondingUser: 'SCM_Lead',
      notificationContent: 'Quiz in section 3 - Please explain the F-Significance value',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1685096268835',
      author: 'testuser',
    },
    {
      type: 'endorsed',
      respondingUser: '',
      notificationContent: 'Quiz in section 3 - Please explain the F-Significance value',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1685096268835',
      author: 'testuser',
    },
    {
      type: 'reported',
      respondingUser: 'MITx Learner’s',
      notificationContent: '“Here are the exam answers. Question 1 - CSA stands for Compliance Safety Ac...”',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1685096268835',
      author: '',
    },
    {
      type: 'postLiked',
      respondingUser: 'SCM_Lead',
      notificationContent: 'Retaking the course',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1685096268835',
      author: '',
    },
    {
      type: 'commentLiked',
      respondingUser: 'MITx_Expert ',
      notificationContent: 'Final exam answers',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1685096268835',
      author: '',
    },
    {
      type: 'edited',
      respondingUser: 'MITx_Expert ',
      notificationContent: 'Question 1',
      targetUser: '',
      courseName: 'Supply Chain Analytics',
      URL: '',
      status: 'unread',
      time: '1685096268835',
      author: '',
    },
  ];

  const { today, earlier } = parseNotificationList(notificationData);

  const data = {
    discussions: {
      TODAY: today,
      EARLIER: earlier,
    },
    reminders: {
      TODAY: today,
      EARLIER: earlier,
    },
  };
  const notifications = data[notificationType];
  const { TODAY = [], EARLIER = [] } = notifications || [];
  let todayNotifications = TODAY;
  let earlierNotifications = [];
  let totalCount = 0;

  if (TODAY && EARLIER) {
    if (TODAY.length > notificationCount) {
      todayNotifications = TODAY.slice(0, notificationCount);
    } else {
      todayNotifications = TODAY;
      earlierNotifications = EARLIER.slice(0, notificationCount - TODAY.length);
    }
    totalCount = TODAY.length + EARLIER.length;
  }

  return { TODAY: todayNotifications, EARLIER: earlierNotifications, totalCount };
}

export async function getNotificationCounts() {
  const data = {
    Total: 25,
    Reminders: 10,
    Discussions: 5,
    Grades: 4,
    Authoring: 6,
  };
  return data;
}
