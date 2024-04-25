import { type Binding } from 'lib/utils';
import PopupWindow from 'widget/PopupWindow';
import icons from 'lib/icons';
import options from 'options';
import * as AppLauncher from './AppLauncher';
import * as ShRun from './ShRun';

const { width } = options.launcher;

export function Launcher() {
  const applauncher = AppLauncher.Launcher();
  const sh = ShRun.ShRun();
  const shicon = ShRun.Icon();

  function HelpButton(cmd: string, desc: string | Binding<string>) {
    return Widget.Box(
      { vertical: true },
      Widget.Separator(),
      Widget.Button(
        {
          class_name: 'help',
          on_clicked: () => {
            entry.grab_focus();
            entry.text = `:${cmd} `;
            entry.set_position(-1);
          },
        },
        Widget.Box([
          Widget.Label({
            class_name: 'name',
            label: `:${cmd}`,
          }),
          Widget.Label({
            hexpand: true,
            hpack: 'end',
            class_name: 'description',
            label: desc,
          }),
        ]),
      ),
    );
  }

  const help = Widget.Revealer({
    child: Widget.Box(
      { vertical: true },
      HelpButton('sh', 'run a binary'),
      Widget.Box(),
    ),
  });

  const entry = Widget.Entry({
    hexpand: true,
    primary_icon_name: icons.ui.search,
    on_accept: ({ text }) => {
      if (text?.startsWith(':')) {
        sh.run(text.substring(3));
      } else {
        if (applauncher.launchFirst()) {
          App.closeWindow('sidepanel');
        }
      }

      entry.text = '';
    },
    on_change: ({ text }) => {
      text ||= '';
      help.reveal_child = text.split(' ').length === 1 && text.startsWith(':');

      if (text.startsWith(':')) {
        sh.filter(text.substring(3));
      } else {
        applauncher.filter(text);
      }
    },
  });

  function focus() {
    entry.text = 'Search';
    entry.set_position(-1);
    entry.select_region(0, -1);
    entry.grab_focus();
  }

  return Widget.Box({
    css: width.bind().as(v => `min-width: ${v}pt;`),
    vertical: true,
    class_name: 'launcher',
    vpack: 'start',
    children: [Widget.Box([entry, shicon]), help, applauncher, sh],
    setup: self =>
      self.hook(App, (_, win, visible) => {
        if (win !== 'sidepanel') return;

        entry.text = '';
        if (visible) focus();
      }),
  });
}

export default () =>
  PopupWindow({
    name: 'launcher',
    layout: 'top',
    child: Launcher(),
  });
