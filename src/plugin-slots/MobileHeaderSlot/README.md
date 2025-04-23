# Mobile Header Slot

### Slot ID: `org.openedx.frontend.layout.header_mobile.v1`

### Slot ID Aliases
* `mobile_header_slot`

## Description

This slot is used to replace/modify/hide the entire mobile header.

## Examples

### Custom Component

The following `env.config.jsx` will replace the mobile header entirely (in this case with a centered 🗺️ `h1`)

![Screenshot of custom component](./images/mobile_header_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_mobile.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_mobile_header_component',
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