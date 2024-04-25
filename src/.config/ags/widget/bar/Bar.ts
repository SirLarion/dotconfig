import BatteryBar from '../buttons/BatteryBar';
import ColorPicker from '../buttons/ColorPicker';
import Date from '../buttons/Date';
import Launcher from '../buttons/Launcher';
import Media from '../buttons/Media';
import PowerMenu from '../buttons/PowerMenu';
import SystemIndicators from '../buttons/SystemIndicators';
import Taskbar from '../buttons/Taskbar';
import Workspaces from '../buttons/Workspaces';
import options from 'options';

const { start, center, end } = options.bar.layout;
const spacing = options.theme.spacing;
const pos = options.bar.position.bind();

export type BarWidget = keyof typeof widget;

const widget = {
  battery: BatteryBar,
  colorpicker: ColorPicker,
  date: Date,
  launcher: Launcher,
  media: Media,
  powermenu: PowerMenu,
  system: SystemIndicators,
  taskbar: Taskbar,
  workspaces: Workspaces,
  expander: () => Widget.Box({ expand: true }),
};

export default (monitor: number) =>
  Widget.Window({
    monitor,
    class_name: 'bar',
    name: `bar${monitor}`,
    exclusivity: 'exclusive',
    anchor: pos.as(pos => [pos, 'right', 'left']),
    child: Widget.CenterBox({
      css: 'min-width: 2px; min-height: 2px;',
      startWidget: Widget.Box({
        hexpand: true,
        children: start.bind().as(s => s.map(w => widget[w]())),
      }),
      centerWidget: Widget.Box({
        hpack: 'center',
        children: center.bind().as(c => c.map(w => widget[w]())),
      }),
      endWidget: Widget.Box({
        css: `padding-right: ${spacing}pt;`,
        hexpand: true,
        children: end.bind().as(e => e.map(w => widget[w]())),
      }),
    }),
  });
