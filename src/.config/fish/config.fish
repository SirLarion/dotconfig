set fish_greeting ""

set -g theme_title_use_abbreviated_path yes
set -g theme_nerd_fonts yes
# set -g theme_powerline_fonts no
set -g fish_prompt_pwd_dir_length 1

fish_vi_key_bindings

function killonport
  command lsof -t -i tcp:$argv | xargs kill
end

bind --mode insert --sets-mode default jj repaint

# ALIASES 

alias yarnunlock="git checkout develop yarn.lock && yarn"
alias yarr="nvm use & yarn"

alias flint='yarn lint --fix'

### GIT IS LIT

alias goops="git commit --amend"

function current_branch  
    set ref (git symbolic-ref HEAD 2> /dev/null); or \
    set ref (git rev-parse --short HEAD 2> /dev/null); or return
    echo $ref | sed -e 's|^refs/heads/||'
end

function rbdev
  set current (current_branch)
  git checkout develop
  git pull
  git checkout $current
  git rebase develop
end

alias g='git'
alias gst='git status'
alias gl='git pull'

alias gcm='git commit -m'

alias gco='git checkout'
alias gcb='git checkout -b'

alias gcd='git checkout develop && git pull'

alias grb='git rebase'
alias grbd='git rebase develop'
alias grbi='git rebase -i'
alias grbc='git rebase --continue'
alias grba='git rebase --abort'
alias grbs='git rebase --skip'

alias ga='git add'
alias gfp='git push --force-with-lease'

alias gforget='git update-index --skip-worktree'
alias gremember='git update-index --no-skip-worktree'
alias groot='git rev-parse --show-toplevel'


alias acli='arduino-cli'
alias teencli='teensy_loader_cli'

alias hyprlog='bash ~/repos/dotconfig/scripts/hyprlog'

alias zoot='cd (groot)'
alias vim='nvim'
alias ls='eza'

alias pgserver='sudo su postgres && pg_ctl -D /var/lib/postgres/data -l logfile start && exit'

function current_repository
  set ref (git symbolic-ref HEAD 2> /dev/null); or \
  set ref (git rev-parse --short HEAD 2> /dev/null); or return
  echo (git remote -v | cut -d':' -f 2)
end

function conf -a name
  cd ~/repos/dotconfig/
  if test $name = "nvim"
    nvim src/.config/nvim/init.lua
  end  
  if test $name = "vim" 
    nvim src/.vimrc
  end
  if test $name = "fish" 
    nvim src/.config/fish/config.fish
  end
  if test $name = "nu" 
    nvim src/.config/nushell/config.nu
  end
  if test $name = "tmux" 
    nvim src/.config/tmux/tmux.conf
  end
  if test $name = "omp" 
    nvim src/.oh-my-posh.nu
  end
  if test $name = "zathura" 
    nvim src/.config/zathura/zathurarc
  end
  if test $name = "neomutt" 
    nvim src/.config/neomutt/neomuttrc
  end
  if test $name = "arduino" 
    nvim src/.arduino15/arduino-cli.yaml
  end
  if test $name = "kitty" 
    nvim src/.config/kitty/kitty.conf
  end
  if test $name = "yazi" 
    nvim src/.config/yazi/yazi.toml
  end
  if test $name = "calcure" 
    nvim src/.config/calcure/config.ini
  end
  if test $name = "spt" 
    nvim src/.config/spotify-tui/config.yml
  end
  if test $name = "dunst" 
    nvim src/.config/dunst/dunstrc
  end
  if test $name = "hyprland" 
    nvim src/.config/hypr/hyprland.conf
  end
  if test $name = "ags" 
    nvim src/.config/ags/config.js
  end
  if test $name = "kanata" 
    nvim src/.config/kanata/config.kbd
  end
  if test $name = "starship" 
    nvim src/.config/starship.toml
  end
end

set -U fish_color_normal FAFAFA
set -U fish_color_command 55B4D4
set -U fish_color_quote 86B300
set -U fish_color_redirection A37ACC
set -U fish_color_end ED9366
set -U fish_color_error F51818
set -U fish_color_param 575F66
set -U fish_color_comment ABB0B6
set -U fish_color_match F07171
set -U fish_color_selection --background=FF9940
set -U fish_color_search_match --background=FF9940
set -U fish_color_history_current --bold
set -U fish_color_operator FF9940
set -U fish_color_escape 4CBF99
set -U fish_color_cwd 399EE6
set -U fish_color_cwd_root red
set -U fish_color_valid_path --underline
set -U fish_color_autosuggestion 8A9199
set -U fish_color_user brgreen
set -U fish_color_host normal
set -U fish_color_cancel --reverse
set -U fish_pager_color_progress brwhite --background=cyan
set -U fish_pager_color_completion normal
set -U fish_pager_color_description B3A06D
set -U fish_pager_color_selected_background --background=FF9940
set -U fish_pager_color_secondary_description 
set -U fish_pager_color_selected_description 
set -U fish_pager_color_secondary_prefix 
set -U fish_pager_color_secondary_completion 
set -U fish_color_option 
set -U fish_pager_color_background 
set -U fish_color_host_remote 
set -U fish_pager_color_selected_prefix 
set -U fish_pager_color_selected_completion 
set -U fish_pager_color_secondary_background 
set -U fish_color_keyword

set -g fish_user_paths "/home/larion/.local/bin/" $fish_user_paths
set -g fish_user_paths '/home/larion/.bun/bin/' $fish_user_paths
set -g fish_user_paths '/home/larion/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/bin/' $fish_user_paths
set -g fish_user_paths '/home/larion/.cargo/bin' $fish_user_paths

zoxide init fish | source
atuin init fish --disable-up-arrow | source
starship init fish | source

neofetch

set -gx EDITOR nvim 
set -gx SSH_AUTH_SOCK "$XDG_RUNTIME_DIR/ssh-agent.socket"

