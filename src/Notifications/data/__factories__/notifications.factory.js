import { Factory } from 'rosie';

Factory.define('notificationsCount')
  .attr('count', 45)
  .attr('countByAppName', {
    reminders: 10,
    discussions: 20,
    grades: 10,
    authoring: 5,
  })
  .attr('showNotificationTray', true);

Factory.define('notification')
  .sequence('id')
  .attr('type', 'post')
  .sequence('content', ['id'], (idx, notificationId) => `<p><b>User ${idx}</b> posts <b>Hello and welcome to SC0x
  ${notificationId}!</b></p>`)
  .attr('course_name', 'Supply Chain Analytics')
  .sequence('content_url', (idx) => `https://example.com/${idx}`)
  .attr('last_read', null)
  .attr('last_seen', null)
  .sequence('created_at', ['createdDate'], (idx, date) => date);
