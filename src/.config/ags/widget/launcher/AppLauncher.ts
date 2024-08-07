import { type Application } from 'types/service/applications';
import { launchApp, icon } from 'lib/utils';
import options from 'options';
import icons from 'lib/icons';

const apps = await Service.import('applications');
const { query } = apps;
const { iconSize } = options.launcher.apps;

const AppItem = (app: Application) => {
  const title = Widget.Label({
    class_name: 'title',
    label: app.name,
    hexpand: true,
    xalign: 0,
    vpack: 'center',
    truncate: 'end',
  });

  const description = Widget.Label({
    class_name: 'description',
    label: app.description || '',
    hexpand: true,
    wrap: true,
    max_width_chars: 30,
    xalign: 0,
    justification: 'left',
    vpack: 'center',
  });

  const appicon = Widget.Icon({
    icon: icon(app.icon_name, icons.fallback.executable),
    size: iconSize.bind(),
  });

  const textBox = Widget.Box({
    vertical: true,
    vpack: 'center',
    children: app.description ? [title, description] : [title],
  });

  return Widget.Button({
    class_name: 'app-item',
    attribute: { app },
    child: Widget.Box({
      children: [appicon, textBox],
    }),
    on_clicked: () => {
      App.closeWindow('sidepanel');
      launchApp(app);
    },
  });
};

export function Launcher() {
  const applist = Variable(query(''));
  const max = options.launcher.apps.max;
  let first: Application | undefined = undefined;

  function SeparatedAppItem(app: Application) {
    return Widget.Revealer(
      { attribute: { app } },
      Widget.Box({ vertical: true }, Widget.Separator(), AppItem(app)),
    );
  }

  const list = Widget.Box({
    vertical: true,
    children: applist.bind().as(list => list.map(SeparatedAppItem)),
    setup: self =>
      self.hook(apps, () => (applist.value = query('')), 'notify::frequents'),
  });

  return Object.assign(list, {
    filter(text: string | null) {
      first = query(text || '')?.[0];
      list.children.reduce((i, item) => {
        if (!text || i >= max.value) {
          item.reveal_child = false;
          return i;
        }
        if (item.attribute.app.match(text)) {
          item.reveal_child = true;
          return ++i;
        }
        item.reveal_child = false;
        return i;
      }, 0);
    },
    launchFirst() {
      if (first !== undefined) {
        launchApp(first);
        return true;
      }
      return false;
    },
  });
}
