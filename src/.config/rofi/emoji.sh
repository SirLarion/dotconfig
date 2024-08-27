#!/bin/bash

dir="$HOME/.config/rofi/themes"
theme='emoji'

rofimoji \
  --action clipboard \
  --skin-tone neutral \
  --use-icons \
  --prompt "" \
  --max-recent 0 \
  --hidden-descriptions \
  --selector-args="-click-to-exit -hover-select -me-select-entry '' -me-accept-entry MousePrimary -theme ${dir}/${theme}.rasi"

