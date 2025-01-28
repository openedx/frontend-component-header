# Learning User Menu Slot

### Slot ID: `learning_user_menu_slot`

## Description

This slot is used to replace/modify/hide the learning user menu.

## Examples

### Modify Items

The following `env.config.jsx` will modify the items in the learning user menu.

![Screenshot of modified items](./images/learning_user_menu_modified_items.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifyUserMenu = ( widget ) => {
  widget.content.items = [
    {
      href: 'https://openedx.org/',
      message: 'openedx.org',
    },
    {
      href: 'https://docs.openedx.org/en/latest/',
      message: 'Documentation',
    },
    {
      href: 'https://discuss.openedx.org/',
      message: 'Forums',
    }
  ];
  return widget;
};

const config = {
  pluginSlots: {
    learning_user_menu_slot: {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifyUserMenu,
        },
      ]
    },
  },
}

export default config;
```

### Replace Menu with Custom Component

The following `env.config.jsx` will replace the items in the learning user menu entirely (in this case with a centered 🗺️ `h1`)

![Screenshot of replaced with custom component](./images/learning_user_menu_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    learning_user_menu_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_user_menu_component',
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

The following `env.config.jsx` will place custom components before and after the learning user menu (in this case centered `h1`s with 🌞 and 🌚).

![Screenshot of custom components before and after](./images/learning_user_menu_custom_components_before_after.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    learning_user_menu_slot: {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_before_user_menu_component',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🌞</h1>
            ),
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_after_user_menu_component',
            type: DIRECT_PLUGIN,
            priority: 90,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🌚</h1>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```
