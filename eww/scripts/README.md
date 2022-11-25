## EWW KWin scripts

`window-order` is a KWin script for keeping the `eww` window active while it is open. This is because only the `CAVA` console can have the `Keep above` window rule to stay on top of `eww`. However, `eww` still needs to stay above other open windows.

### Deploy

```sh
kpackagetool5 -r ~/repos/dotconfig/eww/scripts/window-order

kpackagetool5 --type=KWin/Script -i ~/repos/dotconfig/eww/scripts/window-order

kwriteconfig5 --file kwinrc --group Plugins --key window-orderEnabled true

qdbus org.kde.KWin /KWin reconfigure
```

### Learnings

1. KWin scripts are _pure_ JS, no fancy stuff.
2. Functions **have** to be defined with `function() {}` instead of anonymous functions. KWin will not error but there will be undefined behavior if using anonymous functions.
3. [KWin scripting API](https://develop.kde.org/docs/extend/plasma/kwin/api/) is incomplete. For example, the API states that `workspace.activateClient()` should be used for activating clients. This is not true and will not work. In reality you should use `workspace.activeClient = client`
4. KWin (apparently?) won't properly reload with `kwin_x11 --replace &`. A sure way to reload is to logout -> log back in.
