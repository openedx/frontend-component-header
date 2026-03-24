# Header Notifications Slot

### Slot ID: `org.openedx.frontend.layout.header_notifications_tray.v1`

## Description

This slot renders the notifications tray (bell icon + notification popover) from `@edx/frontend-plugin-notifications` by default.

**Important:** This slot is **not used standalone** in headers. Instead, it is embedded within the default content of three parent slots:

1. **Desktop Header** — via `org.openedx.frontend.layout.header_desktop_secondary_menu.v1`
   Notifications appear before secondary menu items (e.g., "New", "Help")

2. **Learning Header** — via `org.openedx.frontend.layout.learning_header_actions.v1`
   Notifications appear before the help link

3. **Studio Header** — via `org.openedx.frontend.layout.studio_header_actions.v1`
   Notifications appear before the search button

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

### Disable Notifications Per Header

To hide notifications in a specific header only, modify the parent wrapper slot:

- **Desktop Header:** See [DesktopSecondaryMenuSlot documentation](../DesktopSecondaryMenuSlot/)
- **Learning Header:** See [LearningHeaderActionsSlot documentation](../LearningHeaderActionsSlot/)
- **Studio Header:** See [StudioHeaderActionsSlot documentation](../StudioHeaderActionsSlot/)

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
