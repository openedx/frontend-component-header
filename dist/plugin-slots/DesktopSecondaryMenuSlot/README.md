# Desktop Secondary Menu Slot

### Slot ID: `desktop_secondary_menu_slot`

## Description

This slot is used to replace/modify/hide the desktop secondary menu.

## Examples

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
    desktop_secondary_menu_slot: {
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
    desktop_secondary_menu_slot: {
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
    desktop_secondary_menu_slot: {
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

