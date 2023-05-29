import { camelCaseObject } from '@edx/frontend-platform';

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
      responding_user: 'SCM_Lead',
      notification_content: 'Hello and welcome to SC0x!',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_content_url: '',
      is_read: false,
      is_seen: false,
      time: '1685361282018',
    },
    {
      type: 'help',
      responding_user: 'MITx_Learner',
      notification_content: 'What grade does a student need to get in order to pass the course and earn a certificate?',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1685361282018',
    },
    {
      type: 'post',
      responding_user: 'SCM_Lead',
      notification_content: 'Hello and welcome to SC0x!',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1684253634808',
      author: '',
    },
    {
      type: 'help',
      responding_user: 'MITx_Learner',
      notification_content: 'What grade does a student need to get in order to pass the course and earn a certificate?',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1684253736371',
      author: '',
    },
    {
      type: 'respond',
      responding_user: 'MITx_Learner',
      notification_content: 'Can’t find linear regression in section 3 review',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1684253736371',
      author: '',
    },
    {
      type: 'comment',
      responding_user: 'MITx_Learner',
      notification_content: 'Can’t find linear regression in section 3 review',
      target_user: 'MITx_Expert’s ',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1684253736371',
      author: '',
    },
    {
      type: 'question',
      responding_user: 'MITx_Learner',
      notification_content: 'Examples of quadratic equations in supply chains',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1684253736371',
      author: '',
    },
    {
      type: 'comment',
      responding_user: 'MITx_Learner',
      notification_content: 'What grade does a student need to get in order to pass the course and earn a certificate?',
      target_user: 'MITx_Expert’s ',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      time: '1684253736371',
      is_seen: false,
      author: 'testuser',
    },
    {
      type: 'comment',
      responding_user: 'MITx_Learner',
      notification_content: 'Convexity of f(x)=1/x , x>1',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      time: '1684253736371',
      is_seen: false,
      author: 'testuser',
    },
    {
      type: 'answer',
      responding_user: 'SCM_Lead',
      notification_content: 'Quiz in section 3 - Please explain the F-Significance value',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      time: '1685096268835',
      is_seen: false,
      author: 'testuser',
    },
    {
      type: 'endorsed',
      responding_user: '',
      notification_content: 'Quiz in section 3 - Please explain the F-Significance value',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1685096268835',
      author: 'testuser',
    },
    {
      type: 'reported',
      responding_user: 'MITx Learner’s',
      notification_content: '“Here are the exam answers. Question 1 - CSA stands for Compliance Safety Ac...”',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1685212056931',
      author: '',
    },
    {
      type: 'postLiked',
      responding_user: 'SCM_Lead',
      notification_content: 'Retaking the course',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1685212056931',
      author: '',
    },
    {
      type: 'commentLiked',
      responding_user: 'MITx_Expert ',
      notification_content: 'Final exam answers',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1685212056931',
      author: '',
    },
    {
      type: 'edited',
      responding_user: 'MITx_Expert ',
      notification_content: 'Question 1',
      target_user: '',
      course_name: 'Supply Chain Analytics',
      content_url: '',
      is_read: false,
      is_seen: false,
      time: '1685212056931',
      author: '',
    },
  ];

  const { today, earlier } = parseNotificationList(camelCaseObject(notificationData));

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
    count: 25,
    count_by_app_name: {
      reminders: 10,
      discussions: 5,
      grades: 4,
      authoring: 6,
    },
  };
  return camelCaseObject(data);
}
