source /Users/miskatammenpaa/google-cloud-sdk/path.fish.inc

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

alias cur_usr='echo "show State:/Users/ConsoleUser" | scutil | awk "/Name :/ { print $3 }"'

alias hoxinit='z hoxapp && ./.scripts/mongo.sh start && nvm use && yarn es:start:prod-db'

alias gameinit='z game && nvm use && yarn start'
alias adminit='z admin && nvm use && yarn start'
alias senseinit='z sense && nvm use && yarn start'
alias authinit='z auth && nvm use && yarn start'
alias legacyinit='z legacy && nvm use && yarn start'
alias storyinit='z ui && nvm use && yarn storybook'

alias yarnunlock="git checkout develop yarn.lock && yarn"
alias yarr="nvm use & yarn"

alias flint='yarn lint --fix'

alias doot='printf "#" >> ~/repos/hox/packages/server/hoxapp/private/.env'
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

function yeet_the_locales
  set current (pwd)
  z utils
  set translations 'src/translations'
	gforget $translations/locales.ts
	gforget $translations/polyfills/locales/cs.ts
	gforget $translations/polyfills/locales/de.ts
	gforget $translations/polyfills/locales/da.ts
	gforget $translations/polyfills/locales/el.ts
	gforget $translations/polyfills/locales/en.ts
	gforget $translations/polyfills/locales/es.ts
	gforget $translations/polyfills/locales/fi.ts
	gforget $translations/polyfills/locales/fr.ts
	gforget $translations/polyfills/locales/hi.ts
	gforget $translations/polyfills/locales/hu.ts
	gforget $translations/polyfills/locales/id.ts
	gforget $translations/polyfills/locales/it.ts
	gforget $translations/polyfills/locales/ja.ts
	gforget $translations/polyfills/locales/ko.ts
	gforget $translations/polyfills/locales/ms.ts
	gforget $translations/polyfills/locales/nl.ts
	gforget $translations/polyfills/locales/no.ts
	gforget $translations/polyfills/locales/pl.ts
	gforget $translations/polyfills/locales/pt.ts
	gforget $translations/polyfills/locales/ro.ts
	gforget $translations/polyfills/locales/ru.ts
	gforget $translations/polyfills/locales/sr.ts
	gforget $translations/polyfills/locales/sv.ts
	gforget $translations/polyfills/locales/th.ts
	gforget $translations/polyfills/locales/tr.ts
	gforget $translations/polyfills/locales/vi.ts
	gforget $translations/polyfills/locales/zh.ts
	gforget $translations/polyfills/polyfills.ts
  cd $current
end

function unyeet_the_locales
  set current (pwd)
  z utils
  set translations 'src/translations'
	gremember $translations/locales.ts
	gremember $translations/polyfills/locales/cs.ts
	gremember $translations/polyfills/locales/de.ts
	gremember $translations/polyfills/locales/da.ts
	gremember $translations/polyfills/locales/el.ts
	gremember $translations/polyfills/locales/en.ts
	gremember $translations/polyfills/locales/es.ts
	gremember $translations/polyfills/locales/fi.ts
	gremember $translations/polyfills/locales/fr.ts
	gremember $translations/polyfills/locales/hi.ts
	gremember $translations/polyfills/locales/hu.ts
	gremember $translations/polyfills/locales/id.ts
	gremember $translations/polyfills/locales/it.ts
	gremember $translations/polyfills/locales/ja.ts
	gremember $translations/polyfills/locales/ko.ts
	gremember $translations/polyfills/locales/ms.ts
	gremember $translations/polyfills/locales/nl.ts
	gremember $translations/polyfills/locales/no.ts
	gremember $translations/polyfills/locales/pl.ts
	gremember $translations/polyfills/locales/pt.ts
	gremember $translations/polyfills/locales/ro.ts
	gremember $translations/polyfills/locales/ru.ts
	gremember $translations/polyfills/locales/sr.ts
	gremember $translations/polyfills/locales/sv.ts
	gremember $translations/polyfills/locales/th.ts
	gremember $translations/polyfills/locales/tr.ts
	gremember $translations/polyfills/locales/vi.ts
	gremember $translations/polyfills/locales/zh.ts
	gremember $translations/polyfills/polyfills.ts
  cd $current
end

function current_repository
  set ref (git symbolic-ref HEAD 2> /dev/null); or \
  set ref (git rev-parse --short HEAD 2> /dev/null); or return
  echo (git remote -v | cut -d':' -f 2)
end

alias ggpull='git pull origin (current_branch)'
alias ggpush='git push origin (current_branch)'
alias gfp='git push -f'

set -g fish_user_paths "/usr/local/opt/python@3.7/bin" $fish_user_paths

# The next line updates PATH for the Google Cloud SDK.
#if [ -f '/Users/juliusuusinarkaus/Downloads/google-cloud-sdk/path.fish.inc' ]; . '/Users/juliusuusinarkaus/Downloads/google-cloud-sdk/path.fish.inc'; end
