# Learning Help Slot

### Slot ID: `org.openedx.frontend.layout.header_learning_help.v1`

### Slot ID Aliases
* `learning_help_slot`

## Description

This slot is used to replace/modify/hide the learning help link.

## Examples

### Custom Component

The following `env.config.jsx` will replace the help link entirely (in this case with a centered 🗺️ `h1`)

![Screenshot of replaced learning help with custom component](./images/learning_help_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_learning_help.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_learning_help_component',
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
