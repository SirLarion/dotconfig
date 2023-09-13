syntax on

set noerrorbells
set tabstop=4 softtabstop=4
set shiftwidth=4
set expandtab
set smartindent
set undodir=~/.vim/undodir
set undofile
set nu
set nowrap
set smartcase
set noswapfile
set nocompatible
set backspace=2
set incsearch
set cursorline

call plug#begin('~/.vim/plugged')

Plug 'morhetz/gruvbox'
Plug 'mbbill/undotree'
Plug 'Valloric/YouCompleteMe'
Plug 'jremmen/vim-ripgrep'
Plug 'Yggdroot/indentLine'
Plug 'NLKNguyen/papercolor-theme'

call plug#end()

let g:schememode=0

set background=dark
let g:gruvbox_contrast_dark='hard'
colorscheme gruvbox

function! ChangeScheme()
    if g:schememode == 0
        let g:schememode=1
        set background=light
        colorscheme PaperColor
    else
        let g:schememode=0
        set background=dark
        colorscheme gruvbox
    endif
    return 1
endfunction


let &t_SI = "\e[6 q"
let &t_EI = "\e[2 q"
let g:indentLine_char='|'

augroup cursor_cmd
au!
autocmd VimEnter * silent !echo -ne "\e[2 q"
augroup END

let g:ycm_max_num_candidates=3
let g:ycm_max_num_identifier_candidates=3
let g:ycm_complete_in_strings=0
let g:ycm_auto_trigger=0
let g:ycm_auto_hover=''

let mapleader=" "

autocmd FileType python map <buffer> <F5> :w<CR>:exec '!python' shellescape(@%, 1)<CR>
autocmd FileType python imap <buffer> <F5> <esc>:w<CR>:exec '!python' shellescape(@%, 1)<CR>
autocmd FileType html map <buffer> <F5> :w<CR>:exec '!firefox' shellescape(@%, 1)<CR>
autocmd FileType html imap <buffer> <F5> <esc>:w<CR>:exec '!firefox' shellescape(@%, 1)<CR>
autocmd FileType vue set tabstop=2 softtabstop=2


nnoremap <leader>h :wincmd h<CR>
nnoremap <leader>j :wincmd j<CR>
nnoremap <leader>k :wincmd k<CR>
nnoremap <leader>l :wincmd l<CR>

nnoremap <leader>x :wincmd q<CR>

nnoremap <leader>cs :call ChangeScheme()<CR>

nnoremap <leader>u :UndotreeShow<CR>
nnoremap <leader>gd :YcmCompleter GoTo<CR>
nnoremap <leader>d <plug>(YCMHover)
nnoremap <leader>o :Ex<CR>
nnoremap <leader>t :wincmd v<bar> :Ex <bar> :vertical resize 30<CR>
nnoremap <leader>vs :vsplit<CR>
nnoremap <leader>hs :split<CR>
nnoremap <leader>s :vertical resize 110<CR>
nnoremap <leader>+ :vertical resize +15<CR>
nnoremap <leader>- :vertical resize -15<CR>

nnoremap <silent><C-S><C-X> ZZ
nnoremap <silent><C-S> :update<CR>
inoremap jj <Esc><Esc>

