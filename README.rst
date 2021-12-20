#########################
frontend-component-header
#########################

|Build Status| |Codecov| |npm_version| |npm_downloads| |license| |semantic-release|

********
Overview
********

A generic header for Open edX micro-frontend applications.

************
Requirements
************

This component uses ``@edx/frontend-platform`` services such as i18n, analytics, configuration, and the ``AppContext`` React component, and expects that it has been loaded into a micro-frontend that has been properly initialized via ``@edx/frontend-platform``'s ``initialize`` function. `Please visit the frontend template application to see an example. <https://github.com/edx/frontend-template-application/blob/master/src/index.jsx>`_

Environment Variables
=====================

* ``LMS_BASE_URL`` - The URL of the LMS of your Open edX instance.
* ``LOGOUT_URL`` - The URL of the API endpoint which performs a user logout.
* ``LOGIN_URL`` - The URL of the login page where a user can sign into their account.
* ``SITE_NAME`` - The user-facing name of the site, used as `alt` text on the logo in the header.
  Defaults to "localhost" in development.
* ``LOGO_URL`` - The URL of the site's logo.  This logo is displayed in the header.
* ``ORDER_HISTORY_URL`` - The URL of the order history page.
* ``AUTHN_MINIMAL_HEADER`` - A boolean flag which hides the main menu, user menu, and logged-out
  menu items when truthy.  This is intended to be used in micro-frontends like
  frontend-app-authentication in which these menus are considered distractions from the user's task.

************
Installation
************

To install this header into your Open edX micro-frontend, run the following command in your MFE:

``npm i --save @edx/frontend-component-header``

This will make the component available to be imported into your application.

*****
Usage
*****

This library has the following exports:

* ``(default)``: The header as a React component.
* ``messages``: Internationalization messages suitable for use with `@edx/frontend-platform/i18n <https://edx.github.io/frontend-platform/module-Internationalization.html>`_
* ``dist/index.scss``: A SASS file which contains style information for the component.  It should be imported into the micro-frontend's own SCSS file.

Examples
========

* `An example of component and messages usage. <https://github.com/edx/frontend-template-application/blob/3355bb3a96232390e9056f35b06ffa8f105ed7ca/src/index.jsx#L21>`_
* `An example of SCSS file usage. <https://github.com/edx/frontend-template-application/blob/3cd5485bf387b8c479baf6b02bf59e3061dc3465/src/index.scss#L8>`_


***********
Development
***********

Install dependencies::

  npm i

Start the development server::

  npm start

Build a production distribution::

  npm run build

.. |Build Status| image:: https://api.travis-ci.com/edx/frontend-component-header.svg?branch=master
   :target: https://travis-ci.com/edx/frontend-component-header
.. |Codecov| image:: https://img.shields.io/codecov/c/github/edx/frontend-component-header
   :target: @edx/frontend-component-header
.. |npm_version| image:: https://img.shields.io/npm/v/@edx/frontend-component-header.svg
   :target: @edx/frontend-component-header
.. |npm_downloads| image:: https://img.shields.io/npm/dt/@edx/frontend-component-header.svg
   :target: @edx/frontend-component-header
.. |license| image:: https://img.shields.io/npm/l/@edx/frontend-component-header.svg
   :target: @edx/frontend-component-header
.. |semantic-release| image:: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
   :target: https://github.com/semantic-release/semantic-release
