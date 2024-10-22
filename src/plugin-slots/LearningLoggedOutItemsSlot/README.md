# Learning Logged Out Items Slot

### Slot ID: `learning_logged_out_items_slot`

## Description

This slot is used to replace/modify/hide the items shown on the learning header when the user is logged out.

## Examples

### Modify Items

The following `env.config.jsx` will modify the items shown on the learning header when the user is logged out.

![Screenshot of modified items](./images/learning_logged_out_items_modified_items.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifyLoggedOutItems = ( widget ) => {
  widget.content.buttonsInfo = [
    {
      href: 'https://docs.openedx.org/en/latest/',
      message: 'Documentation',
    },
    {
      href: 'https://discuss.openedx.org/',
      message: 'Forums',
    },
    {
      href: 'https://openedx.org/',
      message: 'openedx.org',
      variant: 'primary',
    },
  ];
  return widget;
};

const config = {
  pluginSlots: {
    learning_logged_out_items_slot: {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifyLoggedOutItems,
        },
      ]
    },
  },
}

export default config;
```

### Replace with Custom Component

The following `env.config.jsx` will replace the items shown in the learning header when the user is logged out entirely (in this case with a centered 🗺️ `h1`)

![Screenshot of replaced with custom component](./images/learning_logged_out_items_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    learning_logged_out_items_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_logged_out_items_component',
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

### Add Custom Components before and after

The following `env.config.jsx` will place custom components before and after the items shown in the learning header when the user is logged out (in this case centered `h1`s with 🌜 and 🌛).

![Screenshot of added custom components before and after](./images/learning_logged_out_items_custom_components_before_after.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    learning_logged_out_items_slot: {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_before_logged_out_items_component',
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
            id: 'custom_after_logged_out_items_component',
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

