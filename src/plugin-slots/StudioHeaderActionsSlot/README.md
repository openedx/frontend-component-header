# Studio Header Actions Slot

### Slot ID: `org.openedx.frontend.layout.studio_header_actions.v1`

**Default Content:**
- **Notification Tray** (via `HeaderNotificationsSlot`) — Rendered before the search button
- **Search Button** (via `StudioHeaderSearchButtonSlot`)

---

### Add Custom Components before and after Studio Header Actions

The following `env.config.jsx` inserts a custom component before the notification tray (`priority: 10`) and another after the search button (`priority: 90`).

![Screenshot of custom components before and after studio header actions](./images/custom_components_before_and_after_studio_actions.png)

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
            id: 'custom_before_studio_actions',
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
            id: 'custom_after_studio_actions',
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

### Hide the Entire Studio Header Actions Area

The following `env.config.jsx` removes both the notification tray and the search button from the studio header.

![Screenshot of hiding studio header actions area](./images/hide_studio_actions.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.studio_header_actions.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
      ],
    },
  },
};

export default config;
```

### Replace the Entire Studio Header Actions Area with a Custom Component

The following `env.config.jsx` replaces the notification tray and search button with a single custom component.

![Screenshot of replacing studio header actions area with custom component](./images/replace_studio_actions_with_custom_component.png)

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
            id: 'custom_studio_actions',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: () => (
              <span>My Custom Studio Actions</span>
            ),
          },
        },
      ],
    },
  },
};

export default config;
```
