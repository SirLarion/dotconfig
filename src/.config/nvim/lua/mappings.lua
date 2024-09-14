local M = {}

M.general = {
  n = {
    ["<C-X>"] = { ":Lazy home <CR>" },
    ["<C-s>"] = { "<cmd> w <CR>" },

    ["<A-h>"] = { "<C-w>h" },
    ["<A-l>"] = { "<C-w>l" },
    ["<A-j>"] = { "ddp" },
    ["<A-k>"] = { "ddkP" },
    ["J"] = { "10j" },
    ["K"] = { "10k" },
    ["<C-g>"] = { ":b# <CR>" },
    ["<leader>s"] = { "/" },

    ["<F5>"] = { "<cmd> ! ./deploy<CR>" },
    ["+"] = { "<cmd> vertical res +5<CR>" },
    ["-"] = { "<cmd> vertical res -5<CR>" },
  },

  i = {
    ["jj"] = { "<Esc><Esc>" },
  },

  v = {
    ["J"] = { "10j" },
    ["K"] = { "10k" },
  },
}

M.nvimtree = {
  plugin = true,

  n = {
    ["<C-n>"] = { "<cmd> NvimTreeToggle <CR>", "Toggle nvimtree" },
  },
}

M.telescope = {
  plugin = true,

  n = {
    ["<C-p>"] = { ":Telescope find_files find_command=rg,--ignore,--hidden,--files prompt_prefix=🔍 <CR>" },
    ["<C-o>"] = { ":Telescope oldfiles <CR>" },
    ["F"] = { ":Telescope live_grep find_command=rg prompt_prefix=🔍 <CR>" },
    ["U"] = { ":Telescope undo initial_mode=normal <CR>" },
  },
}

M.comment = {
  plugin = true,

  -- toggle comment in both modes
  n = {
    ["<leader>7"] = {
      function()
        require("Comment.api").toggle.linewise.current()
      end,
      "Toggle comment",
    },
  },

  v = {
    ["<leader>7"] = {
      "<ESC><cmd>lua require('Comment.api').toggle.linewise(vim.fn.visualmode())<CR>",
      "Toggle comment",
    },
  },
}

M.lspconfig = {
  plugin = true,

  n = {
    ["gD"] = {
      function()
        vim.lsp.buf.declaration()
      end,
      "LSP declaration",
    },

    ["gd"] = {
      function()
        vim.lsp.buf.definition()
      end,
      "LSP definition",
    },

    ["<C-k>"] = {
      function()
        vim.lsp.buf.hover()
      end,
      "LSP hover",
    },

    ["gi"] = {
      function()
        vim.lsp.buf.implementation()
      end,
      "LSP implementation",
    },

    ["<leader>ls"] = {
      function()
        vim.lsp.buf.signature_help()
      end,
      "LSP signature help",
    },

    ["<leader>D"] = {
      function()
        vim.lsp.buf.type_definition()
      end,
      "LSP definition type",
    },

    ["<leader>ra"] = {
      function()
        require("nvchad.renamer").open()
      end,
      "LSP rename",
    },

    ["<leader>ca"] = {
      function()
        vim.lsp.buf.code_action()
      end,
      "LSP code action",
    },

    ["gr"] = {
      function()
        vim.lsp.buf.references()
      end,
      "LSP references",
    },

    ["<leader>f"] = {
      function()
        vim.diagnostic.open_float({ border = "rounded" })
      end,
      "Floating diagnostic",
    },

    ["[d"] = {
      function()
        vim.diagnostic.goto_prev({ float = { border = "rounded" } })
      end,
      "Goto prev",
    },

    ["]d"] = {
      function()
        vim.diagnostic.goto_next({ float = { border = "rounded" } })
      end,
      "Goto next",
    },

    ["<leader>q"] = {
      function()
        vim.diagnostic.setloclist()
      end,
      "Diagnostic setloclist",
    },

    ["<leader>wa"] = {
      function()
        vim.lsp.buf.add_workspace_folder()
      end,
      "Add workspace folder",
    },

    ["<leader>wr"] = {
      function()
        vim.lsp.buf.remove_workspace_folder()
      end,
      "Remove workspace folder",
    },

    ["<leader>wl"] = {
      function()
        print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
      end,
      "List workspace folders",
    },
  },

  v = {
    ["<leader>ca"] = {
      function()
        vim.lsp.buf.code_action()
      end,
      "LSP code action",
    },
  },
}

M.comment = {
  plugin = true,

  -- toggle comment in both modes
  n = {
    ["<leader>7"] = {
      function()
        require("Comment.api").toggle.linewise.current()
      end,
      "Toggle comment",
    },
  },

  v = {
    ["<leader>7"] = {
      "<ESC><cmd>lua require('Comment.api').toggle.linewise(vim.fn.visualmode())<CR>",
      "Toggle comment",
    },
  },
}

M.oldies = {
  plugin = true,

  n = {
    ["<C-g>"] = {
      function()
        require("oldies").prev()
      end,
    },
    ["<C-f>"] = {
      function()
        require("oldies").next()
      end,
    },
  },
}

return M
