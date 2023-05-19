/* eslint-disable import/prefer-default-export */
// import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

export const getApiBaseUrl = () => getConfig().LMS_BASE_URL;

export async function getNotifications(notificationType) {
  // const url = `${getApiBaseUrl()}/api/discussion/v1/notifications/`;

  // const { data } = await getAuthenticatedHttpClient()
  //   .get(url);

  const data = {
    discussions: {
      TODAY: [
        {
          type: 'post',
          respondingUser: 'SCM_Lead',
          notificationContent: 'Hello and welcome to SC0x!',
          targetUser: '',
          courseName: 'Supply Chain Analytics',
          URL: '',
          status: 'unread',
          time: '15m',
        },
        {
          type: 'help',
          respondingUser: 'MITx_Learner',
          notificationContent: 'What grade does a student need to get in order to pass the course and earn a certificate?',
          targetUser: '',
          courseName: 'Supply Chain Analytics',
          URL: '',
          status: 'unread',
          time: '15m',
        },
      ],
    },
    reminders: {
      TODAY: [
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
      ],
      EARLIER: [
        {
          type: 'answer',
          respondingUser: 'SCM_Lead',
          notificationContent: 'Quiz in section 3 - Please explain the F-Significance value',
          targetUser: '',
          courseName: 'Supply Chain Analytics',
          URL: '',
          status: 'unread',
          time: '15m',
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
          time: '15m',
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
          time: '15m',
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
          time: '15m',
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
          time: '15m',
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
          time: '15m',
          author: '',
        },
      ],
    },
  };
  return data[notificationType];
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
