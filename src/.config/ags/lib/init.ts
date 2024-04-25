import hyprland from './hyprland';
import gtk from './gtk';
import lowBattery from './battery';

export default function init() {
  try {
    gtk();
    lowBattery();
    hyprland();
  } catch (error) {
    logError(error);
  }
}
