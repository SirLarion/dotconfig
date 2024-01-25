syntax on

set noerrorbells
set tabstop=2 softtabstop=2
set shiftwidth=2
set expandtab
set smartindent
set undofile
set nu
set nowrap
set smartcase
set noswapfile
set nocompatible
set backspace=2
set incsearch
set cursorline

let g:schememode=0

let &t_SI = "\e[6 q"
let &t_EI = "\e[2 q"
let g:indentLine_char='|'

augroup cursor_cmd
au!
autocmd VimEnter * silent !echo -ne "\e[2 q"
augroup END

let mapleader=" "

nnoremap <leader>s :vertical resize 110<CR>
nnoremap <leader>+ :vertical resize +15<CR>
nnoremap <leader>- :vertical resize -15<CR>

nnoremap <silent><C-S> :update<CR>
inoremap jj <Esc><Esc>

