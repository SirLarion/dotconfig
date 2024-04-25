import { opt, mkOptions } from 'lib/option';
import { icon } from 'lib/utils';
import icons from 'lib/icons';

const options = mkOptions(OPTIONS, {
  autotheme: opt(false),

  theme: {
    dark: {
      primary: {
        bg: opt('#4CBE99'),
        fg: opt('#141414'),
      },
      error: {
        bg: opt('#e55f86'),
        fg: opt('#141414'),
      },
      bg: opt('#000000'),
      fg: opt('#eeeeee'),
      widget: opt('#eeeeee'),
      border: opt('#eeeeee'),
    },
    light: {
      primary: {
        bg: opt('#426ede'),
        fg: opt('#eeeeee'),
      },
      error: {
        bg: opt('#b13558'),
        fg: opt('#eeeeee'),
      },
      bg: opt('#fffffa'),
      fg: opt('#080808'),
      widget: opt('#080808'),
      border: opt('#080808'),
    },

    blur: opt(0),
    scheme: opt<'dark' | 'light'>('dark'),
    widget: { opacity: opt(94) },
    border: {
      width: opt(0),
      opacity: opt(96),
    },

    shadows: opt(false),
    padding: opt(4),
    spacing: opt(2),
    radius: opt(8),
  },

  transition: opt(150),

  font: {
    size: opt(10),
    name: opt('Ubuntu Nerd Font'),
  },

  bar: {
    flatButtons: opt(true),
    position: opt<'top' | 'bottom'>('top'),
    corners: opt(true),
    layout: {
      start: opt<Array<import('widget/bar/Bar').BarWidget>>([]),
      center: opt<Array<import('widget/bar/Bar').BarWidget>>(['date']),
      end: opt<Array<import('widget/bar/Bar').BarWidget>>([
        'expander',
        'colorpicker',
        'workspaces',
        'battery',
      ]),
    },
    launcher: {
      icon: {
        colored: opt(true),
        icon: opt(icon(icons.ui.search)),
      },
      label: {
        colored: opt(false),
        label: opt(''),
      },
      action: opt(() => App.toggleWindow('launcher')),
    },
    date: {
      format: opt('%H:%M'),
      action: opt(() => App.toggleWindow('datemenu')),
    },
    battery: {
      bar: opt<'hidden' | 'regular' | 'whole'>('regular'),
      charging: opt('#00D787'),
      percentage: opt(true),
      blocks: opt(7),
      width: opt(50),
      low: opt(30),
    },
    workspaces: {
      workspaces: opt(7),
    },
    taskbar: {
      iconSize: opt(0),
      monochrome: opt(true),
      exclusive: opt(false),
    },
    media: {
      monochrome: opt(true),
      preferred: opt('spotify'),
      direction: opt<'left' | 'right'>('right'),
      format: opt('{artists} - {title}'),
      length: opt(40),
    },
    powermenu: {
      monochrome: opt(false),
      action: opt(() => App.toggleWindow('powermenu')),
    },
  },

  launcher: {
    width: opt(0),
    margin: opt(80),
    sh: {
      max: opt(16),
    },
    apps: {
      iconSize: opt(62),
      max: opt(6),
      favorites: opt([]),
    },
  },

  overview: {
    scale: opt(9),
    workspaces: opt(7),
    monochromeIcon: opt(true),
  },

  powermenu: {
    sleep: opt('systemctl suspend'),
    reboot: opt('systemctl reboot'),
    lock: opt('swaylock'),
    shutdown: opt('shutdown now'),
    layout: opt<'line' | 'box'>('line'),
    labels: opt(true),
  },

  quicksettings: {
    width: opt(380),
    position: opt<'left' | 'center' | 'right'>('right'),
    networkSettings: opt('gtk-launch gnome-control-center'),
    media: {
      monochromeIcon: opt(true),
      coverSize: opt(100),
    },
  },

  datemenu: {
    position: opt<'left' | 'center' | 'right'>('center'),
    weather: {
      interval: opt(60_000),
      unit: opt<'metric' | 'imperial' | 'standard'>('metric'),
      key: opt<string>(
        JSON.parse(Utils.readFile(`${App.configDir}/.weather`) || '{}')?.key ||
          '',
      ),
      cities: opt<Array<number>>(
        JSON.parse(Utils.readFile(`${App.configDir}/.weather`) || '{}')
          ?.cities || [],
      ),
    },
  },

  osd: {
    progress: {
      vertical: opt(true),
      pack: {
        h: opt<'start' | 'center' | 'end'>('end'),
        v: opt<'start' | 'center' | 'end'>('center'),
      },
    },
    microphone: {
      pack: {
        h: opt<'start' | 'center' | 'end'>('center'),
        v: opt<'start' | 'center' | 'end'>('end'),
      },
    },
  },

  hyprland: {
    gaps: opt(1),
    inactiveBorder: opt('333333ff'),
    gapsWhenOnly: opt(false),
  },
});

globalThis['options'] = options;
export default options;
