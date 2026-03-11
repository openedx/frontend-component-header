# Learning Header Actions Slot

### Slot ID: `org.openedx.frontend.layout.learning_header_actions.v1`

### Slot ID Aliases
* `learning_header_actions_slot`

## Description

This slot wraps the notification tray and help link in the Learning header. It provides a single location for operators to customize the action area before the user menu in the Learning (course) header.

By default, this slot renders:
1. **HeaderNotificationsSlot** — The notification bell from `@edx/frontend-plugin-notifications`
2. **LearningHelpSlot** — The help link (question mark icon)

This wrapper slot ensures that:
- Notifications are enabled by default in the Learning header
- Operators can customize the entire action area using one slot ID
- The existing `org.openedx.frontend.layout.header_learning_help.v1` remains functional for backward compatibility

## Examples

### Disable Notifications in Learning Header Only

The following `env.config.jsx` will hide the notification bell in the Learning header while keeping it in Desktop and Studio headers:

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

### Replace the Entire Actions Area

The following `env.config.jsx` will replace both notifications and help link with a custom component:

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.learning_header_actions.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_learning_actions',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <div>
                <button>Custom Action 1</button>
                <button>Custom Action 2</button>
              </div>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```

### Modify Help Link Only

To customize just the help link while keeping notifications, use the nested slot:

```jsx
const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_learning_help.v1': {
      // Your help link customization
    },
  },
}

export default config;
```

## Slot Hierarchy

This slot contains two child slots:
- `org.openedx.frontend.layout.header_notifications_tray.v1` (HeaderNotificationsSlot)
- `org.openedx.frontend.layout.header_learning_help.v1` (LearningHelpSlot)

Operators can customize at either the parent level (this slot) or the child level for more granular control.
