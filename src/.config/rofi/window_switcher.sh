#!/bin/bash

dir="$HOME/.config/rofi/themes"
theme='window_switcher'

#!/bin/bash


xdotool search --sync --sleep 50 --limit 1 --class Rofi keyup --delay 0 Tab key --delay 0 Tab keyup --delay 0 Alt_L keydown --delay 0 Alt_L&
rofi \
    -show window  \
    -click-to-exit -hover-select -me-select-entry '' -me-accept-entry MousePrimary \
    -kb-cancel "Alt+Escape,Escape" \
    -kb-accept-entry "!Alt-Tab,!Alt_L,!Alt+Alt_L,Return"\
    -kb-row-down "Alt+Tab,Alt+Down" \
    -kb-row-up "Alt+ISO_Left_Tab,Alt+Shift+Tab,Alt+Up"\
    -theme $dir/$theme.rasi &

# Wrapper to run rofi with blurred background
c=0
while ! xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0 -id $(xdotool search -class 'rofi') ; do
	sleep .1 
	c=$((c+1))
	[[ c = 50 ]] && exit; # stop script window didn't appear after 5 seconds
done
