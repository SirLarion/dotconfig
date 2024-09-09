local opt = vim.opt
local o = vim.o
local g = vim.g

-------------------------------------- options ------------------------------------------
o.laststatus = 3
o.showmode = false

o.clipboard = "unnamedplus"
o.cursorline = true

-- Indenting
o.expandtab = true
o.shiftwidth = 2
o.smartindent = true
o.tabstop = 2
o.softtabstop = 2

opt.fillchars = { eob = " " }
o.ignorecase = true
o.smartcase = true
o.mouse = "a"

-- Numbers
o.number = true
o.numberwidth = 2
o.ruler = false

-- disable nvim intro
opt.shortmess:append "sI"

o.signcolumn = "yes"
o.splitbelow = true
o.splitright = true
o.timeoutlen = 400
o.undofile = true

opt.hls = false
opt.tabstop = 2
opt.softtabstop = 2
opt.shiftwidth = 2
vim.opt_global.textwidth = 80

g.mapleader = " "

require("config.utils").load_mappings()
require("config.lazy")
require("config.netlogo")

-- Open nvim-tree on startup with some twists
vim.api.nvim_create_autocmd("VimEnter", {
  callback = function(data)
    -- buffer is a real file on the disk
    local real_file = vim.fn.filereadable(data.file) == 1

    -- buffer is a [No Name]
    local no_name = data.file == "" and vim.bo[data.buf].buftype == ""

    if not real_file and not no_name then
      return
    end

    require("nvim-tree.api").tree.toggle({ focus = false, find_file = true })
    -- open the tree, find the file but don't focus it
  end,
})

-- Close nvim-tree on last buffer close, courtesy of
-- https://github.com/ppwwyyxx
vim.api.nvim_create_autocmd("QuitPre", {
  callback = function()
    local invalid_win = {}
    local wins = vim.api.nvim_list_wins()
    for _, w in ipairs(wins) do
      local bufname = vim.api.nvim_buf_get_name(vim.api.nvim_win_get_buf(w))
      if bufname:match("NvimTree_") ~= nil then
        table.insert(invalid_win, w)
      end
    end
    if #invalid_win == #wins - 1 then
      -- Should quit, so we close all invalid windows.
      for _, w in ipairs(invalid_win) do
        vim.api.nvim_win_close(w, true)
      end
    end
  end,
})

-- Use internal formatting for bindings like gq.
vim.api.nvim_create_autocmd("LspAttach", {
  callback = function(args)
    vim.bo[args.buf].formatexpr = nil
  end,
})

-- Format on save
vim.api.nvim_create_autocmd("BufWritePre", {
  callback = function()
    vim.lsp.buf.format()
  end,
})

function checkIsFloat()
  for _, winid in pairs(vim.api.nvim_tabpage_list_wins(0)) do
    if vim.api.nvim_win_get_config(winid).zindex then
      return true
    end
  end
  return false
end

-- Function to check if a floating dialog exists and if not
-- then check for diagnostics under the cursor
-- https://neovim.discourse.group/t/how-to-show-diagnostics-on-hover/3830/2
function openDiagnosticIfNoFloat()
  if checkIsFloat() then
    return
  end
  -- THIS IS FOR BUILTIN LSP
  vim.diagnostic.open_float(0, {
    scope = "cursor",
    focusable = false,
    close_events = {
      "CursorMoved",
      "CursorMovedI",
      "BufHidden",
      "InsertCharPre",
      "WinLeave",
    },
  })
end

function openLspHoverIfNoFloat(opts)
  if checkIsFloat() then
    return
  end
  vim.lsp.buf.hover(opts)
end

-- Show diagnostics under the cursor when holding position
vim.api.nvim_create_augroup("lsp_diagnostics_hold", { clear = true })
vim.api.nvim_create_autocmd({ "CursorHold" }, {
  pattern = "*",
  command = "lua openDiagnosticIfNoFloat()",
  group = "lsp_diagnostics_hold",
})

-- Use LspAttach autocommand to only map the following keys
-- after the language server attaches to the current buffer
-- custom version of https://github.com/neovim/nvim-lspconfig
vim.api.nvim_create_autocmd("LspAttach", {
  group = vim.api.nvim_create_augroup("UserLspConfig", {}),
  callback = function(ev)
    -- Buffer local mappings.
    -- See `:help vim.lsp.*` for documentation on any of the below functions
    local opts = { buffer = ev.buf }
    vim.keymap.set("n", "gD", vim.lsp.buf.declaration, opts)
    vim.keymap.set("n", "<C-k>",
      function()
        openDiagnosticIfNoFloat()
        openLspHoverIfNoFloat(opts)
      end, opts)
    vim.keymap.set("n", "<space>d", vim.lsp.buf.type_definition, opts)
    vim.keymap.set("n", "<space>rn", vim.lsp.buf.rename, opts)
    vim.keymap.set("n", "<C-.>", vim.lsp.buf.code_action, opts)
  end,
})
