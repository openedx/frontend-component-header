import { Factory } from 'rosie';

Factory.define('notificationsCount')
  .attr('count', 45)
  .attr('countByAppName', {
    reminders: 10,
    discussion: 20,
    grades: 10,
    authoring: 5,
  })
  .attr('showNotificationsTray', true);

Factory.define('notification')
  .sequence('id')
  .attr('type', 'post')
  .sequence('content', ['id'], (idx, notificationId) => `<p><strong>User ${idx}</strong> posts <strong>Hello and welcome to SC0x
  ${notificationId}!</strong></p>`)
  .attr('course_name', 'Supply Chain Analytics')
  .sequence('content_url', (idx) => `https://example.com/${idx}`)
  .attr('last_read', null)
  .attr('last_seen', null)
  .sequence('created_at', ['createdDate'], (idx, date) => date);

Factory.define('notificationsList')
  .attr('next', null)
  .attr('previous', null)
  .attr('count', null, 2)
  .attr('num_pages', null, 1)
  .attr('current_page', null, 1)
  .attr('start', null, 0)
  .attr('results', ['results'], (results) => results || Factory.buildList('notification', 2, null, { createdDate: new Date().toISOString() }));
