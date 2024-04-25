import options from 'options';

const { sleep, reboot, lock, shutdown } = options.powermenu;

export type Action = 'sleep' | 'reboot' | 'lock' | 'shutdown';

class PowerMenu extends Service {
  static {
    Service.register(
      this,
      {},
      {
        title: ['string'],
        cmd: ['string'],
      },
    );
  }

  #title = '';
  #cmd = '';

  get title() {
    return this.#title;
  }
  get cmd() {
    return this.#cmd;
  }

  action(action: Action) {
    [this.#cmd, this.#title] = {
      sleep: [sleep.value, 'Sleep'],
      reboot: [reboot.value, 'Reboot'],
      lock: [lock.value, 'Lock Screen'],
      shutdown: [shutdown.value, 'Shutdown'],
    }[action];

    this.notify('cmd');
    this.notify('title');
    this.emit('changed');
    Utils.exec(this.cmd);
  }

  readonly shutdown = () => {
    this.action('shutdown');
  };
}

const powermenu = new PowerMenu();
Object.assign(globalThis, { powermenu });
export default powermenu;
