local M = {}

M.general = {
  n = {
    ["<C-X>"] = { ":Lazy home <CR>" },
    ["<A-h>"] = { "<C-w>h" },
    ["<A-l>"] = { "<C-w>l" },
    ["<A-j>"] = { "ddp" },
    ["<A-k>"] = { "ddkP" },
    ["J"] = { "10j" },
    ["K"] = { "10k" },

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

M.telescope = {
  plugin = true,

  n = {
    ["<C-p>"] = { ":Telescope find_files find_command=rg,--ignore,--hidden,--files prompt_prefix=🔍 <CR>" },
    ["<C-o>"] = {
      function()
        require("telescope.builtin").oldfiles()
      end,
      "Recent files",
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

M.tabufline = {
  plugin = true,

  n = {
    ["<C-w>"] = {
      function()
        require("nvchad.tabufline").close_buffer()
      end,
      "Close buffer",
    },
    ["<C-l>"] = {
      function()
        require("nvchad.tabufline").tabuflineNext()
      end,
      "Goto next buffer",
    },

    ["<C-h>"] = {
      function()
        require("nvchad.tabufline").tabuflinePrev()
      end,
      "Goto prev buffer",
    },
  },
}

return M
