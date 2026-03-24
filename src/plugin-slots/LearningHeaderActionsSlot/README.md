# Learning Header Actions Slot

### Slot ID: `org.openedx.frontend.layout.learning_header_actions.v1`

## Description

This slot wraps the notification tray and help link in the Learning header. It provides a single location for operators to customize the action area before the user menu in the Learning (course) header.

By default, this slot renders:
1. **HeaderNotificationsSlot** — The notification bell from `@edx/frontend-plugin-notifications`
2. **LearningHelpSlot** — The help link (question mark icon)

This wrapper slot ensures that:
- Notifications are enabled by default in the Learning header
- Operators can customize the entire action area using one slot ID
- The existing `org.openedx.frontend.layout.header_learning_help.v1` remains functional for backward compatibility

## Why This Wrapper Slot?

The `org.openedx.frontend.layout.header_notifications_tray.v1` slot is rendered in **multiple headers** (Desktop, Learning, and Studio). Modifying that slot directly would impact notifications across all header types.

This wrapper slot allows operators to:
- **Hide notifications in Learning header only** — without affecting Desktop or Studio
- **Customize the action area** — replace or extend both notifications and help link together
- **Maintain control** — each header type can be configured independently

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
          widgetId: 'org.openedx.frontend.layout.header_notifications_tray.v1',
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

To customize just the help link while keeping notifications, see the [LearningHelpSlot documentation](../LearningHelpSlot/).

## Slot Hierarchy

This slot contains two child slots:
- `org.openedx.frontend.layout.header_notifications_tray.v1` (HeaderNotificationsSlot)
- `org.openedx.frontend.layout.header_learning_help.v1` (LearningHelpSlot)
