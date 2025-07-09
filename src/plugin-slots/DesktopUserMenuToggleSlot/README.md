# Desktop User Menu Toggle Slot

### Slot ID: `org.openedx.frontend.layout.header_desktop_user_menu_toggle.v1`

## Description

This slot is used to replace/modify/hide the contents of the user menu toggle button on desktop sized screens.

## Examples

### Modify Label Text

The following `env.config.jsx` will modify the label text to be something more generic:

![Screenshot of modified label](./images/desktop_user_menu_modified_toggle.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const modifyUserMenuToggle = ( widget ) => {
  widget.content.label = "My Profile";
  return widget;
};

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_desktop_user_menu_toggle.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifyUserMenuToggle,
        },
      ]
    },
  },
}

export default config;
```

### Replace Menu toggle contents with Custom Component

The following `env.config.jsx` will replace the contents of the learning user menu toggle button entirely (in this case with an emoji)

![Screenshot of replaced with custom component](./images/desktop_user_menu_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_desktop_user_menu_toggle.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_desktop_user_menu_toggle',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <span>🦊</span>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```
