# Desktop Secondary Menu Slot

### Slot ID: `org.openedx.frontend.layout.header_desktop_secondary_menu.v1`

### Slot ID Aliases
* `desktop_secondary_menu_slot`

## Description

This slot is used to replace/modify/hide the desktop secondary menu.

**Default Content:**
- **Notification Tray** (via `HeaderNotificationsSlot`) — Rendered before menu items
- **Secondary Menu Items** — Links like "New", "Help", etc.

### Why Include Notifications Here?

The `org.openedx.frontend.layout.header_notifications_tray.v1` slot is rendered in **multiple headers** (Desktop, Learning, and Studio). Modifying that slot directly would impact notifications across all header types.

By embedding notifications in this slot's default content, operators can:
- **Hide notifications in Desktop header only** — without affecting Learning or Studio headers
- **Customize the entire secondary menu area** — including both notifications and menu items
- **Maintain control** — each header type can be configured independently

To hide notifications in the Desktop header only, use `PLUGIN_OPERATIONS.Hide` with `widgetId: 'org.openedx.frontend.layout.header_notifications_tray.v1'` (see examples below).

## Examples

### Hide Notifications in Desktop Header Only

The following `env.config.jsx` will hide the notification bell in the Desktop header while keeping it in Learning and Studio headers:

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_desktop_secondary_menu.v1': {
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

### Modify Items

The following `env.config.jsx` will modify the items in the desktop secondary menu.

![Screenshot of modified items](./images/desktop_secondary_menu_modify_items.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifySecondaryMenu = ( widget ) => {
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
    }
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
      ]
    },
  },
}

export default config;
```

### Replace Menu with Custom Component

The following `env.config.jsx` will replace the desktop secondary menu entirely (in this case with a centered 🗺️ `h1`)

![Screenshot of custom component](./images/desktop_secondary_menu_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_desktop_secondary_menu.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_secondary_menu_component',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🗺️</h1>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```

### Add Custom Components before and after Menu

The following `env.config.jsx` will place custom components before and after the desktop secondary menu  (in this case centered `h1`s with 🌜 and 🌛).

![Screenshot of custom components before and after](./images/desktop_secondary_menu_custom_components_before_after.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_desktop_secondary_menu.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_before_secondary_menu_component',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🌜</h1>
            ),
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_after_secondary_menu_component',
            type: DIRECT_PLUGIN,
            priority: 90,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🌛</h1>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```

