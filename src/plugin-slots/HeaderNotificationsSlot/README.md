# Header Notifications Slot

### Slot ID: `org.openedx.frontend.layout.header_notifications_tray.v1`

### Slot ID Aliases
* `header_notifications_tray`

## Description

This slot renders the notifications tray (bell icon + notification popover) from `@edx/frontend-plugin-notifications` by default. It is present in **all header types** for authenticated users:

- **Desktop Header** — before the secondary menu, to the left of menu items and user dropdown
- **Mobile Header** — before the user menu trigger (avatar)
- **Learning Header** — before the help link, to the left of help and user dropdown
- **Studio Header** — before the search button, to the left of search and user menu (both desktop and mobile)

Notifications are **enabled by default** for all community instances. The `NotificationsTray` component is self-gating: it renders nothing when the backend waffle flag is disabled.

## Examples

### Disable Notifications

The following `env.config.jsx` will hide the notifications tray entirely.

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

### Replace Notifications with Custom Component

The following `env.config.jsx` will replace the default notifications tray with a custom component.

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

### Add Custom Components before and after Notifications

The following `env.config.jsx` will place custom components before and after the notifications tray.

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
            id: 'custom_before_notifications_component',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: () => (
              <span>📢</span>
            ),
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_after_notifications_component',
            type: DIRECT_PLUGIN,
            priority: 90,
            RenderWidget: () => (
              <span>💬</span>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```
