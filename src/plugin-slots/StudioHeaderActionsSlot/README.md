# Studio Header Actions Slot

### Slot ID: `org.openedx.frontend.layout.studio_header_actions.v1`

## Description

This slot wraps the notification tray and search button in the Studio header (both desktop and mobile). It provides a single location for operators to customize the action area before the user menu in Studio.

By default, this slot renders:
1. **HeaderNotificationsSlot** — The notification bell from `@edx/frontend-plugin-notifications`
2. **StudioHeaderSearchButtonSlot** — The search button slot

This wrapper slot ensures that:
- Notifications are enabled by default in Studio
- Operators can customize the entire action area using one slot ID
- The existing `org.openedx.frontend.layout.studio_header_search_button_slot.v1` remains functional for backward compatibility

## Why This Wrapper Slot?

The `org.openedx.frontend.layout.header_notifications_tray.v1` slot is rendered in **multiple headers** (Desktop, Learning, and Studio). Modifying that slot directly would impact notifications across all header types.

This wrapper slot allows operators to:
- **Hide notifications in Studio only** — without affecting Desktop or Learning headers
- **Customize the action area** — replace or extend both notifications and search button together
- **Maintain control** — each header type can be configured independently

## Examples

### Disable Notifications in Studio Only

The following `env.config.jsx` will hide the notification bell in Studio while keeping it in other headers:

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.studio_header_actions.v1': {
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

The following `env.config.jsx` will replace both notifications and search with a custom component:

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.studio_header_actions.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_studio_actions',
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

### Modify Search Button Only

To customize just the search button while keeping notifications, see the [StudioHeaderSearchButtonSlot documentation](../StudioHeaderSearchButtonSlot/).

## Slot Hierarchy

This slot contains two child slots:
- `org.openedx.frontend.layout.header_notifications_tray.v1` (HeaderNotificationsSlot)
- `org.openedx.frontend.layout.studio_header_search_button_slot.v1` (StudioHeaderSearchButtonSlot)
