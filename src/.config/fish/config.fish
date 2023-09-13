set fish_greeting ""

set -g theme_title_use_abbreviated_path yes
#set -g theme_nerd_fonts yes
set -g theme_powerline_fonts no
set -g fish_prompt_pwd_dir_length 1

function killonport
  command lsof -t -i tcp:$argv | xargs kill
end


function zode 
  set current (pwd)
  z $argv
  code .
  cd $current
end

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

alias gc='nvm use && git commit -m'

alias gco='git checkout'
alias gcb='git checkout -b'
alias gnb="gcd && gcb"
alias gnc='gnb'


alias gcd='git checkout develop && git pull'
alias gcm='git checkout master'

alias grb='git rebase'
alias grbd='git rebase develop'
alias grbi='git rebase -i'
alias grbc='git rebase --continue'
alias grba='git rebase --abort'
alias grbs='git rebase --skip'

alias ga='git add'

alias gforget='git update-index --skip-worktree'
alias gremember='git update-index --no-skip-worktree'

function current_repository
  set ref (git symbolic-ref HEAD 2> /dev/null); or \
  set ref (git rev-parse --short HEAD 2> /dev/null); or return
  echo (git remote -v | cut -d':' -f 2)
end

alias ggpull='git pull origin (current_branch)'
alias ggpush='git push origin (current_branch)'
alias gfp='git push -f'

set -g fish_user_paths "/home/sirlarion/.local/bin/" $fish_user_paths

neofetch
