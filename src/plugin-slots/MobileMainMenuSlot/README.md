# Mobile Main Menu Slot

### Slot ID: `org.openedx.frontend.layout.header_mobile_main_menu.v1`

### Slot ID Aliases
* `mobile_main_menu_slot`

## Description

This slot is used to replace/modify/hide the mobile main menu.

## Examples

### Modify Items

#### Replace All Items

The following `env.config.jsx` will replace all items in the mobile main menu.

![Screenshot of modified items](./images/mobile_main_menu_replace_all_items.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifyMainMenu = ( widget ) => {
  widget.content.menu = [
    {
      type: 'item',
      href: 'https://openedx.org/',
      content: 'openedx.org',
    },
    {
      type: 'item',
      href: 'https://docs.openedx.org/en/latest/',
      content: 'Documentation',
    },
    {
      type: 'item',
      href: 'https://discuss.openedx.org/',
      content: 'Forums',
    }
  ];
  return widget;
};

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_mobile_main_menu.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifyMainMenu,
        },
      ]
    },
  },
}

export default config;
```

#### Add Items

The following `env.config.jsx` will add items in the mobile main menu.

![Screenshot of custom marketing links](./images/mobile_main_menu_add_items.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifyMainMenu = (widget) => {
  const existingMenu = widget.RenderWidget.props.menu || [];

  const newMarketingLinks = [
    {
      type: 'item',
      href: 'https://example.com/how-it-works',
      content: 'How it works',
    },
    {
      type: 'item',
      href: 'https://example.com/courses',
      content: 'Courses',
    },
    {
      type: 'item',
      href: 'https://example.com/schools',
      content: 'Schools',
    }
  ];

  widget.content.menu = [...existingMenu, ...newMarketingLinks];
  return widget;
};

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_mobile_main_menu.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifyMainMenu,
        },
      ]
    },
  },
}

export default config;
```

### Replace Menu with Custom Component

The following `env.config.jsx` will replace the mobile main menu entirely (in this case with a centered 🗺️ `h1`)

![Screenshot of custom component](./images/mobile_main_menu_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_mobile_main_menu.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_main_menu_component',
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

The following `env.config.jsx` will place custom components before and after the mobile main menu  (in this case centered `h1`s with 🌞 and 🌚).

![Screenshot of custom components before and after](./images/mobile_main_menu_custom_components_before_after.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_mobile_main_menu.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_before_main_menu_component',
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
            id: 'custom_after_main_menu_component',
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
