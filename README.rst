#########################
frontend-component-header
#########################

|license| |Build Status| |Codecov| |npm_version| |npm_downloads| |semantic-release|

********
Purpose
********

A generic header for Open edX micro-frontend applications.

************
Getting Started
************

Prerequisites
=============

The `devstack`_ is currently recommended as a development environment for your
new MFE.  If you start it with ``make dev.up.lms`` that should give you
everything you need as a companion to this frontend.

Note that it is also possible to use `Tutor`_ to develop an MFE.  You can refer
to the `relevant tutor-mfe documentation`_ to get started using it.

.. _Devstack: https://github.com/openedx/devstack

.. _Tutor: https://github.com/overhangio/tutor

.. _relevant tutor-mfe documentation: https://github.com/overhangio/tutor-mfe#mfe-development

Requirements
============

This component uses ``@edx/frontend-platform`` services such as i18n, analytics, configuration, and the ``AppContext`` React component, and expects that it has been loaded into a micro-frontend that has been properly initialized via ``@edx/frontend-platform``'s ``initialize`` function. `Please visit the frontend template application to see an example. <https://github.com/openedx/frontend-template-application/blob/master/src/index.jsx>`_


Environment Variables
====================

* ``LMS_BASE_URL`` - The URL of the LMS of your Open edX instance.
* ``LOGOUT_URL`` - The URL of the API endpoint which performs a user logout.
* ``LOGIN_URL`` - The URL of the login page where a user can sign into their account.
* ``SITE_NAME`` - The user-facing name of the site, used as `alt` text on the logo in the header.
  Defaults to "localhost" in development.
* ``LOGO_URL`` - The URL of the site's logo.  This logo is displayed in the header.
* ``ORDER_HISTORY_URL`` - The URL of the order history page.
* ``ACCOUNT_PROFILE_URL`` - The URL of the account profile page.
* ``ACCOUNT_SETTINGS_URL`` - The URL of the account settings page.
* ``AUTHN_MINIMAL_HEADER`` - A boolean flag which hides the main menu, user menu, and logged-out
  menu items when truthy.  This is intended to be used in micro-frontends like
  frontend-app-authentication in which these menus are considered distractions from the user's task.

Installation
============

To install this header into your Open edX micro-frontend, run the following command in your MFE:

``npm i --save @edx/frontend-component-header``

This will make the component available to be imported into your application.

Cloning and Startup
===================

.. code-block::


  1. Clone your new repo:

    ``git clone https://github.com/openedx/frontend-component-header.git``

  2. Use node v18.x.

    The current version of the micro-frontend build scripts support node 18.
    Using other major versions of node *may* work, but this is unsupported.  For
    convenience, this repository includes an .nvmrc file to help in setting the
    correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.

  3. Install npm dependencies:

    ``cd frontend-component-header && npm ci``

  4. Start the dev server:

    ``npm start``

Usage
=====

This library has the following exports:

* ``(default)``: The header as a React component.
* ``messages``: Internationalization messages suitable for use with `@edx/frontend-platform/i18n <https://edx.github.io/frontend-platform/module-Internationalization.html>`_
* ``dist/index.scss``: A SASS file which contains style information for the component.  It should be imported into the micro-frontend's own SCSS file.

Plugins
-------
This can be customized using `Frontend Plugin Framework <https://github.com/openedx/frontend-plugin-framework>`_.

The parts of this that can be customized in that manner are documented `here </src/plugin-slots>`_.

Examples
========

* `An example of component and messages usage. <https://github.com/openedx/frontend-template-application/blob/3355bb3a96232390e9056f35b06ffa8f105ed7ca/src/index.jsx#L21>`_
* `An example of SCSS file usage. <https://github.com/openedx/frontend-template-application/blob/3cd5485bf387b8c479baf6b02bf59e3061dc3465/src/index.scss#L8>`_

Development
===========

Install dependencies::

  npm ci

Start the development server::

  npm start

Build a production distribution::

  npm run build

License
=======

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

Contributing
============

Contributions are very welcome.  Please read `How To Contribute`_ for details.

.. _How To Contribute: https://openedx.org/r/how-to-contribute

This project is currently accepting all types of contributions, bug fixes,
security fixes, maintenance work, or new features.  However, please make sure
to have a discussion about your new feature idea with the maintainers prior to
beginning development to maximize the chances of your change being accepted.
You can start a conversation by creating a new issue on this repo summarizing
your idea.

Getting Help
===========

If you're having trouble, we have discussion forums at
https://discuss.openedx.org where you can connect with others in the community.

Our real-time conversations are on Slack. You can request a `Slack
invitation`_, then join our `community Slack workspace`_.  Because this is a
frontend repository, the best place to discuss it would be in the `#wg-frontend
channel`_.

For anything non-trivial, the best path is to open an issue in this repository
with as many details about the issue you are facing as you can provide.

https://github.com/openedx/frontend-component-header/issues

For more information about these options, see the `Getting Help`_ page.

.. _Slack invitation: https://openedx.org/slack
.. _community Slack workspace: https://openedx.slack.com/
.. _#wg-frontend channel: https://openedx.slack.com/archives/C04BM6YC7A6
.. _Getting Help: https://openedx.org/community/connect

The Open edX Code of Conduct
============================

All community members are expected to follow the `Open edX Code of Conduct`_.

.. _Open edX Code of Conduct: https://openedx.org/code-of-conduct/

Reporting Security Issues
=========================

Please do not report security issues in public. Please email security@openedx.org.

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