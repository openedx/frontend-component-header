# Desktop Header Slot

### Slot ID: `desktop_header_slot`

## Description

This slot is used to replace/modify/hide the entire desktop header.

## Examples

### Custom Component

The following `env.config.jsx` will replace the desktop header entirely (in this case with a centered 🗺️ `h1`)

![Screenshot of custom component](./images/desktop_header_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    desktop_header_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_desktop_header_component',
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