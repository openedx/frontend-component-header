# Notification Tray Slot

### Slot ID: `org.openedx.frontend.layout.notification_tray.v1`

## Description

This slot is used to replace, modify, or hide the contents of the notification tray in the Open edX header. It allows developers to easily extend or customize the notification tray using the [Open edX Frontend Plugin Framework](https://github.com/openedx/frontend-plugin-framework).

The slot is kept empty so that it can only be enabled when it is required else
nothing is displayed.

## Examples

### Insert Notification Tray with Custom Component

The following `env.config.jsx` will replace the notification tray's contents entirely (in this case with a custom emoji icon):

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.notification_tray.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_notification_tray',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <span>🔔 Custom Notification</span>
            ),
          },
        },
      ],
    },
  },
};

export default config;
```

## Component Usage

Import the `NotificationTraySlot` component and use it in your layout or header component where you want the notifications tray to appear:

```jsx
import NotificationTraySlot from './src/plugin-slots/NotificationSlot';

function Header() {
  return (
    <header>
      {/* Other header content */}
      <NotificationTraySlot />
    </header>
  );
}
```

## API

- **Slot ID:** `org.openedx.frontend.layout.notification_tray.v1`
- **Alias:** `notification_tray_plugin`
- **Component:** Uses the [PluginSlot](https://github.com/openedx/frontend-plugin-framework#pluginslot) from the Open edX Frontend Plugin Framework for plugin injection.
- **Props:** This component does not accept any props directly.

## License

This component is part of the [open-craft/frontend-component-header](https://github.com/open-craft/frontend-component-header) repository and is made available under its license.

## Contributing

If you would like to contribute improvements or additional plugin slots, please open a pull request or issue in the [repository](https://github.com/open-craft/frontend-component-header).

