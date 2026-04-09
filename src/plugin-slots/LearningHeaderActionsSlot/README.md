# Learning Header Actions Slot

### Slot ID: `org.openedx.frontend.layout.learning_header_actions.v1`

**Default Content:**
- **Notification Tray** (via `HeaderNotificationsSlot`) — Rendered before the help link
- **Help Link** (via `LearningHelpSlot`)

---

### Add Custom Components before and after Learning Header Actions

The following `env.config.jsx` inserts a custom component before the notification tray (`priority: 10`) and another after the help link (`priority: 90`).

![Screenshot of custom components before and after learning header actions](./images/custom_components_before_and_after_learning_actions.png)

```jsx
import React from 'react';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.learning_header_actions.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_before_learning_actions',
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
            id: 'custom_after_learning_actions',
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

### Hide the Entire Learning Header Actions Area

The following `env.config.jsx` removes both the notification tray and the help link from the learning header.

![Screenshot of hiding learning header actions area](./images/hide_learning_actions.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.learning_header_actions.v1': {
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

### Replace the Entire Learning Header Actions Area with a Custom Component

The following `env.config.jsx` replaces the notification tray and help link with a single custom component.

![Screenshot of replacing learning header actions area with custom component](./images/replace_learning_actions_with_custom_component.png)

```jsx
import React from 'react';
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
            priority: 50,
            RenderWidget: () => (
              <span>My Custom Learning Actions</span>
            ),
          },
        },
      ],
    },
  },
};

export default config;
```

