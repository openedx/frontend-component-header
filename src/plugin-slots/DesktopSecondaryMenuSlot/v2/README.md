# Desktop Secondary Menu Slot — v2 (Full Secondary Menu Area)

### Slot ID: `org.openedx.frontend.layout.header_desktop_secondary_menu.v2`

**Default Content:**
- **Notification Tray** (via `HeaderNotificationsSlot`) — Rendered before the secondary menu
- **Secondary Menu** (via `DesktopSecondaryMenuSlotV1`)

> To customize the secondary menu items (modify links, replace, add before/after), see the [v1 docs](../v1/).

---

## Examples

### Add Custom Components before and after Notifications Tray

The following `env.config.jsx` places custom components before and after the notifications tray. Components with `priority < 50` appear before the default content; `priority > 50` appear after.

![Screenshot of custom components before and after notifications tray](../images/add_custom_components_before_and_after_notifications_tray.png)

```jsx
import React from 'react';
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
              <h1 style={{ textAlign: 'center' }}>🌜</h1>
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

#### Hide Notifications Tray

The following `env.config.jsx` hides the notification tray across all headers (Desktop, Learning, and Studio).
![Screenshot of hide Notifications Tray](../images/hide_notifications_tray.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

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

The following `env.config.jsx` replaces the notification tray with a custom component.
![Screenshot of replacing Notifications Tray with Custom Component](../images/replace_notifications_tray_with_custom_component.png)

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

### Modify notification tray and Secondary Menu Items

The following `env.config.jsx` replaces the secondary menu links with custom ones.
![Screenshot of modified Notifications Tray and Menu Items](../images/modify_notifications_tray_and_menu_items.png)

```jsx
import React from 'react';
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifySecondaryMenu = (widget) => {
  widget.content.menu = [
    {
      type: 'item',
      href: 'https://www.youtube.com/c/openedx',
      content: 'Open edX on YouTube',
    },
    {
      type: 'item',
      href: 'https://github.com/openedx/',
      content: 'Open edX on GitHub',
    },
  ];
  return widget;
};

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_desktop_secondary_menu.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifySecondaryMenu,
        },
      ],
    },
   'org.openedx.frontend.layout.header_notifications_tray.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: (widget) => {
            widget.RenderWidget = <span>🔔 Custom Notification</span>;
            return widget;
          },
        },
      ],
    },
  },
};

export default config;
```
