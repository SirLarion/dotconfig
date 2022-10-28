#!/bin/bash
# Preferred configuration for a clean Arch Linux installation

# Install packages
current="/home/sirlarion/repos/dotconfig"

cd $current

sudo pacman -S $(cat packages.txt)
