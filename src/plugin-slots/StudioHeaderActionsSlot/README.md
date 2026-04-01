# Studio Header Actions Slot

## Slots

| Slot ID | Description |
|---------|-------------|
| `org.openedx.frontend.layout.studio_header_actions.v2` | Full actions area: notification tray + search button |
| `org.openedx.frontend.layout.studio_header_actions.v1` | Search button only (no notifications) |

---

## `v2` — Full Actions Area

### Slot ID: `org.openedx.frontend.layout.studio_header_actions.v2`

**Default Content:**
- **Notification Tray** (via `HeaderNotificationsSlot`) — Rendered before the search button
- **`StudioHeaderActionsSlotV1`** — Wraps the search button

---

## `v1` — Search Button Only

### Slot ID: `org.openedx.frontend.layout.studio_header_actions.v1`

**Default Content:**
- **StudioHeaderSearchButtonSlot** — The search button (magnifier icon)

---

## Examples

### Hide Notifications Tray

The following `env.config.jsx` hides the notification tray across.
![Screenshot of Hiding Notifications Tray](./images/hide_notifications_tray.png)

```jsx
const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_notifications_tray.v1': {
      keepDefault: false,
      plugins: [],
    },
  },
};

export default config;
```

### Replace Notifications Tray with Custom Component
![Screenshot of Replacing Notifications Tray with Custom Component](./images/replace_notifications_tray_with_custom_component.png)

```jsx
import React from 'react';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

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
            priority: 50,
            RenderWidget: () => (
              <span>🔔 My Custom Notifications</span>
            ),
          },
        },
      ],
    },
  },
};

export default config;
```

### Replace Search Button with Custom Component
![Screenshot of Replacing Search Button with Custom Component](./images/search_button_with_custom_component.png)


To customize just the search button, target `v1` (or `studio_header_search_button_slot.v1` directly):

```jsx
import React from 'react';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.studio_header_actions.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_search_component',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: () => (
              <button type="button">🔍 Custom Search</button>
            ),
          },
        },
      ],
    },
  },
};

export default config;
```

### Add Custom Components before and after Search Button

Components with `priority < 50` appear before the default content; `priority > 50` appear after:
![Screenshot of Adding Custom Components before and after Search Button](./images/custom_components_before_and_after_search_button.png)

```jsx
import React from 'react';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.studio_header_actions.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_before_search_component',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: () => (
              <h1 style={{ textAlign: 'center' }}>🌜</h1>
            ),
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_after_search_component',
            type: DIRECT_PLUGIN,
            priority: 90,
            RenderWidget: () => (
              <h1 style={{ textAlign: 'center' }}>🌛</h1>
            ),
          },
        },
      ],
    },
  },
};

export default config;
```

