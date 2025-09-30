# Mobile Header Item Slot

### Slot ID: `org.openedx.frontend.layout.mobile_header_item_slot.v1`

## Description

The slot is kept empty so that it can only be enabled when it is required else
nothing is displayed. It is used to add item in the mobile header.

![Screenshot for Mobile Header]('./images/mobile_header_notification.png')

## Examples

### Insert Notification Tray with Custom Component

The following `env.config.jsx` will replace the notification tray's contents entirely (in this case with a custom emoji icon):

```jsx
import {
  DIRECT_PLUGIN,
  PLUGIN_OPERATIONS,
} from "@openedx/frontend-plugin-framework";

const config = {
  pluginSlots: {
    "org.openedx.frontend.layout.mobile_header_item_slot.v1": {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "custom_notification_tray",
            type: DIRECT_PLUGIN,
            priority: 51,
            RenderWidget: () => <span>🔔 Custom Notification</span>,
          },
        },
      ],
    },
  },
};

export default config;
```

## API

- **Slot ID:** `org.openedx.frontend.layout.mobile_header_item_slot.v1`
- **Component:** Uses the [PluginSlot](https://github.com/openedx/frontend-plugin-framework#pluginslot) from the Open edX Frontend Plugin Framework for plugin injection.
- **Props:** This component does not accept any props directly.
