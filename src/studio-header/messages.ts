import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'header.user.menu.studio': {
    id: 'header.user.menu.studio',
    defaultMessage: 'Studio Home',
    description: 'Link to Studio Home',
  },
  'header.user.menu.maintenance': {
    id: 'header.user.menu.maintenance',
    defaultMessage: 'Maintenance',
    description: 'Link to the Studio maintenance page',
  },
  'header.user.menu.logout': {
    id: 'header.user.menu.logout',
    defaultMessage: 'Logout',
    description: 'Logout link',
  },
  'header.label.account.menu': {
    id: 'header.label.account.menu',
    defaultMessage: 'Account Menu',
    description: 'The aria label for the account menu trigger',
  },
  'header.label.account.menu.for': {
    id: 'header.label.account.menu.for',
    defaultMessage: 'Account menu for {username}',
    description: 'The aria label for the account menu trigger when the username is displayed in it',
  },
  'header.label.main.nav': {
    id: 'header.label.main.nav',
    defaultMessage: 'Main',
    description: 'The aria label for the main menu nav',
  },
  'header.label.main.menu': {
    id: 'header.label.main.menu',
    defaultMessage: 'Main Menu',
    description: 'The aria label for the main menu trigger',
  },
  'header.label.main.header': {
    id: 'header.label.main.header',
    defaultMessage: 'Main',
    description: 'The aria label for the main header',
  },
  'header.label.secondary.nav': {
    id: 'header.label.secondary.nav',
    defaultMessage: 'Secondary',
    description: 'The aria label for the seconary nav',
  },
  'header.label.courseOutline': {
    id: 'header.label.courseOutline',
    defaultMessage: 'Back to course outline in Studio',
    description: 'The aria label for the link back to the Studio Course Outline',
  },
  'header.label.search.nav': {
    id: 'header.label.search.nav',
    defaultMessage: 'Search content',
    description: 'The aria label for the search content button nav',
  },
});

export default messages;
