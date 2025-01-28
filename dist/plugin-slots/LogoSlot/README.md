# Logo Slot

### Slot ID: `logo_slot`

## Description

This slot is used to replace/modify/hide the logo.

## Examples

### Modify URL

The following `env.config.jsx` will modify the link href for the logo.

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifyLogoHref = ( widget ) => {
  widget.content.href = "https://openedx.org/";
  return widget;
};

const config = {
  pluginSlots: {
    logo_slot: {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifyLogoHref,
        },
      ]
    },
  },
}

export default config;
```

### Custom Component

The following `env.config.jsx` will replace the logo entirely (in this case with a centered 🗺️ `h1`)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    logo_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_logo_component',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🗺️</h1>
            ),
          },
        },
      ]
    }
  },
}

export default config;
```