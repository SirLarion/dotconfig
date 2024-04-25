import type Gtk from 'gi://Gtk?version=3.0';

import { clock } from 'lib/variables';

import { Launcher } from 'widget/launcher/Launcher';
import BatteryBar from '../buttons/BatteryBar';
import ColorPicker from '../buttons/ColorPicker';
import Date from '../buttons/Date';
import PowerMenu from '../buttons/PowerMenu';
import SystemIndicators from '../buttons/SystemIndicators';
import Taskbar from '../buttons/Taskbar';
import Workspaces from '../buttons/Workspaces';

import { Header } from './widgets/Header';
import { Volume, SinkSelector, AppMixer } from './widgets/Volume';
import { Brightness } from './widgets/Brightness';
import { NetworkToggle, WifiSelection } from './widgets/Network';
import { BluetoothToggle, BluetoothDevices } from './widgets/Bluetooth';
import { Media } from './widgets/Media';

export type BarWidget = keyof typeof widget;

const media = (await Service.import('mpris')).bind('players');

const Row = (
  toggles: Array<() => Gtk.Widget> = [],
  menus: Array<() => Gtk.Widget> = [],
) =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Box({
        homogeneous: true,
        class_name: 'row horizontal',
        children: toggles.map(w => w()),
      }),
      ...menus.map(w => w()),
    ],
  });

const widget = {
  battery: BatteryBar,
  colorpicker: ColorPicker,
  date: Date,
  launcher: Launcher,
  powermenu: PowerMenu,
  system: SystemIndicators,
  taskbar: Taskbar,
  workspaces: Workspaces,
  expander: () => Widget.Box({ expand: true }),
};

export default () =>
  Widget.Window({
    class_name: 'sidepanel',
    name: `sidepanel`,
    exclusivity: 'exclusive',
    anchor: ['left', 'top', 'bottom'],
    setup: w => w.keybind('Escape', () => App.closeWindow('sidepanel')),
    keymode: 'on-demand',
    visible: false,
    child: Widget.Box({
      vertical: true,
      class_name: 'quicksettings vertical',
      children: [
        Widget.Box({
          class_name: 'date-box',
          vertical: true,
          children: [
            Widget.Label({
              class_name: 'clock',
              label: clock.bind().as(t => t.format('%H:%M')!),
            }),
            Widget.Label({
              class_name: 'date',
              label: clock.bind().as(t => t.format('%A %d.%m.')!),
            }),
          ],
        }),
        Header(),
        Widget.Box({
          class_name: 'sliders-box vertical',
          vertical: true,
          children: [Row([Volume], [SinkSelector, AppMixer]), Brightness()],
        }),
        Row(
          [NetworkToggle, BluetoothToggle],
          [WifiSelection, BluetoothDevices],
        ),
        Widget.Box({
          visible: media.as(l => l.length > 0),
          child: Media(),
        }),
        Launcher(),
      ],
    }),
  });
