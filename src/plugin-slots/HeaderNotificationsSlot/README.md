# Header Notifications Slot

### Slot ID: `org.openedx.frontend.layout.header_notifications_tray.v1`

### Slot ID Aliases
* `header_notifications_tray`

## Description

This slot renders the notifications tray (bell icon + notification popover) from `@edx/frontend-plugin-notifications` by default.

**Important:** This slot is **not used standalone** in headers. Instead, it is embedded within the default content of three parent slots:

1. **Desktop Header** — via `org.openedx.frontend.layout.header_desktop_secondary_menu.v1`
   Notifications appear before secondary menu items (e.g., "New", "Help")

2. **Learning Header** — via `org.openedx.frontend.layout.learning_header_actions.v1`
Notifications are **enabled by default** for authenticated users in all three headers. The `NotificationsTray` component is self-gating: it renders nothing when the backend waffle flag `DISABLE_NOTIFICATIONS` is enabled.

### Mobile Headers

Mobile header support for LMS (non-Learning) is **not included** in this implementation. Adding notifications to the mobile header requires design/product review due to limited viewport space. This will be addressed in a future PR.

## Slot Hierarchy

```
Desktop Header
└── org.openedx.frontend.layout.header_desktop_secondary_menu.v1
    ├── org.openedx.frontend.layout.header_notifications_tray.v1 ← This slot
    └── (secondary menu items)

Learning Header
└── org.openedx.frontend.layout.learning_header_actions.v1
    ├── org.openedx.frontend.layout.header_notifications_tray.v1 ← This slot
    └── org.openedx.frontend.layout.header_learning_help.v1

Studio Header
└── org.openedx.frontend.layout.studio_header_actions.v1
    ├── org.openedx.frontend.layout.header_notifications_tray.v1 ← This slot
    └── org.openedx.frontend.layout.studio_header_search_button_slot.v1
```

## Examples

### Disable Notifications Globally (All Headers)

The following `env.config.jsx` will hide the notifications tray across all headers:

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_notifications_tray.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
      ]
    },
  },
}

export default config;
```

### Disable Notifications in Desktop Header Only

The following `env.config.jsx` will hide notifications only in the Desktop header:

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_desktop_secondary_menu.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'header_notifications_tray',
        },
      ]
    },
  },
}

export default config;
```

### Disable Notifications in Learning Header Only

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.learning_header_actions.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'header_notifications_tray',
        },
      ]
    },
  },
}

export default config;
```

### Disable Notifications in Studio Header Only

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.studio_header_actions.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'header_notifications_tray',
        },
      ]
    },
  },
}

export default config;
```

### Replace Notifications with Custom Component (All Headers)

The following `env.config.jsx` will replace the default notifications tray with a custom component across all headers:

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import CustomNotifications from './CustomNotifications';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_notifications_tray.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_notifications_component',
            type: DIRECT_PLUGIN,
            RenderWidget: CustomNotifications,
          },
        },
      ]
    },
  },
}

export default config;
```

### Add Custom Alert Icon Before Notifications (All Headers)

The following `env.config.jsx` will insert a custom alert icon before the notifications bell:

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_notifications_tray.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_alert_icon',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: () => (
              <button aria-label="Alerts">🚨</button>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```

## Backend Waffle Flag

The `NotificationsTray` component respects the backend waffle flag `DISABLE_NOTIFICATIONS`. When this flag is enabled, the notification bell will not render regardless of frontend configuration.

**Backend PR:** [openedx/openedx-platform#38073](https://github.com/openedx/openedx-platform/pull/38073)

## Migration from tutor-contrib-platform-notifications

Sites currently using `tutor-contrib-platform-notifications` can remove these plugin configurations after upgrading to this version:

- `org.openedx.frontend.layout.header_desktop_secondary_menu.v1` (notifications insertion)
- `org.openedx.frontend.layout.studio_header_search_button_slot.v1` (notifications insertion)
- `org.openedx.frontend.layout.header_learning_help.v1` (notifications insertion)

Notifications will work out-of-the-box without any plugin configuration. If you want to disable them, follow the examples above.
